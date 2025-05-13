const WAT = require('../models/WAT'); // Assuming you're using a WAT model

// Function to fetch active WATs by year
exports.getActiveWATsByYear = async (req, res) => {
  try {
    const { year } = req.params;

    // Find WATs where the year matches the one provided
    const activeWATs = await WAT.find({ year })
      .where('startTime').lte(new Date()) // Active if startTime is past
      .where('endTime').gte(new Date())  // Active if endTime is in future

    if (activeWATs.length === 0) {
      return res.status(404).json({ message: 'No active WATs found.' });
    }

    res.status(200).json(activeWATs);
  } catch (error) {
    console.error('Error fetching active WATs:', error);
    res.status(500).json({ error: 'Failed to fetch active WATs.' });
  }
};
