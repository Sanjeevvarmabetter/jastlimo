import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: String,
  model: String,
  assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  assignedRoute: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' }
});

export default mongoose.model('Vehicle', vehicleSchema);
