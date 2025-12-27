const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Machine', 'Vehicle', 'Computer', 'Tool', 'Other'],
  },
  department: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  maintenanceTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  purchaseDate: {
    type: Date,
  },
  warrantyExpiry: {
    type: Date,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'under_maintenance', 'scrapped'],
    default: 'active',
  },
  description: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Equipment', equipmentSchema);
