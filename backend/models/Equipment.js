const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  name: String,
  serialNumber: String,
  department: String,
  location: String,
  maintenanceTeam: String
}, { timestamps: true });

module.exports = mongoose.model("Equipment", equipmentSchema);
