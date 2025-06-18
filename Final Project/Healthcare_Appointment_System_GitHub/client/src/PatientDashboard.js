import React, { useState, useEffect } from 'react';
import './PatientDashboard.css';

const PatientDashboard = ({ patient, onLogout }) => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    reasonForVisit: '',
    symptoms: '',
    notes: ''
  });

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDoctor, selectedDate]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/patients/${patient.id}/appointments`);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctors');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/available-slots/${selectedDoctor._id}/${selectedDate}`);
      const data = await response.json();
      setAvailableSlots(data.availableSlots || []);
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = selectedSpecialization === '' || 
                                 doctor.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase());
    
    return matchesSearch && matchesSpecialization;
  });

  const openBookingModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
    setSelectedDate('');
    setSelectedTimeSlot(null);
    setAvailableSlots([]);
    setBookingForm({
      reasonForVisit: '',
      symptoms: '',
      notes: ''
    });
  };

  const bookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTimeSlot || !bookingForm.reasonForVisit) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: selectedDoctor._id,
          patientId: patient.id,
          appointmentDate: selectedDate,
          timeSlot: {
            startTime: selectedTimeSlot.startTime,
            endTime: selectedTimeSlot.endTime
          },
          reasonForVisit: bookingForm.reasonForVisit,
          symptoms: bookingForm.symptoms.split(',').map(s => s.trim()).filter(s => s),
          notes: bookingForm.notes
        }),
      });

      if (response.ok) {
        alert('Appointment booked successfully!');
        setShowBookingModal(false);
        fetchAppointments();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment');
    }
  };

  const cancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      const reason = prompt('Please provide a reason for cancellation:');
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });

      if (response.ok) {
        alert('Appointment cancelled successfully!');
        fetchAppointments();
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'scheduled': return 'status-scheduled';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      case 'no-show': return 'status-no-show';
      default: return 'status-default';
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const uniqueSpecializations = [...new Set(doctors.map(doctor => doctor.specialization))];

  return (
    <div className="patient-dashboard">
      <div className="dashboard-header">
        <div className="patient-info">
          <h2>Welcome, {patient.firstname} {patient.lastname}</h2>
          <p>Patient Dashboard</p>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="doctors-section">
          <h3>Find a Doctor</h3>
          
          <div className="search-filters">
            <input
              type="text"
              placeholder="Search doctors, specializations, or hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="specialization-filter"
            >
              <option value="">All Specializations</option>
              {uniqueSpecializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div className="doctors-grid">
            {filteredDoctors.map((doctor) => (
              <div key={doctor._id} className="doctor-card">
                <div className="doctor-header">
                  <h4>Dr. {doctor.firstname} {doctor.lastname}</h4>
                  <span className="rating">★ {doctor.rating || 'N/A'}</span>
                </div>
                <div className="doctor-details">
                  <p><strong>Specialization:</strong> {doctor.specialization}</p>
                  <p><strong>Experience:</strong> {doctor.experience} years</p>
                  <p><strong>Hospital:</strong> {doctor.hospital}</p>
                  <p><strong>Location:</strong> {doctor.city}, {doctor.country}</p>
                  <p><strong>Consultation Fee:</strong> ${doctor.consultationFee}</p>
                  {doctor.bio && <p><strong>About:</strong> {doctor.bio}</p>}
                </div>
                <button
                  className="btn-book-appointment"
                  onClick={() => openBookingModal(doctor)}
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="appointments-section">
          <h3>My Appointments</h3>
          
          {appointments.length === 0 ? (
            <div className="no-appointments">
              <p>You have no appointments yet.</p>
            </div>
          ) : (
            <div className="appointments-list">
              {appointments.map((appointment) => (
                <div key={appointment._id} className="appointment-card">
                  <div className="appointment-header">
                    <div className="doctor-info">
                      <h4>Dr. {appointment.doctor.firstname} {appointment.doctor.lastname}</h4>
                      <p>{appointment.doctor.specialization}</p>
                      <p>{appointment.doctor.hospital}</p>
                    </div>
                    <span className={`status-badge ${getStatusBadgeClass(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="appointment-details">
                    <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {appointment.timeSlot.startTime} - {appointment.timeSlot.endTime}</p>
                    <p><strong>Reason:</strong> {appointment.reasonForVisit}</p>
                    <p><strong>Fee:</strong> ${appointment.consultationFee}</p>
                  </div>

                  {appointment.status === 'scheduled' && (
                    <div className="appointment-actions">
                      <button
                        className="btn-cancel"
                        onClick={() => cancelAppointment(appointment._id)}
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <div className="modal-overlay">
          <div className="modal-content booking-modal">
            <div className="modal-header">
              <h3>Book Appointment with Dr. {selectedDoctor.firstname} {selectedDoctor.lastname}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowBookingModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="booking-step">
                <label>Select Date:</label>
                <input
                  type="date"
                  min={getTomorrowDate()}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-input"
                />
              </div>

              {selectedDate && (
                <div className="booking-step">
                  <label>Available Time Slots:</label>
                  {availableSlots.length === 0 ? (
                    <p className="no-slots">No available slots for this date</p>
                  ) : (
                    <div className="time-slots">
                      {availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          className={`time-slot ${selectedTimeSlot === slot ? 'selected' : ''}`}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          {slot.startTime} - {slot.endTime}
                          <span className="slot-info">({slot.availableSpots} available)</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="booking-step">
                <label>Reason for Visit (Required):</label>
                <input
                  type="text"
                  value={bookingForm.reasonForVisit}
                  onChange={(e) => setBookingForm({...bookingForm, reasonForVisit: e.target.value})}
                  placeholder="e.g., Regular checkup, Consultation, etc."
                  className="form-input"
                />
              </div>

              <div className="booking-step">
                <label>Symptoms (Optional):</label>
                <input
                  type="text"
                  value={bookingForm.symptoms}
                  onChange={(e) => setBookingForm({...bookingForm, symptoms: e.target.value})}
                  placeholder="Separate multiple symptoms with commas"
                  className="form-input"
                />
              </div>

              <div className="booking-step">
                <label>Additional Notes (Optional):</label>
                <textarea
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                  placeholder="Any additional information for the doctor"
                  className="form-textarea"
                  rows="3"
                />
              </div>

              <div className="booking-summary">
                <h4>Booking Summary</h4>
                <p><strong>Doctor:</strong> Dr. {selectedDoctor.firstname} {selectedDoctor.lastname}</p>
                <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
                <p><strong>Hospital:</strong> {selectedDoctor.hospital}</p>
                <p><strong>Consultation Fee:</strong> ${selectedDoctor.consultationFee}</p>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-book"
                onClick={bookAppointment}
                disabled={!selectedDate || !selectedTimeSlot || !bookingForm.reasonForVisit}
              >
                Book Appointment
              </button>
              <button 
                className="btn-cancel-modal"
                onClick={() => setShowBookingModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
