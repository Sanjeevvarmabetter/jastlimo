import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  fullName: String,
  profilePicture: String,
  contactDetails: String,
  address: String,
  dateOfBirth: Date,
  aadharNumber: String,
  licenseNumber: String,
  licenseExpiry: Date,
  joiningDate: Date,
  yearsOfExperience: Number,
  routesAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route' }],
  employmentStatus: { type: String, enum: ['Active', 'On Leave', 'Resigned'], default: 'Active' },
  documents: [{ name: String, fileUrl: String, expiryDate: Date }],
  attendanceLogs: [{ date: Date, present: Boolean, loginTime: String, tripStartTime: String }],
  performanceLogs: [{
    date: Date,
    numberOfTrips: Number,
    totalDistance: Number,
    fuelEfficiency: Number,
    incidents: String,
    comments: String,
    specialPoints: Number,
    starRating: Number
  }],
  ratingHistory: [{ week: String, rating: Number }],
  currentStarRating: Number,
  isBlacklisted: { type: Boolean, default: false },
  fleetOperatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Operator' }
});

export default mongoose.model('Driver', driverSchema);
