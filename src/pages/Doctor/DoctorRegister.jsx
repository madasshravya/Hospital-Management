import { useState } from 'react';

function DoctorRegister() {
  const [doctor, setDoctor] = useState({
    name: '',
    qualifications: '',
    specializations: [],
    experience: '',
  });

  const [newSpec, setNewSpec] = useState('');

  const handleAddSpecialization = () => {
    if (newSpec && !doctor.specializations.includes(newSpec)) {
      setDoctor((prev) => ({
        ...prev,
        specializations: [...prev.specializations, newSpec],
      }));
      setNewSpec('');
    }
  };

  const handleRemoveSpecialization = (spec) => {
    setDoctor((prev) => ({
      ...prev,
      specializations: prev.specializations.filter((s) => s !== spec),
    }));
  };

  const handleSubmit = () => {
    const { name, qualifications, specializations, experience } = doctor;

    if (!name || !qualifications || !specializations.length || !experience) {
      alert('All fields are required.');
      return;
    }

    const existing = JSON.parse(localStorage.getItem('doctors')) || [];

    const newDoctor = {
      id: Date.now(),
      ...doctor,
    };

    localStorage.setItem('doctors', JSON.stringify([...existing, newDoctor]));
    alert('Doctor registered successfully!');
    setDoctor({
      name: '',
      qualifications: '',
      specializations: [],
      experience: '',
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Doctor Registration</h2>

      <input
        type="text"
        placeholder="Name"
        value={doctor.name}
        onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
      /><br /><br />

      <input
        type="text"
        placeholder="Qualifications"
        value={doctor.qualifications}
        onChange={(e) => setDoctor({ ...doctor, qualifications: e.target.value })}
      /><br /><br />

      <input
        type="text"
        placeholder="Specialization"
        value={newSpec}
        onChange={(e) => setNewSpec(e.target.value)}
      />
      <button onClick={handleAddSpecialization}>Add</button>
      <ul>
        {doctor.specializations.map((spec) => (
          <li key={spec}>
            {spec}{' '}
            <button onClick={() => handleRemoveSpecialization(spec)}>Remove</button>
          </li>
        ))}
      </ul>

      <input
        type="number"
        placeholder="Years of Experience"
        value={doctor.experience}
        onChange={(e) => setDoctor({ ...doctor, experience: e.target.value })}
      /><br /><br />

      <button onClick={handleSubmit}>Register Doctor</button>
    </div>
  );
}

export default DoctorRegister;
