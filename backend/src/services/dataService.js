const axios = require('axios');
const SurfData = require('../models/SurfData');

// Fetch real-time data for a station
async function fetchBuoyData(stationId) {
  try {
    const response = await axios.get(`https://www.ndbc.noaa.gov/data/realtime2/${stationId}.txt`);
    const lines = response.data.split('\n').slice(1); // Skip header
    const dataPoints = [];

    lines.forEach(line => {
      if (line.trim()) {
        const columns = line.trim().split(/\s+/); // Whitespace-delimited
        if (columns.length >= 10) { // Ensure enough columns
          const timestamp = new Date(
            `20${columns[0]}-${columns[1].padStart(2, '0')}-${columns[2].padStart(2, '0')}T${columns[3].padStart(2, '0')}:${columns[4].padStart(2, '0')}:00Z`
          ); // YY MM DD HH MM -> ISO Date
          const waveHeight = parseFloat(columns[6]) || 0; // Significant wave height (col 7, index 6)
          const wavePeriod = parseFloat(columns[7]) || 0; // Dominant period (col 8, index 7)
          const windSpeed = parseFloat(columns[9]) || 0; // Wind speed (col 10, index 9)
          const windDirection = columns[8] || 'N/A'; // Wind direction (col 9, index 8)

          dataPoints.push({
            location: stationId,
            timestamp,
            waveHeight,
            wavePeriod,
            windSpeed,
            windDirection
          });
        }
      }
    });

    // Store in MongoDB (latest point for simplicity; extend for all)
    if (dataPoints.length > 0) {
      await SurfData.deleteMany({ location: stationId }); // Clear old for demo
      await SurfData.insertMany(dataPoints);
    }

    return dataPoints;
  } catch (error) {
    console.error('Error fetching buoy data:', error.message);
    return [];
  }
}

module.exports = { fetchBuoyData };
