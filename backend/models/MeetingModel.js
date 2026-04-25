const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Please add the client name'],
      trim: true,
    },
    clientEmail: {
      type: String,
      required: [true, 'Please add the client email'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Please select a date'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Please select a time slot'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Meeting', meetingSchema);
