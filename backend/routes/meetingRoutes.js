const express = require('express');
const router = express.Router();
const Meeting = require('../models/MeetingModel');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/meetings
// @desc    Create a new meeting (Public)
router.post('/', async (req, res) => {
  try {
    const { clientName, clientEmail, date, timeSlot } = req.body;
    
    if (!clientName || !clientEmail || !date || !timeSlot) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if slot already booked
    const existingMeeting = await Meeting.findOne({ date, timeSlot, status: { $in: ['Pending', 'Confirmed'] } });
    if (existingMeeting) {
      return res.status(400).json({ message: 'This time slot is already booked.' });
    }

    const meeting = await Meeting.create({
      clientName, clientEmail, date, timeSlot,
    });
    
    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/meetings
// @desc    Get all meetings
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ createdAt: -1 });
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/meetings/:id
// @desc    Update meeting status
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

    if (req.body.status) {
      meeting.status = req.body.status;
    }
    const updatedMeeting = await meeting.save();
    
    res.status(200).json(updatedMeeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/meetings/:id
// @desc    Delete meeting
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

    await meeting.deleteOne();
    res.status(200).json({ message: 'Meeting removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/meetings/booked-slots
// @desc    Get booked slots for a specific date (Public)
router.get('/booked-slots', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: 'Date is required' });

    const meetings = await Meeting.find({ 
      date, 
      status: { $in: ['Pending', 'Confirmed'] } 
    }).select('timeSlot');

    const bookedSlots = meetings.map((meeting) => meeting.timeSlot);
    res.status(200).json(bookedSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
