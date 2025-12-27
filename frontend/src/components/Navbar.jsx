import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">
          <h2>⚙️ GearGuard</h2>
        </Link>
      </div>
      <div className="navbar-menu">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/equipment">Equipment</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/requests">Requests</Link>
        <Link to="/calendar">Calendar</Link>
      </div>
      <div className="navbar-user">
        <span>Welcome, {user?.name}</span>
        <span className="role-badge">{user?.role}</span>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
