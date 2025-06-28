import { useEffect, useState } from 'react';

function AppointmentBooking() {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [associations, setAssociations] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [fee, setFee] = useState('');
  const [patientId, setPatientId] = useState('');

  useEffect(() => {
    setHospitals(JSON.parse(localStorage.getItem('hospitals')) || []);
    setDoctors(JSON.parse(localStorage.getItem('doctors')) || []);
    setAssociations(JSON.parse(localStorage.getItem('associations')) || []);
  }, []);

  useEffect(() => {
    if (selectedHospital && specialization) {
      const matched = doctors.filter(doc =>
        doc.specializations.includes(specialization)
      );
      setFilteredDoctors(matched);
    }
  }, [selectedHospital, specialization, doctors]);

  useEffect(() => {
    if (selectedDoctor && selectedHospital) {
      const slots = associations.filter(
        a =>
          a.doctorId === Number(selectedDoctor) &&
          a.hospitalId === Number(selectedHospital)
      );
      setAvailableSlots(slots);
    }
  }, [selectedDoctor, selectedHospital, associations]);

  const handleBook = () => {
    if (!selectedHospital || !specialization || !selectedDoctor || !selectedSlot || !patientId || !fee) {
      alert('All fields are required.');
      return;
    }

    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    const newAppointment = {
      id: Date.now(),
      hospitalId: Number(selectedHospital),
      doctorId: Number(selectedDoctor),
      slot: selectedSlot,
      fee: Number(fee),
      patientId: patientId
    };

    localStorage.setItem('appointments', JSON.stringify([...appointments, newAppointment]));
    alert('Appointment booked successfully!');
    
    // Reset form
    setSelectedHospital('');
    setSpecialization('');
    setFilteredDoctors([]);
    setSelectedDoctor('');
    setAvailableSlots([]);
    setSelectedSlot('');
    setFee('');
    setPatientId('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Book Appointment</h2>

      <label>Patient Unique ID:</label><br />
      <input value={patientId} onChange={(e) => setPatientId(e.target.value)} /><br /><br />

      <label>Select Hospital:</label><br />
      <select value={selectedHospital} onChange={(e) => setSelectedHospital(e.target.value)}>
        <option value="">-- Select Hospital --</option>
        {hospitals.map(h => (
          <option key={h.id} value={h.id}>{h.name}</option>
        ))}
      </select><br /><br />

      <label>Select Specialization:</label><br />
      <input value={specialization} onChange={(e) => setSpecialization(e.target.value)} /><br /><br />

      <label>Select Doctor:</label><br />
      <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
        <option value="">-- Select Doctor --</option>
        {filteredDoctors.map(doc => (
          <option key={doc.id} value={doc.id}>{doc.name}</option>
        ))}
      </select><br /><br />

      <label>Select Available Slot:</label><br />
      <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
        <option value="">-- Select Slot --</option>
        {availableSlots.map(slot => (
          <option key={slot.id} value={slot.availableTime}>
            {new Date(slot.availableTime).toLocaleString()}
          </option>
        ))}
      </select><br /><br />

      <label>Enter Fee:</label><br />
      <input
        type="number"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
      /><br /><br />

      <button onClick={handleBook}>Book Appointment</button>
    </div>
  );
}

export default AppointmentBooking;
