import React, { useState, useEffect } from 'react';
import { getEquipment, getTeams, createRequest } from '../../services/api';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import './RequestForm.css';

Modal.setAppElement('#root');

const RequestForm = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    subject: '',
    equipment: '',
    type: 'Corrective',
    priority: 'Medium',
    scheduledDate: '',
    description: '',
  });
  const [equipment, setEquipmentList] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchEquipment();
    }
  }, [isOpen]);

  const fetchEquipment = async () => {
    try {
      const { data } = await getEquipment();
      setEquipmentList(data);
    } catch (error) {
      console.error('Failed to fetch equipment', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'equipment') {
      const selected = equipment.find(eq => eq._id === value);
      setSelectedEquipment(selected);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createRequest(formData);
      toast.success('Request created successfully!');
      onSuccess();
      onClose();
      resetForm();
    } catch (error) {
      console.error('Failed to create request', error);
      toast.error('Failed to create request');
    }
  };

  const resetForm = () => {
    setFormData({
      subject: '',
      equipment: '',
      type: 'Corrective',
      priority: 'Medium',
      scheduledDate: '',
      description: '',
    });
    setSelectedEquipment(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>Create Maintenance Request</h2>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      <form onSubmit={handleSubmit} className="request-form">
        <div className="form-group">
          <label>Subject *</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="e.g., Leaking Oil, System Error"
          />
        </div>

        <div className="form-group">
          <label>Equipment *</label>
          <select
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
            required
          >
            <option value="">Select Equipment</option>
            {equipment.map(eq => (
              <option key={eq._id} value={eq._id}>
                {eq.name} ({eq.serialNumber})
              </option>
            ))}
          </select>
          {selectedEquipment && (
            <div className="auto-fill-info">
              <p>✓ Team: {selectedEquipment.maintenanceTeam?.name}</p>
              <p>✓ Category: {selectedEquipment.category}</p>
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Corrective">Corrective (Breakdown)</option>
              <option value="Preventive">Preventive (Routine)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority *</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Scheduled Date {formData.type === 'Preventive' && '*'}</label>
          <input
            type="date"
            name="scheduledDate"
            value={formData.scheduledDate}
            onChange={handleChange}
            required={formData.type === 'Preventive'}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the issue or maintenance work..."
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Create Request
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RequestForm;
