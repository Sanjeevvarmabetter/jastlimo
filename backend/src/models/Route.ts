import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
  name: String,
  startPoint: String,
  endPoint: String,
  stops: [String],
  distance: Number
});

export default mongoose.model('Route', routeSchema);
