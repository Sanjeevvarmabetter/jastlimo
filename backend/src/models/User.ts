import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'operator'], required: true },
  fleetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Operator' }
});

export default mongoose.model('User', userSchema);

