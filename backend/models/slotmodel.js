import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'providersmodel',
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'hold'],
    default: 'available'
  },
  price:{
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Slot = mongoose.model('SlotModel', slotSchema);
