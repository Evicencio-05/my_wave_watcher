const mongoose = require('mongoose');

// Schema for NOAA buoy data (e.g., station 46087 for Huntington Beach)
const surfDataSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true, // Station ID (e.g., "46087")
    index: true // Optimize queries by location
  },
  timestamp: {
    type: Date,
    required: true, // Date/time of measurement
    index: true // Optimize time-based queries
  },
  waveHeight: {
    type: Number, // Significant wave height in meters
    required: true,
    min: 0 // Ensure non-negative
  },
  wavePeriod: {
    type: Number, // Dominant wave period in seconds
    required: true,
    min: 0
  },
  windSpeed: {
    type: Number, // Wind speed in meters/second
    required: true,
    min: 0
  },
  windDirection: {
    type: String, // Wind direction (e.g., "NW", "N/A")
    required: true
  }
}, {
  timestamps: true // Auto-add createdAt/updatedAt
});

// Compound index for efficient location+time queries
surfDataSchema.index({ location: 1, timestamp: -1 });

module.exports = mongoose.model('SurfData', surfDataSchema);
