const express = require("express");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

const router = express.Router();

// Book a new appointment
router.post("/book", async (req, res) => {
  try {
    const {
      doctorId, patientId, appointmentDate, timeSlot,
      reasonForVisit, symptoms, notes
    } = req.body;

    // Check if doctor exists and is active
    const doctor = await Doctor.findById(doctorId);
    if (!doctor || !doctor.isActive) {
      return res.status(404).json({ message: "Doctor not found or inactive" });
    }

    // Check if patient exists and is active
    const patient = await Patient.findById(patientId);
    if (!patient || !patient.isActive) {
      return res.status(404).json({ message: "Patient not found or inactive" });
    }

    // Check if the time slot is available
    const appointmentDateObj = new Date(appointmentDate);
    const dayName = appointmentDateObj.toLocaleDateString('en-US', { weekday: 'long' });

    // Verify doctor's availability for this day and time
    const dayAvailability = doctor.availability.find(avail => avail.day === dayName);
    if (!dayAvailability) {
      return res.status(400).json({ message: "Doctor is not available on this day" });
    }

    const timeSlotAvailable = dayAvailability.timeSlots.find(slot => 
      slot.startTime === timeSlot.startTime && slot.endTime === timeSlot.endTime
    );

    if (!timeSlotAvailable) {
      return res.status(400).json({ message: "Time slot not available" });
    }

    // Check for existing appointments in this time slot
    const existingAppointments = await Appointment.countDocuments({
      doctor: doctorId,
      appointmentDate: {
        $gte: new Date(appointmentDate),
        $lt: new Date(new Date(appointmentDate).getTime() + 24 * 60 * 60 * 1000)
      },
      timeSlot: timeSlot,
      status: { $in: ['scheduled'] }
    });

    if (existingAppointments >= timeSlotAvailable.maxPatients) {
      return res.status(400).json({ message: "Time slot is fully booked" });
    }

    // Check if patient already has an appointment with this doctor on the same day
    const patientExistingAppointment = await Appointment.findOne({
      doctor: doctorId,
      patient: patientId,
      appointmentDate: {
        $gte: new Date(appointmentDate),
        $lt: new Date(new Date(appointmentDate).getTime() + 24 * 60 * 60 * 1000)
      },
      status: 'scheduled'
    });

    if (patientExistingAppointment) {
      return res.status(400).json({ 
        message: "You already have an appointment with this doctor on this date" 
      });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      doctor: doctorId,
      patient: patientId,
      appointmentDate: appointmentDateObj,
      timeSlot,
      reasonForVisit,
      symptoms: symptoms || [],
      notes: notes || "",
      consultationFee: doctor.consultationFee
    });

    await newAppointment.save();

    // Populate the appointment data
    const populatedAppointment = await Appointment.findById(newAppointment._id)
      .populate('doctor', 'firstname lastname specialization hospital')
      .populate('patient', 'firstname lastname email phone');

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: populatedAppointment
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get available time slots for a doctor on a specific date
router.get("/available-slots/:doctorId/:date", async (req, res) => {
  try {
    const { doctorId, date } = req.params;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointmentDate = new Date(date);
    const dayName = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' });

    // Get doctor's availability for this day
    const dayAvailability = doctor.availability.find(avail => avail.day === dayName);
    if (!dayAvailability) {
      return res.status(200).json({ availableSlots: [] });
    }

    // Get existing appointments for this date
    const existingAppointments = await Appointment.find({
      doctor: doctorId,
      appointmentDate: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
      },
      status: 'scheduled'
    });

    // Calculate available slots
    const availableSlots = dayAvailability.timeSlots.map(slot => {
      const bookedCount = existingAppointments.filter(apt => 
        apt.timeSlot.startTime === slot.startTime && 
        apt.timeSlot.endTime === slot.endTime
      ).length;

      return {
        startTime: slot.startTime,
        endTime: slot.endTime,
        maxPatients: slot.maxPatients,
        bookedPatients: bookedCount,
        availableSpots: slot.maxPatients - bookedCount,
        isAvailable: (slot.maxPatients - bookedCount) > 0
      };
    }).filter(slot => slot.isAvailable);

    res.status(200).json({ availableSlots });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Cancel an appointment
router.put("/:id/cancel", async (req, res) => {
  try {
    const { reason } = req.body;

    const appointment = await Appointment.findById(req.params.id)
      .populate('doctor', 'firstname lastname')
      .populate('patient', 'firstname lastname');

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status !== 'scheduled') {
      return res.status(400).json({ message: "Cannot cancel this appointment" });
    }

    appointment.status = 'cancelled';
    appointment.notes = `Cancelled: ${reason || 'No reason provided'}`;
    await appointment.save();

    res.status(200).json({
      message: "Appointment cancelled successfully",
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update appointment status (for doctors)
router.put("/:id/status", async (req, res) => {
  try {
    const { status, prescription, followUpDate } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    if (prescription) {
      appointment.prescription = prescription;
    }
    if (followUpDate) {
      appointment.followUpDate = new Date(followUpDate);
    }

    await appointment.save();

    const updatedAppointment = await Appointment.findById(req.params.id)
      .populate('doctor', 'firstname lastname specialization')
      .populate('patient', 'firstname lastname email phone');

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: updatedAppointment
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add rating and review
router.put("/:id/review", async (req, res) => {
  try {
    const { rating, review } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status !== 'completed') {
      return res.status(400).json({ message: "Can only review completed appointments" });
    }

    appointment.rating = rating;
    appointment.review = review;
    await appointment.save();

    // Update doctor's average rating
    const doctorAppointments = await Appointment.find({
      doctor: appointment.doctor,
      rating: { $exists: true, $ne: null }
    });

    const totalRating = doctorAppointments.reduce((sum, apt) => sum + apt.rating, 0);
    const averageRating = totalRating / doctorAppointments.length;

    await Doctor.findByIdAndUpdate(appointment.doctor, {
      rating: Math.round(averageRating * 10) / 10,
      totalReviews: doctorAppointments.length
    });

    res.status(200).json({
      message: "Review added successfully",
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all appointments (for admin)
router.get("/", async (req, res) => {
  try {
    const { status, date, doctor, patient } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (doctor) filter.doctor = doctor;
    if (patient) filter.patient = patient;
    
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
      .populate('doctor', 'firstname lastname specialization hospital')
      .populate('patient', 'firstname lastname email phone')
      .sort({ appointmentDate: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
