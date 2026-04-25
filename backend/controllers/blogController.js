const Blog = require('../models/BlogModel');

// @desc    Get all blogs
// @route   GET /api/blog
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single blog
// @route   GET /api/blog/:id
// @access  Public
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Create a blog
// @route   POST /api/blog
// @access  Private
const createBlog = async (req, res) => {
  try {
    const { title, content, author, image } = req.body;

    if (!title || !content || !author || !image) {
      return res.status(400).json({ message: 'title, content, author, and image are required' });
    }

    const blog = await Blog.create({ title, content, author, image });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a blog
// @route   PUT /api/blog/:id
// @access  Private
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blog/:id
// @access  Private
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    await blog.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
