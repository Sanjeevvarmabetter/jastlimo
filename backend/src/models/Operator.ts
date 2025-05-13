import mongoose from 'mongoose';

const operatorSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }],
    vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }],




});

export default mongoose.model('Operator', operatorSchema);  


