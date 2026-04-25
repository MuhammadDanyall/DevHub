const Portfolio = require('../models/PortfolioModel');

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find();
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a portfolio item
// @route   POST /api/portfolio
// @access  Private
const createPortfolio = async (req, res) => {
  try {
    const { projectName, image, techStack, link } = req.body;
    const normalizedTechStack = Array.isArray(techStack)
      ? techStack.map((tech) => tech.trim()).filter(Boolean)
      : String(techStack || '')
          .split(',')
          .map((tech) => tech.trim())
          .filter(Boolean);

    if (!projectName || !image || !link || normalizedTechStack.length === 0) {
      return res.status(400).json({ message: 'projectName, image, techStack, and link are required' });
    }

    const project = await Portfolio.create({
      projectName,
      image,
      techStack: normalizedTechStack,
      link,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private
const updatePortfolio = async (req, res) => {
  try {
    const project = await Portfolio.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const updateData = { ...req.body };
    if (Object.prototype.hasOwnProperty.call(updateData, 'techStack')) {
      updateData.techStack = Array.isArray(updateData.techStack)
        ? updateData.techStack.map((tech) => tech.trim()).filter(Boolean)
        : String(updateData.techStack || '')
            .split(',')
            .map((tech) => tech.trim())
            .filter(Boolean);
    }

    const updatedProject = await Portfolio.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private
const deletePortfolio = async (req, res) => {
  try {
    const project = await Portfolio.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await project.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getPortfolio, createPortfolio, updatePortfolio, deletePortfolio };
