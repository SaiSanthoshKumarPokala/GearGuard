const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment',
    required: true,
  },
  type: {
    type: String,
    enum: ['Corrective', 'Preventive'],
    required: true,
  },
  stage: {
    type: String,
    enum: ['New', 'In Progress', 'Repaired', 'Scrap'],
    default: 'New',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium',
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  scheduledDate: {
    type: Date,
  },
  duration: {
    type: Number, // in hours
    default: 0,
  },
  description: {
    type: String,
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

// Virtual for checking if overdue
maintenanceRequestSchema.virtual('isOverdue').get(function() {
  return this.scheduledDate && 
         this.scheduledDate < new Date() && 
         this.stage !== 'Repaired' && 
         this.stage !== 'Scrap';
});

module.exports = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
