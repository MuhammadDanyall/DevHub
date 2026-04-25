const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a blog title'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please add blog content'],
    },
    author: {
      type: String,
      required: [true, 'Please add an author'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please add a blog image'],
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blog', blogSchema);
