import { useEffect, useState } from 'react';

function AdminDashboard() {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [associations, setAssociations] = useState([]);

  useEffect(() => {
    setHospitals(JSON.parse(localStorage.getItem('hospitals')) || []);
    setDoctors(JSON.parse(localStorage.getItem('doctors')) || []);
    setAppointments(JSON.parse(localStorage.getItem('appointments')) || []);
    setAssociations(JSON.parse(localStorage.getItem('associations')) || []);
  }, []);

  const hospital = hospitals[0]; // Assuming 1 hospital for now
  const hospitalDoctors = associations.filter(a => a.hospitalId === hospital?.id);
  const hospitalAppointments = appointments.filter(app => app.hospitalId === hospital?.id);

  const totalRevenue = hospitalAppointments.reduce((sum, a) => sum + a.fee, 0);
  const doctorEarningsMap = {};
  const deptEarningsMap = {};

  hospitalAppointments.forEach(app => {
    const assoc = associations.find(a => a.id === app.associationId);
    if (!assoc) return;

    // Doctor Earnings
    if (!doctorEarningsMap[assoc.doctorId]) doctorEarningsMap[assoc.doctorId] = 0;
    doctorEarningsMap[assoc.doctorId] += app.fee * 0.6; // 60% to doctor

    // Department Earnings
    if (!deptEarningsMap[assoc.department]) deptEarningsMap[assoc.department] = 0;
    deptEarningsMap[assoc.department] += app.fee * 0.4; // 40% to hospital
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2>🏥 Admin Dashboard - {hospital?.name}</h2>

      <h3>📋 Total Doctors: {hospitalDoctors.length}</h3>
      <ul>
        {hospitalDoctors.map(a => {
          const doc = doctors.find(d => d.id === a.doctorId);
          return <li key={a.id}>{doc?.name} - {a.department}</li>;
        })}
      </ul>

      <h3>📆 Total Consultations: {hospitalAppointments.length}</h3>

      <h3>💰 Total Revenue: ₹{totalRevenue}</h3>

      <h3>👨‍⚕️ Revenue by Doctor:</h3>
      <ul>
        {Object.entries(doctorEarningsMap).map(([docId, earning]) => {
          const doc = doctors.find(d => d.id === Number(docId));
          return (
            <li key={docId}>{doc?.name}: ₹{earning.toFixed(2)}</li>
          );
        })}
      </ul>

      <h3>🏥 Revenue by Department:</h3>
      <ul>
        {Object.entries(deptEarningsMap).map(([dept, revenue]) => (
          <li key={dept}>{dept}: ₹{revenue.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
