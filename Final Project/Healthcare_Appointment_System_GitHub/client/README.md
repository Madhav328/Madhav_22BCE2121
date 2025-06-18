# Healthcare Appointment Booking System - Frontend Client

A React-based frontend application for the Healthcare Appointment Booking System, enabling patients and doctors to manage appointments, profiles, and healthcare services online.

## 🚀 Features

### For Patients:
- **User Registration & Login** - Secure authentication with medical history
- **Doctor Discovery** - Search and browse available healthcare providers
- **Appointment Booking** - Schedule appointments with preferred doctors
- **Dashboard Management** - View upcoming appointments and medical records
- **Profile Management** - Update personal and medical information

### For Doctors:
- **Professional Registration** - Register with medical credentials and specializations
- **Schedule Management** - Set availability and manage appointment schedules
- **Patient Management** - View patient information and appointment details
- **Dashboard Analytics** - Track appointments and patient interactions

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+
- **Routing**: React Router DOM
- **Styling**: CSS3 with modern design patterns
- **State Management**: React Hooks (useState, useEffect, useContext)
- **HTTP Client**: Fetch API
- **Authentication**: JWT token-based authentication

## 📦 Installation

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Open [http://localhost:3001](http://localhost:3001) in your browser
   - Note: Port 3001 is used to avoid conflicts with other services

## 🏗️ Project Structure

```
client/
├── public/
│   ├── index.html          # Main HTML template
│   ├── manifest.json       # PWA configuration  
│   └── robots.txt         # Search engine instructions
├── src/
│   ├── components/
│   │   ├── DoctorLogin.js      # Doctor authentication
│   │   ├── DoctorSignup.js     # Doctor registration
│   │   ├── DoctorDashboard.js  # Doctor management panel
│   │   ├── PatientLogin.js     # Patient authentication
│   │   ├── PatientSignup.js    # Patient registration
│   │   └── PatientDashboard.js # Patient management panel
│   ├── styles/
│   │   ├── App.css            # Main application styles
│   │   ├── AuthForms.css      # Authentication form styles
│   │   ├── DoctorDashboard.css # Doctor dashboard styles
│   │   └── PatientDashboard.css # Patient dashboard styles
│   ├── App.js              # Main application component
│   ├── index.js           # React DOM entry point
│   └── index.css          # Global styles
└── package.json           # Dependencies and scripts
```

## 🔗 API Integration

The frontend communicates with the backend server running on `http://localhost:5000`:

- **Authentication**: `/api/doctors/`, `/api/patients/`
- **Appointments**: `/api/appointments/`
- **Profiles**: User profile management endpoints

## 🚨 Environment Setup

Ensure the backend server is running before starting the frontend:

1. Backend should be running on `http://localhost:5000`
2. MongoDB should be connected and accessible
3. Sample data should be seeded (run `npm run seed` in server directory)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)  
- **Mobile** (320px - 767px)

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Form Validation** - Client-side input validation
- **Secure Storage** - localStorage for session management
- **CORS Protection** - Cross-origin request security

## 🚀 Build & Deployment

```bash
# Create production build
npm run build

# The build folder contains optimized production files
# Deploy the contents of the build folder to your web server
```

## 📖 Usage

1. **First Time Setup**:
   - Use sample credentials from the main README.md
   - Or register new accounts for doctors/patients

2. **For Doctors**:
   - Register with medical credentials
   - Set up availability schedule
   - Manage patient appointments

3. **For Patients**:
   - Register with medical history
   - Search for doctors by specialization
   - Book and manage appointments

## 🤝 Contributing

1. Follow React best practices
2. Use consistent naming conventions
3. Add proper error handling
4. Test all new features
5. Update documentation

## 📄 License

This project is licensed under the MIT License - see the main project README for details.

## 👨‍💻 Author

**Chinnari Krishna Madhav**  
*Full-Stack Healthcare Developer*

---

**Note**: This is the frontend client for the Healthcare Appointment Booking System. Make sure the backend server is running for full functionality.
