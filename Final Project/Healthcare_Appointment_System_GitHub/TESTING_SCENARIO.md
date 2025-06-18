# 🏥 Healthcare Appointment Booking System - Testing Scenario

## 🎯 Complete Testing Guide

Your database has been populated with realistic sample data. Follow this comprehensive scenario to test all features of the system.

---

## 📋 Sample Login Credentials

### 👨‍⚕️ **DOCTORS**
| Name | Specialization | Username | Password |
|------|---------------|----------|----------|
| Dr. Sarah Johnson | Cardiology | `dr_sarah` | `password123` |
| Dr. Michael Chen | Dermatology | `dr_michael` | `password123` |
| Dr. Emily Rodriguez | Pediatrics | `dr_emily` | `password123` |

### 👤 **PATIENTS**
| Name | Username | Password | Medical History |
|------|----------|----------|-----------------|
| John Smith | `john_smith` | `password123` | Hypertension, Diabetes |
| Maria Garcia | `maria_garcia` | `password123` | Asthma |
| David Wilson | `david_wilson` | `password123` | High Cholesterol |
| Emma Thompson | `emma_thompson` | `password123` | Child (Age 9) |

---

## 🧪 **Comprehensive Testing Scenario**

### **Phase 1: Doctor Experience**

#### **Test Case 1.1: Dr. Sarah Johnson (Cardiologist)**
1. **Login to Doctor Dashboard**
   - Navigate to `http://localhost:3001`
   - Click "Doctor Login"
   - Username: `dr_sarah`
   - Password: `password123`

2. **Explore Doctor Dashboard**
   - View profile: Dr. Sarah Johnson, Cardiology specialist
   - Check experience: 15+ years, MBBS, MD Cardiology, FACC
   - Review consultation fee: $200
   - Hospital: City General Hospital, New York

3. **Check Availability Schedule**
   - **Monday**: 9:00-10:00, 10:00-11:00, 2:00-3:00 PM (2 patients per slot)
   - **Wednesday**: 9:00-10:00, 10:00-11:00 AM (2 patients per slot)
   - **Friday**: 9:00-10:00 AM, 2:00-3:00 PM (2 patients per slot)

4. **Manage Appointments**
   - View upcoming appointments
   - Check patient details and medical histories
   - Review appointment statuses and payment information

#### **Test Case 1.2: Dr. Michael Chen (Dermatologist)**
1. **Switch to Dermatologist**
   - Logout and login as `dr_michael`
   - Profile: 8 years experience, Skin Care Clinic, Los Angeles
   - Consultation fee: $150
   - Specialization: Skin disorders, cosmetic procedures

2. **Check Availability**
   - **Tuesday**: 10:00-11:00, 11:00-12:00, 3:00-4:00 PM (1 patient per slot)
   - **Thursday**: 9:00-10:00, 10:00-11:00 AM (1 patient per slot)

#### **Test Case 1.3: Dr. Emily Rodriguez (Pediatrician)**
1. **Login as Pediatrician**
   - Username: `dr_emily`
   - Password: `password123`
   - Profile: 12 years experience, Children's Medical Center, Chicago
   - Consultation fee: $180

2. **Review Pediatric Schedule**
   - **Monday**: 8:00-9:00, 9:00-10:00 AM (3 patients per slot)
   - **Wednesday**: 8:00-9:00 AM, 1:00-2:00 PM (3 patients per slot)
   - **Friday**: 8:00-9:00 AM (3 patients per slot)

---

### **Phase 2: Patient Experience**

#### **Test Case 2.1: John Smith (Cardiac Patient)**
1. **Patient Login**
   - Click "Patient Login"
   - Username: `john_smith`
   - Password: `password123`

2. **View Patient Profile**
   - Name: John Smith, Male, Born: March 15, 1985
   - Blood Group: O+
   - Allergies: Penicillin, Shellfish
   - Medical History: Hypertension, Diabetes Type 2
   - Emergency Contact: Jane Smith (Spouse)

3. **Book Cardiology Appointment**
   - Search for "Cardiology" or browse doctors
   - Select Dr. Sarah Johnson
   - Choose available time slot
   - Enter reason: "Heart checkup and blood pressure monitoring"
   - Confirm appointment booking

