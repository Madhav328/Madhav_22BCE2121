/**
 * Doctor Model - Healthcare Appointment System
 * Author: Chinnari Krishna Madhav
 * Description: MongoDB schema for healthcare provider profiles
 */

const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  qualifications: { type: String, required: true },
  license: { type: String, required: true, unique: true },
  hospital: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  consultationFee: { type: Number, required: true },
  bio: { type: String },
  profileImage: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  availability: [{
    day: { type: String, required: true }, // Monday, Tuesday, etc.
    timeSlots: [{
      startTime: { type: String, required: true }, // "09:00"
      endTime: { type: String, required: true }, // "10:00"
      maxPatients: { type: Number, default: 1 }
    }]
  }],
  isActive: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Doctor", doctorSchema);
