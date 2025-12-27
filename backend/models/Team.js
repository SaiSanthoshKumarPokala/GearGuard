const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  specialization: {
    type: String,
    required: true,
    enum: ['Mechanics', 'Electricians', 'IT Support', 'HVAC', 'General'],
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  description: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
