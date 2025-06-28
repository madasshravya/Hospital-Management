import { useState } from 'react';

function PatientHistory() {
  const [patientId, setPatientId] = useState('');
  const [appointments, setAppointments] = useState([]);

  const handleSearch = () => {
    const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const patientAppointments = allAppointments.filter(app => app.patientId === patientId);
    setAppointments(patientAppointments);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Patient History</h2>

      <input
        type="text"
        placeholder="Enter Patient Unique ID (e.g., Aadhar)"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        style={{ padding: '8px', width: '300px' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '10px', padding: '8px' }}>
        Search
      </button>

      <div style={{ marginTop: '20px' }}>
        {appointments.length === 0 ? (
          <p>No appointments found for this patient.</p>
        ) : (
          <ul>
            {appointments.map((app, index) => (
              <li key={index}>
                <strong>Date:</strong> {new Date(app.dateTime).toLocaleString()}<br />
                <strong>Doctor ID:</strong> {app.doctorId}<br />
                <strong>Hospital:</strong> {app.hospitalName}<br />
                <strong>Specialization:</strong> {app.specialization}<br />
                <strong>Fee:</strong> ₹{app.fee}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PatientHistory;
