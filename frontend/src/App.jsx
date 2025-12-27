import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Layout/Navbar';
import Login from './pages/Login';
import Dashboard from './components/Dashboard/Dashboard';
import EquipmentList from './components/Equipment/EquipmentList';
import EquipmentForm from './components/Equipment/EquipmentForm';
import KanbanBoard from './components/Request/KanbanBoard';
import CalendarView from './components/Request/CalendarView';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="loading">Loading...</div>;
  
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

const AppContent = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <Navbar />}
      <div className={user ? 'main-content' : ''}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/equipment"
            element={
              <PrivateRoute>
                <EquipmentList />
              </PrivateRoute>
            }
          />
          <Route
            path="/equipment/new"
            element={
              <PrivateRoute>
                <EquipmentForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/equipment/:id"
            element={
              <PrivateRoute>
                <EquipmentForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <PrivateRoute>
                <KanbanBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <PrivateRoute>
                <CalendarView />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
