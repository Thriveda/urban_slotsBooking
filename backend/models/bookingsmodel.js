import mongoose from 'mongoose';    

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'registerDetails',
    required: true
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SlotModel',
    required: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'providerDetails',
    required: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'pending'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }

});

bookingSchema.index({ userId: 1, slotId: 1, providerId: 1, createdAt: -1 });

export const Booking = mongoose.model('booking', bookingSchema);
