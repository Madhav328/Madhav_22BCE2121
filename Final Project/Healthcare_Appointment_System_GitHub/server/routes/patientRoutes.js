const express = require("express");
const bcrypt = require("bcrypt");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");

const router = express.Router();

// Register a new patient
router.post("/register", async (req, res) => {
  try {
    const {
      firstname, lastname, email, phone, dateOfBirth, gender,
      address, city, country, emergencyContact, bloodGroup,
      allergies, medicalHistory, username, password
    } = req.body;

    // Check if patient already exists
    const existingPatient = await Patient.findOne({
      $or: [{ email }, { username }]
    });

    if (existingPatient) {
      return res.status(400).json({
        message: "Patient already exists with this email or username"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new patient
    const newPatient = new Patient({
      firstname, lastname, email, phone, dateOfBirth, gender,
      address, city, country, emergencyContact, bloodGroup,
      allergies, medicalHistory, username, password: hashedPassword
    });

    await newPatient.save();

    res.status(201).json({
      message: "Patient registered successfully",
      patient: {
        id: newPatient._id,
        firstname: newPatient.firstname,
        lastname: newPatient.lastname,
        email: newPatient.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Patient login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find patient by username
    const patient = await Patient.findOne({ username, isActive: true });
    if (!patient) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      patient: {
        id: patient._id,
        firstname: patient.firstname,
        lastname: patient.lastname,
        email: patient.email,
        username: patient.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get patient profile
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .select('-password');
    
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update patient profile
router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };
    delete updateData.password; // Don't allow password updates through this route

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      patient
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get patient's appointments
router.get("/:id/appointments", async (req, res) => {
  try {
    const { status } = req.query;
    let filter = { patient: req.params.id };

    if (status) {
      filter.status = status;
    }

    const appointments = await Appointment.find(filter)
      .populate('doctor', 'firstname lastname specialization hospital consultationFee')
      .sort({ appointmentDate: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
