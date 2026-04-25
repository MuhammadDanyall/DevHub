const Inquiry = require('../models/InquiryModel');
const Meeting = require('../models/MeetingModel');
const Service = require('../models/ServiceModel');
const Portfolio = require('../models/PortfolioModel');
const Blog = require('../models/BlogModel');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const [totalLeads, activeMeetings, totalServices, totalProjects, totalBlogs] = await Promise.all([
      Inquiry.countDocuments(),
      Meeting.countDocuments({ status: { $in: ['Pending', 'Confirmed'] } }),
      Service.countDocuments(),
      Portfolio.countDocuments(),
      Blog.countDocuments(),
    ]);

    res.status(200).json({
      totalLeads,
      activeMeetings,
      totalServices,
      totalProjects,
      totalBlogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };
