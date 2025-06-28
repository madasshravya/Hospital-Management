import { useEffect, useState } from 'react';

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [associations, setAssociations] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [doctorId, setDoctorId] = useState(''); // Simulated login

  useEffect(() => {
    setAppointments(JSON.parse(localStorage.getItem('appointments')) || []);
    setAssociations(JSON.parse(localStorage.getItem('associations')) || []);
    setHospitals(JSON.parse(localStorage.getItem('hospitals')) || []);
  }, []);

  const handleLogin = () => {
    if (!doctorId) {
      alert('Enter Doctor ID to view dashboard');
      return;
    }
  };

  const filteredAppointments = appointments.filter(
    app => app.doctorId === Number(doctorId)
  );

  const totalEarnings = filteredAppointments.reduce((sum, app) => sum + app.fee * 0.6, 0);

  const earningsByHospital = {};

  filteredAppointments.forEach(app => {
    const hospId = app.hospitalId;
    if (!earningsByHospital[hospId]) earningsByHospital[hospId] = 0;
    earningsByHospital[hospId] += app.fee * 0.6;
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2>👨‍⚕️ Doctor Dashboard</h2>

      <label>Enter Your Doctor ID: </label>
      <input
        type="number"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
        onBlur={handleLogin}
      /><br /><br />

      {doctorId && (
        <>
          <p><strong>Total Consultations:</strong> {filteredAppointments.length}</p>
          <p><strong>Total Earnings:</strong> ₹{totalEarnings.toFixed(2)}</p>

          <h4>Earnings by Hospital:</h4>
          <ul>
            {Object.entries(earningsByHospital).map(([hid, amt]) => {
              const hosp = hospitals.find(h => h.id === Number(hid));
              return (
                <li key={hid}>{hosp?.name || 'Unknown'}: ₹{amt.toFixed(2)}</li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default DoctorDashboard;
