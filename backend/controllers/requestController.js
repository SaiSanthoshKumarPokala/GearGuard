const Request = require("../models/MaintenanceRequest");
const Equipment = require("../models/Equipment");

exports.createRequest = async (req, res) => {
  const equipment = await Equipment.findById(req.body.equipment);

  const request = await Request.create({
    ...req.body,
    assignedTeam: equipment.maintenanceTeam
  });

  res.status(201).json(request);
};

exports.getRequests = async (req, res) => {
  const requests = await Request.find().populate("equipment");
  res.json(requests);
};
