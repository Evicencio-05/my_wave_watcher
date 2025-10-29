const express = require('express');
const router = express.Router();
const { fetchBuoyData } = require('../services/dataService');

// GET /api/surf-data/:location - Fetch and return latest data
router.get('/:location', async (req, res) => {
  const { location } = req.params;
  const data = await fetchBuoyData(location);
  console.log("Buoy Data recieved.", data)
  if (data.length > 0) {
    res.json({ latest: data[data.length - 1], all: data });
  } else {
    res.status(404).json({ error: 'No data found for station' });
  }
});

module.exports = router;