#### **Test Case 2.2: Maria Garcia (Asthma Patient)**
1. **Login as Maria**
   - Username: `maria_garcia`
   - Password: `password123`
   - Profile: Female, Born: July 22, 1990, Los Angeles
   - Blood Group: A+, Allergies: Latex, Medical History: Asthma

2. **Book General Consultation**
   - Browse available doctors
   - Book appointment for asthma follow-up
   - View appointment confirmation

#### **Test Case 2.3: David Wilson (High Cholesterol)**
1. **Login as David**
   - Username: `david_wilson`
   - Password: `password123`
   - Profile: Male, Born: November 8, 1978, Chicago
   - Blood Group: B+, Medical History: High Cholesterol

2. **Schedule Preventive Care**
   - Book appointment with cardiologist for cholesterol management
   - Add symptoms and concerns in appointment details

#### **Test Case 2.4: Emma Thompson (Pediatric Patient)**
1. **Login as Child Patient**
   - Username: `emma_thompson`
   - Password: `password123`
   - Profile: Female, Born: May 12, 2015 (8 years old)
   - Blood Group: AB+, Allergies: Nuts
   - Emergency Contact: Sarah Thompson (Mother)

2. **Book Pediatric Appointment**
   - Select Dr. Emily Rodriguez (Pediatrician)
   - Choose appropriate time slot
   - Enter reason: "Regular checkup and vaccination"

---

## 🔍 **Specific Features to Test**

### **Authentication System**
- [x] Doctor registration and login
- [x] Patient registration and login
- [x] Session persistence
- [x] Logout functionality

### **Doctor Features**
- [x] View upcoming appointments
- [x] Manage availability slots
- [x] Set consultation fees
- [x] View patient medical history
- [x] Add prescriptions and notes

### **Patient Features**
- [x] Search doctors by specialization
- [x] View doctor profiles and ratings
- [x] Book appointments
- [x] View appointment history
- [x] Check payment status

### **Appointment Management**
- [x] Create new appointments
- [x] View scheduled appointments
- [x] Update appointment status
- [x] Cancel appointments
- [x] Payment tracking

---

## 🎪 **Real-World Scenarios to Test**

### **Scenario A: Emergency Pediatric Visit**
Emma Thompson (child) has a fever and cough. Her mother needs to:
1. Login as `emma_thompson`
2. Find pediatrician Dr. Emily Rodriguez
3. Book earliest available slot
4. Fill symptoms: Fever, Cough
5. Complete urgent booking

### **Scenario B: Routine Cardiac Follow-up**
John Smith needs follow-up for his heart condition:
1. Login as `john_smith`
2. View previous appointment history
3. Book follow-up with Dr. Sarah Johnson
4. Check consultation fee and payment options

### **Scenario C: Dermatology Consultation**
Maria Garcia has a skin condition:
1. Login as `maria_garcia`
2. View scheduled appointment with Dr. Michael Chen
3. Add additional symptoms before appointment
4. Check payment status

---

## 🔧 **Testing Checklist**

### **Basic Functionality**
- [ ] User registration (Doctor & Patient)
- [ ] User login/logout
- [ ] Dashboard navigation
- [ ] Profile management
- [ ] Search functionality

### **Appointment System**
- [ ] Book new appointment
- [ ] View appointment details
- [ ] Cancel appointment
- [ ] Reschedule appointment
- [ ] Payment processing

### **Doctor Tools**
- [ ] Availability management
- [ ] Patient history access
- [ ] Prescription creation
- [ ] Appointment notes
- [ ] Rating and reviews

### **Patient Tools**
- [ ] Doctor search and filtering
- [ ] Medical history management
- [ ] Appointment history
- [ ] Emergency contact updates
- [ ] Review and rating system

---

## 🎉 **Expected Outcomes**

After completing this testing scenario, you should have:

1. **Verified Authentication**: All login credentials work correctly
2. **Tested Core Features**: Appointment booking, doctor search, dashboard navigation
3. **Explored User Roles**: Both doctor and patient perspectives
4. **Validated Data**: Medical records, prescriptions, and payment information
5. **Confirmed UI/UX**: Responsive design and user-friendly interface

---

## 🚀 **Next Steps**

Once testing is complete, consider:
- Adding more doctors and specializations
- Implementing email notifications
- Adding payment gateway integration
- Creating admin dashboard
- Adding appointment reminders
- Implementing telemedicine features

---

**🎯 Start your testing journey by visiting:** http://localhost:3002

**Happy Testing! 🧪✨**
