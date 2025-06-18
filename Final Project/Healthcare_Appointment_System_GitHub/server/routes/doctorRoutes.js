const express = require("express");
const bcrypt = require("bcrypt");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

const router = express.Router();

// Register a new doctor
router.post("/register", async (req, res) => {
  try {
    const {
      firstname, lastname, email, phone, specialization, experience,
      qualifications, license, hospital, address, city, country,
      consultationFee, bio, username, password, availability
    } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({
      $or: [{ email }, { username }, { license }]
    });

    if (existingDoctor) {
      return res.status(400).json({
        message: "Doctor already exists with this email, username, or license"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new doctor
    const newDoctor = new Doctor({
      firstname, lastname, email, phone, specialization, experience,
      qualifications, license, hospital, address, city, country,
      consultationFee, bio, username, password: hashedPassword, availability
    });

    await newDoctor.save();

    res.status(201).json({
      message: "Doctor registered successfully",
      doctor: {
        id: newDoctor._id,
        firstname: newDoctor.firstname,
        lastname: newDoctor.lastname,
        email: newDoctor.email,
        specialization: newDoctor.specialization
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Doctor login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find doctor by username
    const doctor = await Doctor.findOne({ username, isActive: true });
    if (!doctor) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      doctor: {
        id: doctor._id,
        firstname: doctor.firstname,
        lastname: doctor.lastname,
        email: doctor.email,
        specialization: doctor.specialization,
        username: doctor.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all doctors with search and filter
router.get("/", async (req, res) => {
  try {
    const { search, specialization, city, sortBy = 'rating' } = req.query;
    let filter = { isActive: true };

    if (search) {
      filter.$or = [
        { firstname: { $regex: search, $options: 'i' } },
        { lastname: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } },
        { hospital: { $regex: search, $options: 'i' } }
      ];
    }

    if (specialization) {
      filter.specialization = { $regex: specialization, $options: 'i' };
    }

    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }

    const sortOptions = {};
    if (sortBy === 'rating') {
      sortOptions.rating = -1;
    } else if (sortBy === 'experience') {
      sortOptions.experience = -1;
    } else if (sortBy === 'fee') {
      sortOptions.consultationFee = 1;
    }

    const doctors = await Doctor.find(filter)
      .select('-password')
      .sort(sortOptions);

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .select('-password');
    
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update doctor availability
router.put("/:id/availability", async (req, res) => {
  try {
    const { availability } = req.body;
    
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { availability },
      { new: true }
    ).select('-password');

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      message: "Availability updated successfully",
      doctor
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get doctor's appointments
router.get("/:id/appointments", async (req, res) => {
  try {
    const { status, date } = req.query;
    let filter = { doctor: req.params.id };

    if (status) {
      filter.status = status;
    }

    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);
      filter.appointmentDate = {
        $gte: searchDate,
        $lt: nextDay
      };
    }

    const appointments = await Appointment.find(filter)
      .populate('patient', 'firstname lastname email phone')
      .sort({ appointmentDate: 1, 'timeSlot.startTime': 1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
