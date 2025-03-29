import mongoose from 'mongoose';

// Define schema for URL collection
const urlSchema = new mongoose.Schema({
  shortCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  originalUrl: {
    type: String,
    required: true,
    trim: true,
  },
  clicks: {
    type: Number,
    default: 0,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: null,
  },
});

// Create URL model (if it doesn't exist already)
const Url = mongoose.models.Url || mongoose.model('Url', urlSchema);

export default Url; 