import { useState } from 'react';

function HospitalRegister() {
  const [hospital, setHospital] = useState({
    name: '',
    location: '',
    departments: [],
  });

  const [newDept, setNewDept] = useState('');

  const handleAddDepartment = () => {
    if (newDept && !hospital.departments.includes(newDept)) {
      setHospital((prev) => ({
        ...prev,
        departments: [...prev.departments, newDept],
      }));
      setNewDept('');
    }
  };

  const handleRemoveDepartment = (dept) => {
    setHospital((prev) => ({
      ...prev,
      departments: prev.departments.filter((d) => d !== dept),
    }));
  };

  const handleSubmit = () => {
    if (!hospital.name || !hospital.location || !hospital.departments.length) {
      alert('All fields are required.');
      return;
    }

    const existing = JSON.parse(localStorage.getItem('hospitals')) || [];
    const newHospital = {
      id: Date.now(),
      ...hospital,
    };

    localStorage.setItem('hospitals', JSON.stringify([...existing, newHospital]));
    alert('Hospital registered successfully!');

    setHospital({
      name: '',
      location: '',
      departments: [],
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Hospital Registration</h2>

      <input
        type="text"
        placeholder="Hospital Name"
        value={hospital.name}
        onChange={(e) => setHospital({ ...hospital, name: e.target.value })}
      /><br /><br />

      <input
        type="text"
        placeholder="Location"
        value={hospital.location}
        onChange={(e) => setHospital({ ...hospital, location: e.target.value })}
      /><br /><br />

      <input
        type="text"
        placeholder="Department"
        value={newDept}
        onChange={(e) => setNewDept(e.target.value)}
      />
      <button onClick={handleAddDepartment}>Add Department</button>

      <ul>
        {hospital.departments.map((dept) => (
          <li key={dept}>
            {dept} <button onClick={() => handleRemoveDepartment(dept)}>Remove</button>
          </li>
        ))}
      </ul>

      <button onClick={handleSubmit}>Register Hospital</button>
    </div>
  );
}

export default HospitalRegister;
