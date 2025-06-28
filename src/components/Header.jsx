import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ background: '#0d6efd', color: '#fff', padding: '15px' }}>
      <h1>🏥 Hospital & Appointment Management System</h1>
      <nav style={{ marginTop: '10px' }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/register/doctor" style={linkStyle}>Doctor Register</Link>
        <Link to="/register/patient" style={linkStyle}>Patient Register</Link>
        <Link to="/register/hospital" style={linkStyle}>Hospital Register</Link>
        <Link to="/doctor/associate" style={linkStyle}>Doctor-Hospital</Link>
        <Link to="/dashboard/admin" style={linkStyle}>Admin Dashboard</Link>
        <Link to="/dashboard/doctor" style={linkStyle}>Doctor Dashboard</Link>
        <Link to="/history/patient" style={linkStyle}>Patient History</Link>
        <Link to="/book" style={linkStyle}>Book Appointment</Link>
      </nav>
    </header>
  );
}

const linkStyle = {
  marginRight: '15px',
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold'
};

export default Header;
