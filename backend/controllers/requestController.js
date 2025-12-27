const MaintenanceRequest = require('../models/MaintenanceRequest');
const Equipment = require('../models/Equipment');

exports.createRequest = async (req, res) => {
  try {
    const { equipment: equipmentId, ...requestData } = req.body;

    // Auto-fill logic: Fetch equipment details
    const equipment = await Equipment.findById(equipmentId)
      .populate('maintenanceTeam')
      .populate('technician');

    if (!equipment) {
      return res.status(404).json({ msg: 'Equipment not found' });
    }

    const request = new MaintenanceRequest({
      ...requestData,
      equipment: equipmentId,
      team: equipment.maintenanceTeam._id,
      assignedTo: equipment.technician ? equipment.technician._id : null,
      createdBy: req.user.id,
    });

    await request.save();
    await request.populate(['equipment', 'team', 'assignedTo', 'createdBy']);

    res.status(201).json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const { stage, type, team } = req.query;
    let filter = {};

    if (stage) filter.stage = stage;
    if (type) filter.type = type;
    if (team) filter.team = team;

    const requests = await MaintenanceRequest.find(filter)
      .populate('equipment')
      .populate('team')
      .populate('assignedTo')
      .populate('createdBy')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const request = await MaintenanceRequest.findById(req.params.id)
      .populate('equipment')
      .populate('team')
      .populate('assignedTo')
      .populate('createdBy');

    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }

    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const { stage } = req.body;
    
    // Scrap logic: Update equipment status if moved to Scrap
    if (stage === 'Scrap') {
      const request = await MaintenanceRequest.findById(req.params.id);
      if (request) {
        await Equipment.findByIdAndUpdate(request.equipment, {
          status: 'scrapped',
        });
      }
    }

    const request = await MaintenanceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    .populate(['equipment', 'team', 'assignedTo', 'createdBy']);

    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }

    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const request = await MaintenanceRequest.findByIdAndDelete(req.params.id);
    
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }

    res.json({ msg: 'Request removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getStatistics = async (req, res) => {
  try {
    const requestsByTeam = await MaintenanceRequest.aggregate([
      {
        $group: {
          _id: '$team',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'teams',
          localField: '_id',
          foreignField: '_id',
          as: 'team',
        },
      },
      {
        $unwind: '$team',
      },
    ]);

    const requestsByCategory = await MaintenanceRequest.aggregate([
      {
        $lookup: {
          from: 'equipment',
          localField: 'equipment',
          foreignField: '_id',
          as: 'equipmentData',
        },
      },
      {
        $unwind: '$equipmentData',
      },
      {
        $group: {
          _id: '$equipmentData.category',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({ requestsByTeam, requestsByCategory });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
