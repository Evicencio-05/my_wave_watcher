// Utility functions for analyzing surf data
const SurfData = require('../models/SurfData');

// Calculate average wave height for a location over a time period
async function getAverageWaveHeight(location, startTime, endTime) {
  try {
    const data = await SurfData.find({
      location,
      timestamp: { $gte: startTime, $lte: endTime }
    });
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, curr) => acc + curr.waveHeight, 0);
    return Number((sum / data.length).toFixed(2)); // Round to 2 decimals
  } catch (error) {
    console.error('Error calculating average wave height:', error.message);
    return 0;
  }
}

// Identify surfable conditions (e.g., wave height > 1m, period > 8s)
async function getSurfableConditions(location, startTime, endTime) {
  try {
    const data = await SurfData.find({
      location,
      timestamp: { $gte: startTime, $lte: endTime }
    });
    return data.filter(d => d.waveHeight > 1 && d.wavePeriod > 8).map(d => ({
      timestamp: d.timestamp,
      waveHeight: d.waveHeight,
      wavePeriod: d.wavePeriod
    }));
  } catch (error) {
    console.error('Error finding surfable conditions:', error.message);
    return [];
  }
}

// Get latest data point for a location
async function getLatestData(location) {
  try {
    const data = await SurfData.findOne({ location })
      .sort({ timestamp: -1 }) // Latest first
      .lean();
    return data || null;
  } catch (error) {
    console.error('Error fetching latest data:', error.message);
    return null;
  }
}

module.exports = {
  getAverageWaveHeight,
  getSurfableConditions,
  getLatestData
};
