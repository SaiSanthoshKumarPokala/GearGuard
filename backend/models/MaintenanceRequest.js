const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  subject: String,
  type: {
    type: String,
    enum: ["Corrective", "Preventive"]
  },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment"
  },
  assignedTeam: String,
  status: {
    type: String,
    enum: ["New", "In Progress", "Repaired", "Scrap"],
    default: "New"
  },
  scheduledDate: Date,
  duration: Number
}, { timestamps: true });

module.exports = mongoose.model("MaintenanceRequest", requestSchema);
