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
  windDirection: {
    type: Number,
    default: null
  },
  windSpeed: {
    type: Number,
    default: null
  },
  gustSpeed: {
    type: Number,
    default: null
  },
  waveHeight: {
    type: Number,
    default: null
  },
  dominantWavePeriod: {
    type: Number,
    default: null,
    alias: 'wavePeriod' // Alias for backward compatibility
  },
  averageWavePeriod: {
    type: Number,
    default: null
  },
  dominantWaveDirection: {
    type: Number,
    default: null
  },
  seaLevelPressure: {
    type: Number,
    default: null
  },
  airTempC: {
    type: Number,
    default: null
  },
  surfaceSeaTempC: {
    type: Number,
    default: null
  },
  dewPoint: {
    type: Number,
    default: null
  },
  stationVisibility: {
    type: Number,
    default: null
  },
  pressureTendency: {
    type: Number,
    default: null
  },
}, {
  timestamps: true, // Auto-add createdAt/updatedAt
  toJSON: { virtuals: true }, // Include virtuals in JSON output
  toObject: { virtuals: true } // Include virtuals in object output
});

// Virtual property for backward compatibility with frontend
surfDataSchema.virtual('wavePeriod').get(function() {
  return this.dominantWavePeriod;
});

// Compound index for efficient location+time queries
surfDataSchema.index({ location: 1, timestamp: -1 });

module.exports = mongoose.model('SurfData', surfDataSchema);
