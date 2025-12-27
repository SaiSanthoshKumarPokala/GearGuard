import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeams, createEquipment, getEquipmentById, updateEquipment } from '../../services/api';
import { toast } from 'react-toastify';
import './Equipment.css';

const EquipmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    category: 'Machine',
    department: '',
    maintenanceTeam: '',
    purchaseDate: '',
    warrantyExpiry: '',
    location: '',
    description: '',
  });

  useEffect(() => {
    fetchTeams();
    if (id) {
      fetchEquipment();
    }
  }, [id]);

  const fetchTeams = async () => {
    try {
      const { data } = await getTeams();
      setTeams(data);
    } catch (error) {
      console.error('Failed to fetch teams', error);
    }
  };

  const fetchEquipment = async () => {
    try {
      const { data } = await getEquipmentById(id);
      setFormData({
        name: data.name,
        serialNumber: data.serialNumber,
        category: data.category,
        department: data.department,
        maintenanceTeam: data.maintenanceTeam?._id || '',
        purchaseDate: data.purchaseDate ? data.purchaseDate.split('T')[0] : '',
        warrantyExpiry: data.warrantyExpiry ? data.warrantyExpiry.split('T')[0] : '',
        location: data.location,
        description: data.description || '',
      });
    } catch (error) {
      console.error('Failed to fetch equipment', error);
      toast.error('Failed to load equipment');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (id) {
        await updateEquipment(id, formData);
        toast.success('Equipment updated successfully!');
      } else {
        await createEquipment(formData);
        toast.success('Equipment created successfully!');
      }
      navigate('/equipment');
    } catch (error) {
      console.error('Failed to save equipment', error);
      toast.error('Failed to save equipment');
    }
  };

  return (
    <div className="equipment-form-container">
      <div className="form-header">
        <h2>{id ? 'Edit Equipment' : 'Add New Equipment'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="equipment-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Equipment Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., CNC Machine #1"
              />
            </div>

            <div className="form-group">
              <label>Serial Number *</label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                required
                placeholder="e.g., SN-12345"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="Machine">Machine</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Computer">Computer</option>
                <option value="Tool">Tool</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                placeholder="e.g., Production, IT"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., Building A, Floor 2"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Maintenance Details</h3>
          
          <div className="form-group">
            <label>Maintenance Team *</label>
            <select
              name="maintenanceTeam"
              value={formData.maintenanceTeam}
              onChange={handleChange}
              required
            >
              <option value="">Select Team</option>
              {teams.map(team => (
                <option key={team._id} value={team._id}>
                  {team.name} ({team.specialization})
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Purchase Date</label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Warranty Expiry</label>
              <input
                type="date"
                name="warrantyExpiry"
                value={formData.warrantyExpiry}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Information</h3>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Additional details about the equipment..."
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/equipment')}
            className="btn-cancel"
          >
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            {id ? 'Update Equipment' : 'Create Equipment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EquipmentForm;
