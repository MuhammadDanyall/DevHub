const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, 'Please add a project name'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please add an image URL'],
      trim: true,
    },
    techStack: {
      type: [String],
      required: [true, 'Please add at least one technology'],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: 'Please add at least one technology',
      },
    },
    link: {
      type: String,
      required: [true, 'Please add a project link'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
