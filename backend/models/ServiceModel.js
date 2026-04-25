const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a service title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a short description'],
    },
    iconUrl: {
      type: String,
      required: [true, 'Please add an icon URL'],
    },
    content: {
      type: String,
      required: [false, 'Please add full content description'],
    },
    features: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Service', serviceSchema);
