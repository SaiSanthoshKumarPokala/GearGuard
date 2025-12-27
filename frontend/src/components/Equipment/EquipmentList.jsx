import React, { useState, useEffect } from 'react';
import { getEquipment, deleteEquipment, getEquipmentRequests } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Equipment.css';

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchEquipment();
  }, [filters]);

  const fetchEquipment = async () => {
    try {
      const { data } = await getEquipment(filters);
      setEquipment(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch equipment', error);
      toast.error('Failed to load equipment');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      try {
        await deleteEquipment(id);
        toast.success('Equipment deleted successfully');
        fetchEquipment();
      } catch (error) {
        console.error('Failed to delete equipment', error);
        toast.error('Failed to delete equipment');
      }
    }
  };

  const viewRequests = async (id) => {
    try {
      const { data } = await getEquipmentRequests(id);
      navigate(`/equipment/${id}/requests`, { state: { requests: data.requests, openCount: data.openCount } });
    } catch (error) {
      console.error('Failed to fetch requests', error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="equipment-list">
      <div className="list-header">
        <h2>Equipment Management</h2>
        <button onClick={() => navigate('/equipment/new')} className="btn-primary">
          + Add Equipment
        </button>
      </div>

      <div className="filters">
        <select onChange={(e) => setFilters({ ...filters, category: e.target.value })} defaultValue="">
          <option value="">All Categories</option>
          <option value="Machine">Machine</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Computer">Computer</option>
          <option value="Tool">Tool</option>
          <option value="Other">Other</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, status: e.target.value })} defaultValue="">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="under_maintenance">Under Maintenance</option>
          <option value="scrapped">Scrapped</option>
        </select>
      </div>

      <div className="equipment-grid">
        {equipment.map((item) => (
          <div key={item._id} className="equipment-card">
            <div className="card-header">
              <h3>{item.name}</h3>
              <span className={`status-badge ${item.status}`}>{item.status}</span>
            </div>

            <div className="card-body">
              <p><strong>Serial:</strong> {item.serialNumber}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Department:</strong> {item.department}</p>
              <p><strong>Location:</strong> {item.location}</p>
              {item.maintenanceTeam && (
                <p><strong>Team:</strong> {item.maintenanceTeam.name}</p>
              )}
            </div>

            <div className="card-actions">
              <button
                onClick={() => viewRequests(item._id)}
                className="btn-smart"
              >
                📋 Maintenance
              </button>
              <button
                onClick={() => navigate(`/equipment/${item._id}`)}
                className="btn-edit"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentList;
