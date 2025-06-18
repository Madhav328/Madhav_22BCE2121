# 🏥 Healthcare Appointment Booking System

A comprehensive, full-stack web application designed to streamline healthcare management by connecting patients with healthcare providers. This modern platform enables seamless appointment scheduling, patient management, and healthcare service delivery through an intuitive and responsive interface.

Whether you are a patient seeking medical care or a healthcare provider managing your practice, this system offers a complete solution for appointment booking, patient records management, and healthcare service coordination.

This project demonstrates advanced full-stack development practices, including secure authentication, role-based access control, appointment scheduling algorithms, payment integration, and responsive healthcare-focused UI design. The backend is powered by MongoDB Atlas for scalable and efficient healthcare data management.

---

## 🚀 Features

### 👤 **Patient Features**
1. **Secure Registration & Login**: HIPAA-compliant user authentication with encrypted password storage
2. **Doctor Discovery**: Advanced search and filtering by specialization, location, availability, and ratings
3. **Appointment Booking**: Real-time availability checking and instant appointment scheduling
4. **Medical Records**: Personal health information management with emergency contacts and medical history
5. **Appointment Management**: View, reschedule, and cancel appointments with automated notifications
6. **Payment Integration**: Secure payment processing with multiple payment options
7. **Review System**: Rate and review healthcare providers to help other patients

### 👨‍⚕️ **Doctor Features**
1. **Professional Profiles**: Comprehensive doctor profiles with qualifications, specializations, and experience
2. **Availability Management**: Flexible scheduling system with customizable time slots and patient limits
3. **Appointment Dashboard**: Centralized view of all scheduled, completed, and cancelled appointments
4. **Patient Records Access**: Secure access to patient medical history and appointment notes
5. **Prescription Management**: Digital prescription creation with medication tracking
6. **Revenue Tracking**: Financial overview with consultation fees and payment status monitoring
7. **Patient Communication**: Secure messaging system for patient-doctor communication

### 🏥 **System Features**
1. **Role-Based Access Control**: Separate dashboards and permissions for patients and healthcare providers
2. **Real-Time Notifications**: Appointment reminders, cancellations, and system updates
3. **Responsive Design**: Mobile-first approach ensuring accessibility across all devices
4. **Data Security**: HIPAA-compliant data handling with encryption and secure storage
5. **Search & Filtering**: Advanced search capabilities for doctors, appointments, and medical records
6. **Payment Processing**: Integrated payment gateway with support for insurance and direct payments
7. **Reporting & Analytics**: Comprehensive reports for appointment trends and healthcare metrics

---

## 👨‍💻 Author

**Chinnari Krishna Madhav**  
*Healthcare Technology Developer*

This Healthcare Appointment Booking System was designed and developed by Chinnari Krishna Madhav as a comprehensive solution for modern healthcare management needs.

---

## 🛠️ Technology Stack

### **Frontend**
- **React.js** - Modern component-based UI framework
- **CSS3** - Responsive design with healthcare-themed styling
- **JavaScript ES6+** - Modern JavaScript features and async operations

### **Backend**
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for healthcare data
- **Mongoose** - Object modeling for MongoDB

### **Security & Authentication**
- **bcrypt** - Password hashing and encryption
- **JWT** - JSON Web Tokens for session management
- **CORS** - Cross-origin resource sharing configuration

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📋 Database Schema

### **Collections**
- **doctors** - Healthcare provider profiles and availability
- **patients** - Patient information and medical records
- **appointments** - Appointment scheduling and management
- **prescriptions** - Digital prescription records
- **reviews** - Patient reviews and ratings

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthcare-appointment-system
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   ```bash
   # Create .env file in server directory
   MONGO_URI=mongodb://localhost:27017/healthcare_db
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Start the application**
   ```bash
   # Terminal 1 - Start backend server
   cd server
   npm start

   # Terminal 2 - Start frontend client
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:5000

---

## 📊 Sample Data

Use the provided seed script to populate your database with sample healthcare data:

```bash
cd server
node seedData.js
```

**Sample Login Credentials:**

**Doctors:**
- Dr. Sarah Johnson (Cardiology): `dr_sarah` / `password123`
- Dr. Michael Chen (Dermatology): `dr_michael` / `password123`
- Dr. Emily Rodriguez (Pediatrics): `dr_emily` / `password123`

**Patients:**
- John Smith: `john_smith` / `password123`
- Maria Garcia: `maria_garcia` / `password123`
- David Wilson: `david_wilson` / `password123`

---

## 🔧 API Endpoints

### **Authentication**
- `POST /api/doctors/register` - Doctor registration
- `POST /api/doctors/login` - Doctor login
- `POST /api/patients/register` - Patient registration
- `POST /api/patients/login` - Patient login

### **Appointments**
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### **Doctors**
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor profile
- `PUT /api/doctors/:id` - Update doctor profile

### **Patients**
- `GET /api/patients/:id` - Get patient profile
- `PUT /api/patients/:id` - Update patient profile

---

## 🧪 Testing

Comprehensive testing scenarios are available in `TESTING_SCENARIO.md`. The testing guide includes:

- User authentication flows
- Appointment booking scenarios
- Doctor dashboard operations
- Patient management workflows
- Payment processing tests

---

## 🔒 Security Features

- **Password Encryption**: bcrypt hashing for all user passwords
- **Session Management**: Secure session handling with JWT tokens
- **Data Validation**: Input sanitization and validation
- **CORS Protection**: Configured cross-origin resource sharing
- **HIPAA Compliance**: Healthcare data privacy and security standards

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: krishnamadhav323@gmail.com

---

## 🏆 Acknowledgments

- Healthcare professionals who provided domain expertise
- Open source community for excellent libraries and tools
- Beta testers who helped improve the user experience

---

**Built with ❤️ for better healthcare management**
