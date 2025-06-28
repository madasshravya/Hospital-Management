import { useState } from 'react';

function PatientRegister() {
  const [patient, setPatient] = useState({
    name: '',
    gender: '',
    dob: '',
    uniqueId: '',
  });

  const handleSubmit = () => {
    const { name, gender, dob, uniqueId } = patient;

    if (!name || !gender || !dob || !uniqueId) {
      alert('All fields are required.');
      return;
    }

    const existing = JSON.parse(localStorage.getItem('patients')) || [];

    const newPatient = {
      id: Date.now(),
      ...patient,
    };

    localStorage.setItem('patients', JSON.stringify([...existing, newPatient]));
    alert('Patient registered successfully!');

    setPatient({
      name: '',
      gender: '',
      dob: '',
      uniqueId: '',
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Patient Registration</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={patient.name}
        onChange={(e) => setPatient({ ...patient, name: e.target.value })}
      /><br /><br />

      <select
        value={patient.gender}
        onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
      >
        <option value="">Select Gender</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Other">Other</option>
      </select><br /><br />

      <input
        type="date"
        value={patient.dob}
        onChange={(e) => setPatient({ ...patient, dob: e.target.value })}
      /><br /><br />

      <input
        type="text"
        placeholder="Unique ID (Aadhar / Passport)"
        value={patient.uniqueId}
        onChange={(e) => setPatient({ ...patient, uniqueId: e.target.value })}
      /><br /><br />

      <button onClick={handleSubmit}>Register Patient</button>
    </div>
  );
}

export default PatientRegister;
