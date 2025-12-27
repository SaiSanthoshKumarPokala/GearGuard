import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getRequests, updateRequest } from '../../services/api';
import RequestCard from './RequestCard';
import { toast } from 'react-toastify';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [requests, setRequests] = useState({
    New: [],
    'In Progress': [],
    Repaired: [],
    Scrap: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data } = await getRequests();
      
      const grouped = {
        New: data.filter(r => r.stage === 'New'),
        'In Progress': data.filter(r => r.stage === 'In Progress'),
        Repaired: data.filter(r => r.stage === 'Repaired'),
        Scrap: data.filter(r => r.stage === 'Scrap'),
      };
      
      setRequests(grouped);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch requests', error);
      toast.error('Failed to load requests');
      setLoading(false);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    
    if (source.droppableId === destination.droppableId) return;

    try {
      await updateRequest(draggableId, { stage: destination.droppableId });
      
      const newRequests = { ...requests };
      const [movedRequest] = newRequests[source.droppableId].splice(source.index, 1);
      movedRequest.stage = destination.droppableId;
      newRequests[destination.droppableId].splice(destination.index, 0, movedRequest);
      
      setRequests(newRequests);
      toast.success('Request updated successfully');
    } catch (error) {
      console.error('Failed to update request', error);
      toast.error('Failed to update request');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {Object.keys(requests).map((stage) => (
          <div key={stage} className="kanban-column">
            <div className="column-header">
              <h3>{stage}</h3>
              <span className="count-badge">{requests[stage].length}</span>
            </div>
            <Droppable droppableId={stage}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`column-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                >
                  {requests[stage].map((request, index) => (
                    <Draggable
                      key={request._id}
                      draggableId={request._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={snapshot.isDragging ? 'dragging' : ''}
                        >
                          <RequestCard request={request} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
