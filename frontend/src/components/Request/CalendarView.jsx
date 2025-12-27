import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { getRequests } from '../../services/api';
import { format } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';

const CalendarView = () => {
  const [requests, setRequests] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    fetchPreventiveRequests();
  }, []);

  const fetchPreventiveRequests = async () => {
    try {
      const { data } = await getRequests({ type: 'Preventive' });
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch requests', error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    const filtered = requests.filter(r => {
      if (!r.scheduledDate) return false;
      const scheduleDate = format(new Date(r.scheduledDate), 'yyyy-MM-dd');
      return scheduleDate === dateStr;
    });
    
    setFilteredRequests(filtered);
  };

  const tileContent = ({ date }) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const count = requests.filter(r => {
      if (!r.scheduledDate) return false;
      return format(new Date(r.scheduledDate), 'yyyy-MM-dd') === dateStr;
    }).length;

    return count > 0 ? <div className="date-badge">{count}</div> : null;
  };

  return (
    <div className="calendar-view">
      <div className="calendar-section">
        <h2>Preventive Maintenance Schedule</h2>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
        />
      </div>

      <div className="requests-section">
        <h3>Requests for {format(selectedDate, 'MMMM dd, yyyy')}</h3>
        {filteredRequests.length === 0 ? (
          <p className="no-requests">No maintenance scheduled for this date</p>
        ) : (
          <div className="request-list">
            {filteredRequests.map(request => (
              <div key={request._id} className="request-item">
                <h4>{request.subject}</h4>
                <p><strong>Equipment:</strong> {request.equipment?.name}</p>
                <p><strong>Team:</strong> {request.team?.name}</p>
                {request.assignedTo && (
                  <p><strong>Technician:</strong> {request.assignedTo.name}</p>
                )}
                <span className={`stage-badge ${request.stage.toLowerCase().replace(' ', '-')}`}>
                  {request.stage}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
