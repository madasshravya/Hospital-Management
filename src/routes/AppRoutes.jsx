import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import DoctorRegister from '../pages/Doctor/DoctorRegister';
import PatientRegister from '../pages/Patient/PatientRegister';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import HospitalRegister from '../pages/Admin/HospitalRegister';
import DoctorHospitalAssociation from '../pages/Doctor/DoctorHospitalAssociation';
import DoctorDashboard from '../pages/Doctor/DoctorDashboard';
import PatientHistory from '../pages/Patient/PatientHistory';
import AppointmentBooking from '../pages/Patient/AppointmentBooking';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register/doctor" element={<DoctorRegister />} />
      <Route path="/register/patient" element={<PatientRegister />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/register/hospital" element={<HospitalRegister />} />
      <Route path="/doctor/associate" element={<DoctorHospitalAssociation />} />
      <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
      <Route path="/history/patient" element={<PatientHistory />} />
      <Route path="/book" element={<AppointmentBooking />} />
    </Routes>
  );
}

export default AppRoutes;
