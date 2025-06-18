/**
 * Healthcare Appointment Booking System - Main React App
 * Author: Chinnari Krishna Madhav
 * Description: Main application component with routing and authentication
 */

import React, { useState, useEffect } from 'react';
import './App.css';

// Import new components
import DoctorLogin from './DoctorLogin';
import DoctorSignup from './DoctorSignup';
import DoctorDashboard from './DoctorDashboard';
import PatientLogin from './PatientLogin';
import PatientSignup from './PatientSignup';
import PatientDashboard from './PatientDashboard';

function App() {
  const [currentView, setCurrentView] = useState('home'); // home, doctorLogin, doctorSignup, patientLogin, patientSignup
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'doctor' or 'patient'

  // Check for saved user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('healthcareUser');
    const savedUserType = localStorage.getItem('healthcareUserType');
    
    if (savedUser && savedUserType) {
      setUser(JSON.parse(savedUser));
      setUserType(savedUserType);
    }
  }, []);

  const handleLogin = (userData, type) => {
    setUser(userData);
    setUserType(type);
    
    // Save to localStorage for session persistence
    localStorage.setItem('healthcareUser', JSON.stringify(userData));
    localStorage.setItem('healthcareUserType', type);
  };

  const handleLogout = () => {
    setUser(null);
    setUserType(null);
    setCurrentView('home');
    
    // Clear localStorage
    localStorage.removeItem('healthcareUser');
    localStorage.removeItem('healthcareUserType');
  };

  // If user is logged in, show appropriate dashboard
  if (user && userType) {
    if (userType === 'doctor') {
      return <DoctorDashboard doctor={user} onLogout={handleLogout} />;
    } else if (userType === 'patient') {
      return <PatientDashboard patient={user} onLogout={handleLogout} />;
    }
  }

  // Render different views based on currentView state
  const renderCurrentView = () => {
    switch (currentView) {
      case 'doctorLogin':
        return (
          <DoctorLogin
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentView('doctorSignup')}
            onSwitchToPatient={() => setCurrentView('patientLogin')}
          />
        );
      
      case 'doctorSignup':
        return (
          <DoctorSignup
            onSignup={handleLogin}
            onSwitchToLogin={() => setCurrentView('doctorLogin')}
          />
        );
      
      case 'patientLogin':
        return (
          <PatientLogin
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentView('patientSignup')}
            onSwitchToDoctor={() => setCurrentView('doctorLogin')}
          />
        );
      
      case 'patientSignup':
        return (
          <PatientSignup
            onSignup={handleLogin}
            onSwitchToLogin={() => setCurrentView('patientLogin')}
          />
        );
      
      default:
        return (
          <div className="home-container">
            <div className="hero-section">
              <div className="hero-content">
                <h1>HealthCare Appointment System</h1>
                <p>Book appointments with qualified doctors easily and manage your healthcare online</p>
                
                <div className="cta-buttons">
                  <div className="user-type-section">
                    <h2>For Patients</h2>
                    <p>Find doctors, book appointments, and manage your health records</p>
                    <div className="button-group">
                      <button 
                        className="cta-button patient-button"
                        onClick={() => setCurrentView('patientLogin')}
                      >
                        Patient Login
                      </button>
                      <button 
                        className="cta-button-outline patient-outline"
                        onClick={() => setCurrentView('patientSignup')}
                      >
                        Sign Up as Patient
                      </button>
                    </div>
                  </div>
                  
                  <div className="user-type-section">
                    <h2>For Doctors</h2>
                    <p>Manage your practice, set availability, and connect with patients</p>
                    <div className="button-group">
                      <button 
                        className="cta-button doctor-button"
                        onClick={() => setCurrentView('doctorLogin')}
                      >
                        Doctor Login
                      </button>
                      <button 
                        className="cta-button-outline doctor-outline"
                        onClick={() => setCurrentView('doctorSignup')}
                      >
                        Sign Up as Doctor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="features-section">
              <div className="container">
                <h2>Why Choose Our Platform?</h2>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">🩺</div>
                    <h3>Expert Doctors</h3>
                    <p>Connect with qualified and experienced healthcare professionals</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">📅</div>
                    <h3>Easy Scheduling</h3>
                    <p>Book appointments at your convenience with real-time availability</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">💊</div>
                    <h3>Health Records</h3>
                    <p>Keep track of your medical history and prescriptions securely</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">🏥</div>
                    <h3>Multiple Specialties</h3>
                    <p>Find specialists across various medical fields and hospitals</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">⭐</div>
                    <h3>Reviews & Ratings</h3>
                    <p>Make informed decisions with patient reviews and doctor ratings</p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">🔒</div>
                    <h3>Secure & Private</h3>
                    <p>Your health information is protected with enterprise-grade security</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
}

export default App;
