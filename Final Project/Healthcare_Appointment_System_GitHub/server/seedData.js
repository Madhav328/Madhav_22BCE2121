/**
 * Database Seed Script - Healthcare Appointment System
 * Author: Chinnari Krishna Madhav
 * Description: Populates MongoDB with sample healthcare data for testing
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Import models
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');

// Sample data
const sampleDoctors = [
  {
    firstname: "Dr. Sarah",
    lastname: "Johnson",
    email: "sarah.johnson@hospital.com",
    phone: "+1-555-0101",
    specialization: "Cardiology",
    experience: 15,
    qualifications: "MBBS, MD Cardiology, FACC",
    license: "DOC123456",
    hospital: "City General Hospital",
    address: "123 Medical Plaza",
    city: "New York",
    country: "USA",
    consultationFee: 200,
    bio: "Experienced cardiologist with 15+ years in treating heart conditions. Specializes in preventive cardiology and heart disease management.",
    username: "dr_sarah",
    password: "password123",
    availability: [
      {
        day: "Monday",
        timeSlots: [
          { startTime: "09:00", endTime: "10:00", maxPatients: 2 },
          { startTime: "10:00", endTime: "11:00", maxPatients: 2 },
          { startTime: "14:00", endTime: "15:00", maxPatients: 2 }
        ]
      },
      {
        day: "Wednesday",
        timeSlots: [
          { startTime: "09:00", endTime: "10:00", maxPatients: 2 },
          { startTime: "10:00", endTime: "11:00", maxPatients: 2 }
        ]
      },
      {
        day: "Friday",
        timeSlots: [
          { startTime: "09:00", endTime: "10:00", maxPatients: 2 },
          { startTime: "14:00", endTime: "15:00", maxPatients: 2 }
        ]
      }
    ]
  },
  {
    firstname: "Dr. Michael",
    lastname: "Chen",
    email: "michael.chen@clinic.com",
    phone: "+1-555-0102",
    specialization: "Dermatology",
    experience: 8,
    qualifications: "MBBS, MD Dermatology",
    license: "DOC789012",
    hospital: "Skin Care Clinic",
    address: "456 Health Street",
    city: "Los Angeles",
    country: "USA",
    consultationFee: 150,
    bio: "Dermatologist specializing in skin disorders, cosmetic procedures, and dermatological surgery.",
    username: "dr_michael",
    password: "password123",
    availability: [
      {
        day: "Tuesday",
        timeSlots: [
          { startTime: "10:00", endTime: "11:00", maxPatients: 1 },
          { startTime: "11:00", endTime: "12:00", maxPatients: 1 },
          { startTime: "15:00", endTime: "16:00", maxPatients: 1 }
        ]
      },
      {
        day: "Thursday",
        timeSlots: [
          { startTime: "09:00", endTime: "10:00", maxPatients: 1 },
          { startTime: "10:00", endTime: "11:00", maxPatients: 1 }
        ]
      }
    ]
  },
  {
    firstname: "Dr. Emily",
    lastname: "Rodriguez",
    email: "emily.rodriguez@pediatrics.com",
    phone: "+1-555-0103",
    specialization: "Pediatrics",
    experience: 12,
    qualifications: "MBBS, MD Pediatrics, FAAP",
    license: "DOC345678",
    hospital: "Children's Medical Center",
    address: "789 Kids Avenue",
    city: "Chicago",
    country: "USA",
    consultationFee: 180,
    bio: "Pediatrician with extensive experience in child healthcare, vaccinations, and developmental disorders.",
    username: "dr_emily",
    password: "password123",
    availability: [
      {
        day: "Monday",
        timeSlots: [
          { startTime: "08:00", endTime: "09:00", maxPatients: 3 },
          { startTime: "09:00", endTime: "10:00", maxPatients: 3 }
        ]
      },
      {
        day: "Wednesday",
        timeSlots: [
          { startTime: "08:00", endTime: "09:00", maxPatients: 3 },
          { startTime: "13:00", endTime: "14:00", maxPatients: 3 }
        ]
      },
      {
        day: "Friday",
        timeSlots: [
          { startTime: "08:00", endTime: "09:00", maxPatients: 3 }
        ]
      }
    ]
  }
];

const samplePatients = [
  {
    firstname: "John",
    lastname: "Smith",
    email: "john.smith@email.com",
    phone: "+1-555-1001",
    dateOfBirth: new Date("1985-03-15"),
    gender: "Male",
    address: "321 Patient Street",
    city: "New York",
    country: "USA",
    emergencyContact: {
      name: "Jane Smith",
      phone: "+1-555-1002",
      relationship: "Spouse"
    },
    bloodGroup: "O+",
    allergies: ["Penicillin", "Shellfish"],
    medicalHistory: ["Hypertension", "Diabetes Type 2"],
    username: "john_smith",
    password: "password123"
  },
  {
    firstname: "Maria",
    lastname: "Garcia",
    email: "maria.garcia@email.com",
    phone: "+1-555-1003",
    dateOfBirth: new Date("1990-07-22"),
    gender: "Female",
    address: "654 Wellness Road",
    city: "Los Angeles",
    country: "USA",
    emergencyContact: {
      name: "Carlos Garcia",
      phone: "+1-555-1004",
      relationship: "Father"
    },
    bloodGroup: "A+",
    allergies: ["Latex"],
    medicalHistory: ["Asthma"],
    username: "maria_garcia",
    password: "password123"
  },
  {
    firstname: "David",
    lastname: "Wilson",
    email: "david.wilson@email.com",
    phone: "+1-555-1005",
    dateOfBirth: new Date("1978-11-08"),
    gender: "Male",
    address: "987 Health Lane",
    city: "Chicago",
    country: "USA",
    emergencyContact: {
      name: "Lisa Wilson",
      phone: "+1-555-1006",
      relationship: "Spouse"
    },
    bloodGroup: "B+",
    allergies: [],
    medicalHistory: ["High Cholesterol"],
    username: "david_wilson",
    password: "password123"
  },
  {
    firstname: "Emma",
    lastname: "Thompson",
    email: "emma.thompson@email.com",
    phone: "+1-555-1007",
    dateOfBirth: new Date("2015-05-12"),
    gender: "Female",
    address: "159 Family Street",
    city: "Chicago",
    country: "USA",
    emergencyContact: {
      name: "Sarah Thompson",
      phone: "+1-555-1008",
      relationship: "Mother"
    },
    bloodGroup: "AB+",
    allergies: ["Nuts"],
    medicalHistory: [],
    username: "emma_thompson",
    password: "password123"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
    await Appointment.deleteMany({});
    console.log('Cleared existing data');

    // Hash passwords and create doctors
    const doctors = [];
    for (let doctorData of sampleDoctors) {
      const hashedPassword = await bcrypt.hash(doctorData.password, 10);
      const doctor = new Doctor({
        ...doctorData,
        password: hashedPassword
      });
      const savedDoctor = await doctor.save();
      doctors.push(savedDoctor);
      console.log(`Created doctor: ${doctor.firstname} ${doctor.lastname}`);
    }

    // Hash passwords and create patients
    const patients = [];
    for (let patientData of samplePatients) {
      const hashedPassword = await bcrypt.hash(patientData.password, 10);
      const patient = new Patient({
        ...patientData,
        password: hashedPassword
      });
      const savedPatient = await patient.save();
      patients.push(savedPatient);
      console.log(`Created patient: ${patient.firstname} ${patient.lastname}`);
    }

    // Create sample appointments
    const appointments = [
      {
        doctor: doctors[0]._id, // Dr. Sarah Johnson
        patient: patients[0]._id, // John Smith
        appointmentDate: new Date("2024-06-20"),
        timeSlot: {
          startTime: "09:00",
          endTime: "10:00"
        },
        status: "scheduled",
        reasonForVisit: "Annual heart checkup",
        symptoms: ["Chest pain", "Shortness of breath"],
        consultationFee: 200,
        paymentStatus: "paid"
      },
      {
        doctor: doctors[1]._id, // Dr. Michael Chen
        patient: patients[1]._id, // Maria Garcia
        appointmentDate: new Date("2024-06-21"),
        timeSlot: {
          startTime: "10:00",
          endTime: "11:00"
        },
        status: "scheduled",
        reasonForVisit: "Skin rash consultation",
        symptoms: ["Skin rash", "Itching"],
        consultationFee: 150,
        paymentStatus: "pending"
      },
      {
        doctor: doctors[2]._id, // Dr. Emily Rodriguez
        patient: patients[3]._id, // Emma Thompson
        appointmentDate: new Date("2024-06-19"),
        timeSlot: {
          startTime: "08:00",
          endTime: "09:00"
        },
        status: "completed",
        reasonForVisit: "Routine checkup",
        symptoms: ["Fever", "Cough"],
        consultationFee: 180,
        paymentStatus: "paid",
        prescription: {
          medications: [
            {
              name: "Paracetamol",
              dosage: "500mg",
              frequency: "Twice daily",
              duration: "3 days"
            }
          ],
          instructions: "Rest and plenty of fluids. Take medication after meals."
        },
        rating: 5,
        review: "Dr. Rodriguez was excellent with my daughter. Very gentle and thorough."
      }
    ];

    for (let appointmentData of appointments) {
      const appointment = new Appointment(appointmentData);
      await appointment.save();
      console.log(`Created appointment for ${appointmentData.reasonForVisit}`);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('\n👨‍⚕️ DOCTORS:');
    console.log('Dr. Sarah Johnson (Cardiology): dr_sarah / password123');
    console.log('Dr. Michael Chen (Dermatology): dr_michael / password123');
    console.log('Dr. Emily Rodriguez (Pediatrics): dr_emily / password123');
    console.log('\n👤 PATIENTS:');
    console.log('John Smith: john_smith / password123');
    console.log('Maria Garcia: maria_garcia / password123');
    console.log('David Wilson: david_wilson / password123');
    console.log('Emma Thompson: emma_thompson / password123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

// Run the seed function
seedDatabase();
