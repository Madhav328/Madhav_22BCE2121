import React, { useState, useEffect } from 'react';
import './DoctorDashboard.css';

const DoctorDashboard = ({ doctor, onLogout }) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availability, setAvailability] = useState([]);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

  useEffect(() => {
    fetchAppointments();
    fetchDoctorDetails();
  }, [selectedDate]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${doctor.id}/appointments?date=${selectedDate}`);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchDoctorDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${doctor.id}`);
      const data = await response.json();
      setAvailability(data.availability || []);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchAppointments();
        alert('Appointment status updated successfully!');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const updateAvailability = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${doctor.id}/availability`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availability }),
      });

      if (response.ok) {
        alert('Availability updated successfully!');
        setShowAvailabilityModal(false);
      }
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const addTimeSlot = (dayIndex) => {
    const newAvailability = [...availability];
    if (!newAvailability[dayIndex].timeSlots) {
      newAvailability[dayIndex].timeSlots = [];
    }
    newAvailability[dayIndex].timeSlots.push({
      startTime: '09:00',
      endTime: '10:00',
      maxPatients: 1
    });
    setAvailability(newAvailability);
  };

  const removeTimeSlot = (dayIndex, slotIndex) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].timeSlots.splice(slotIndex, 1);
    setAvailability(newAvailability);
  };

  const updateTimeSlot = (dayIndex, slotIndex, field, value) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].timeSlots[slotIndex][field] = value;
    setAvailability(newAvailability);
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

  return (
    <div className="doctor-dashboard">
      <div className="dashboard-header">
        <div className="doctor-info">
          <h2>Dr. {doctor.firstname} {doctor.lastname}</h2>
          <p>{doctor.specialization}</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn-availability"
            onClick={() => setShowAvailabilityModal(true)}
          >
            Manage Availability
          </button>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="appointments-section">
          <div className="section-header">
            <h3>Today's Appointments</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-picker"
            />
          </div>

          <div className="appointments-grid">
            {appointments.length === 0 ? (
              <div className="no-appointments">
                <p>No appointments for this date</p>
              </div>
            ) : (
              appointments.map((appointment) => (
                <div key={appointment._id} className="appointment-card">
                  <div className="appointment-header">
                    <div className="patient-info">
                      <h4>{appointment.patient.firstname} {appointment.patient.lastname}</h4>
                      <p>{appointment.patient.email}</p>
                      <p>{appointment.patient.phone}</p>
                    </div>
                    <span className={`status-badge ${getStatusBadgeClass(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="appointment-details">
                    <p><strong>Time:</strong> {appointment.timeSlot.startTime} - {appointment.timeSlot.endTime}</p>
                    <p><strong>Reason:</strong> {appointment.reasonForVisit}</p>
                    {appointment.symptoms && appointment.symptoms.length > 0 && (
                      <p><strong>Symptoms:</strong> {appointment.symptoms.join(', ')}</p>
                    )}
                    {appointment.notes && (
                      <p><strong>Notes:</strong> {appointment.notes}</p>
                    )}
                  </div>

                  {appointment.status === 'scheduled' && (
                    <div className="appointment-actions">
                      <button
                        className="btn-complete"
                        onClick={() => updateAppointmentStatus(appointment._id, 'completed')}
                      >
                        Mark Complete
                      </button>
                      <button
                        className="btn-no-show"
                        onClick={() => updateAppointmentStatus(appointment._id, 'no-show')}
                      >
                        No Show
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Availability Modal */}
      {showAvailabilityModal && (
        <div className="modal-overlay">
          <div className="modal-content availability-modal">
            <div className="modal-header">
              <h3>Manage Availability</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAvailabilityModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, dayIndex) => {
                const dayAvailability = availability.find(avail => avail.day === day) || { day, timeSlots: [] };
                const currentDayIndex = availability.findIndex(avail => avail.day === day);
                
                if (currentDayIndex === -1) {
                  availability.push(dayAvailability);
                }

                return (
                  <div key={day} className="day-availability">
                    <h4>{day}</h4>
                    {dayAvailability.timeSlots?.map((slot, slotIndex) => (
                      <div key={slotIndex} className="time-slot">
                        <input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => updateTimeSlot(dayIndex, slotIndex, 'startTime', e.target.value)}
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => updateTimeSlot(dayIndex, slotIndex, 'endTime', e.target.value)}
                        />
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={slot.maxPatients}
                          onChange={(e) => updateTimeSlot(dayIndex, slotIndex, 'maxPatients', parseInt(e.target.value))}
                          placeholder="Max Patients"
                        />
                        <button
                          className="btn-remove-slot"
                          onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      className="btn-add-slot"
                      onClick={() => addTimeSlot(dayIndex)}
                    >
                      Add Time Slot
                    </button>
                  </div>
                );
              })}
            </div>
            
            <div className="modal-footer">
              <button className="btn-save" onClick={updateAvailability}>
                Save Changes
              </button>
              <button 
                className="btn-cancel"
                onClick={() => setShowAvailabilityModal(false)}
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

export default DoctorDashboard;
