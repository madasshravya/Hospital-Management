import { useEffect, useState } from 'react';

function DoctorHospitalAssociation() {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedHospitalId, setSelectedHospitalId] = useState('');
  const [availableDepts, setAvailableDepts] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [consultationFee, setConsultationFee] = useState('');

  useEffect(() => {
    setDoctors(JSON.parse(localStorage.getItem('doctors')) || []);
    setHospitals(JSON.parse(localStorage.getItem('hospitals')) || []);
  }, []);

  useEffect(() => {
    if (selectedDoctorId && selectedHospitalId) {
      const doctor = doctors.find(d => d.id === Number(selectedDoctorId));
      const hospital = hospitals.find(h => h.id === Number(selectedHospitalId));

      if (doctor && hospital) {
        const matching = hospital.departments.filter(dep =>
          doctor.specializations.includes(dep)
        );
        setAvailableDepts(matching);
      }
    } else {
      setAvailableDepts([]);
    }
  }, [selectedDoctorId, selectedHospitalId]);

  const handleSubmit = () => {
    if (!selectedDoctorId || !selectedHospitalId || !selectedDept || !availableTime || !consultationFee) {
      alert('All fields are required.');
      return;
    }

    const associations = JSON.parse(localStorage.getItem('associations')) || [];

    // ✅ Conflict Check: Same doctor, same time
    const alreadyTaken = associations.some(entry =>
      entry.doctorId === Number(selectedDoctorId) &&
      new Date(entry.availableTime).getTime() === new Date(availableTime).getTime()
    );

    if (alreadyTaken) {
      alert("This doctor already has a slot at this time.");
      return;
    }

    const newAssoc = {
      id: Date.now(),
      doctorId: Number(selectedDoctorId),
      hospitalId: Number(selectedHospitalId),
      department: selectedDept,
      availableTime,
      consultationFee: Number(consultationFee)
    };

    localStorage.setItem('associations', JSON.stringify([...associations, newAssoc]));
    alert('Slot added successfully.');

    // Reset only slot & fee (to allow next slot addition)
    setSelectedDept('');
    setAvailableTime('');
    setConsultationFee('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Associate Doctor with Hospital</h2>

      <label>Select Doctor:</label><br />
      <select value={selectedDoctorId} onChange={e => setSelectedDoctorId(e.target.value)}>
        <option value="">-- Select Doctor --</option>
        {doctors.map(doc => (
          <option key={doc.id} value={doc.id}>
            {doc.name} ({doc.specializations.join(', ')})
          </option>
        ))}
      </select><br /><br />

      <label>Select Hospital:</label><br />
      <select value={selectedHospitalId} onChange={e => setSelectedHospitalId(e.target.value)}>
        <option value="">-- Select Hospital --</option>
        {hospitals.map(h => (
          <option key={h.id} value={h.id}>
            {h.name} ({h.location})
          </option>
        ))}
      </select><br /><br />

      {availableDepts.length > 0 && (
        <>
          <label>Matching Department:</label><br />
          <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)}>
            <option value="">-- Select Department --</option>
            {availableDepts.map(dep => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select><br /><br />
        </>
      )}

      <label>Available Time Slot:</label><br />
      <input
        type="datetime-local"
        value={availableTime}
        onChange={e => setAvailableTime(e.target.value)}
      /><br /><br />

      <label>Consultation Fee (₹):</label><br />
      <input
        type="number"
        value={consultationFee}
        onChange={e => setConsultationFee(e.target.value)}
      /><br /><br />

      <button onClick={handleSubmit}>Add Time Slot</button>
    </div>
  );
}

export default DoctorHospitalAssociation;
