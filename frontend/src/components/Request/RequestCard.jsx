import React from 'react';
import { format } from 'date-fns';
import './RequestCard.css';

const RequestCard = ({ request }) => {
  const isOverdue = request.scheduledDate && 
    new Date(request.scheduledDate) < new Date() && 
    request.stage !== 'Repaired' && 
    request.stage !== 'Scrap';

  const getPriorityClass = (priority) => {
    const classes = {
      Low: 'priority-low',
      Medium: 'priority-medium',
      High: 'priority-high',
      Critical: 'priority-critical',
    };
    return classes[priority] || 'priority-medium';
  };

  return (
    <div className={`request-card ${isOverdue ? 'overdue' : ''}`}>
      {isOverdue && <div className="overdue-indicator">OVERDUE</div>}
      
      <div className="card-header">
        <h4>{request.subject}</h4>
        <span className={`priority-badge ${getPriorityClass(request.priority)}`}>
          {request.priority}
        </span>
      </div>

      <div className="card-body">
        <div className="card-info">
          <span className="label">Equipment:</span>
          <span>{request.equipment?.name}</span>
        </div>

        <div className="card-info">
          <span className="label">Type:</span>
          <span className={`type-badge ${request.type.toLowerCase()}`}>
            {request.type}
          </span>
        </div>

        {request.scheduledDate && (
          <div className="card-info">
            <span className="label">Scheduled:</span>
            <span>{format(new Date(request.scheduledDate), 'MMM dd, yyyy')}</span>
          </div>
        )}

        {request.team && (
          <div className="card-info">
            <span className="label">Team:</span>
            <span>{request.team.name}</span>
          </div>
        )}
      </div>

      <div className="card-footer">
        {request.assignedTo ? (
          <div className="technician">
            <div className="avatar">
              {request.assignedTo.name.charAt(0).toUpperCase()}
            </div>
            <span>{request.assignedTo.name}</span>
          </div>
        ) : (
          <span className="unassigned">Unassigned</span>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
