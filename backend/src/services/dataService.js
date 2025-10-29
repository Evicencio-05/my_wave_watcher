const axios = require('axios');
const SurfData = require('../models/SurfData');

// Fetch real-time data for a station
async function fetchBuoyData(stationId) {
  try {
    const response = await axios.get(`https://www.ndbc.noaa.gov/data/realtime2/${stationId}.txt`);
    const lines = response.data.split('\n').slice(2); // Skip both header lines
    const dataPoints = [];

    lines.forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const columns = line.trim().split(/\s+/); // Whitespace-delimited
        if (columns.length >= 14) { // Ensure enough columns
          // Parse date: YYYY MM DD hh mm (columns 0-4)
          const year = parseInt(columns[0]);
          const month = parseInt(columns[1]) - 1; // JavaScript months are 0-indexed
          const day = parseInt(columns[2]);
          const hour = parseInt(columns[3]);
          const minute = parseInt(columns[4]);
          
          // Create UTC date
          const timestamp = new Date(Date.UTC(year, month, day, hour, minute));
          
          // Validate the timestamp
          if (isNaN(timestamp.getTime())) {
            console.warn(`Invalid timestamp for data: ${columns.slice(0, 5).join(' ')}`);
            return; // Skip this data point
          }

          // Parse data columns (handle "MM" for missing values)
          const parseValue = (val) => (val === "MM" || val === "mm") ? null : parseFloat(val);
          
          const windDirection = parseValue(columns[5]);
          const windSpeed = parseValue(columns[6]);
          const gustSpeed = parseValue(columns[7]);
          const waveHeight = parseValue(columns[8]);
          const dominantWavePeriod = parseValue(columns[9]);
          const averageWavePeriod = parseValue(columns[10]);
          const dominantWaveDirection = parseValue(columns[11]);
          const seaLevelPressure = parseValue(columns[12]);
          const airTempC = parseValue(columns[13]);
          const surfaceSeaTempC = parseValue(columns[14]);
          const dewPoint = columns.length > 15 ? parseValue(columns[15]) : null;
          const stationVisibility = columns.length > 16 ? parseValue(columns[16]) : null;
          const pressureTendency = columns.length > 17 ? parseValue(columns[17]) : null;

          // Only push if we have at least some wave data
          if (waveHeight !== null || dominantWavePeriod !== null) {
            dataPoints.push({
              location: stationId,
              timestamp,
              windDirection,
              windSpeed,
              gustSpeed,
              waveHeight,
              dominantWavePeriod,
              averageWavePeriod,
              dominantWaveDirection,
              seaLevelPressure,
              airTempC,
              surfaceSeaTempC,
              dewPoint,
              stationVisibility,
              pressureTendency
            });
          }
        }
      }
    });

    // Store in MongoDB (latest point for simplicity; extend for all)
    if (dataPoints.length > 0) {
      await SurfData.deleteMany({ location: stationId }); // Clear old for demo
      console.log("Old data deleted.")
      await SurfData.insertMany(dataPoints);
      console.log("New data added")
    }
    console.log("Data points: ", dataPoints);
    return dataPoints;
  } catch (error) {
    console.error('Error fetching buoy data:', error.message);
    return [];
  }
}

module.exports = { fetchBuoyData };
