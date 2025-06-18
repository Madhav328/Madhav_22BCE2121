/**
 * Appointment Model - Healthcare Appointment System
 * Author: Chinnari Krishna Madhav
 * Description: MongoDB schema for medical appointment scheduling
 */

const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  appointmentDate: { type: Date, required: true },
  timeSlot: {
    startTime: { type: String, required: true }, // "09:00"
    endTime: { type: String, required: true } // "10:00"
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  reasonForVisit: { type: String, required: true },
  symptoms: [{ type: String }],
  notes: { type: String },
  consultationFee: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  prescription: {
    medications: [{
      name: { type: String },
      dosage: { type: String },
      frequency: { type: String },
      duration: { type: String }
    }],
    instructions: { type: String }
  },
  followUpDate: { type: Date },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
appointmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Appointment", appointmentSchema);
