const Equipment = require('../models/Equipment');
const MaintenanceRequest = require('../models/MaintenanceRequest');

exports.createEquipment = async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    await equipment.save();
    await equipment.populate(['maintenanceTeam', 'technician', 'assignedTo']);
    res.status(201).json(equipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllEquipment = async (req, res) => {
  try {
    const { department, category, status } = req.query;
    let filter = {};

    if (department) filter.department = department;
    if (category) filter.category = category;
    if (status) filter.status = status;

    const equipment = await Equipment.find(filter)
      .populate('maintenanceTeam')
      .populate('technician')
      .populate('assignedTo')
      .sort({ createdAt: -1 });

    res.json(equipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id)
      .populate('maintenanceTeam')
      .populate('technician')
      .populate('assignedTo');

    if (!equipment) {
      return res.status(404).json({ msg: 'Equipment not found' });
    }

    res.json(equipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getEquipmentRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find({ 
      equipment: req.params.id 
    })
    .populate('assignedTo')
    .populate('team')
    .sort({ createdAt: -1 });

    const openCount = requests.filter(r => 
      r.stage !== 'Repaired' && r.stage !== 'Scrap'
    ).length;

    res.json({ requests, openCount });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    .populate(['maintenanceTeam', 'technician', 'assignedTo']);

    if (!equipment) {
      return res.status(404).json({ msg: 'Equipment not found' });
    }

    res.json(equipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);
    
    if (!equipment) {
      return res.status(404).json({ msg: 'Equipment not found' });
    }

    res.json({ msg: 'Equipment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
