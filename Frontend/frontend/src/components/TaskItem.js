import React from 'react';

function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className={`task-item priority-${task.priority} ${task.status === 'completed' ? 'completed-task' : ''}`}>
      <div className="task-info">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <div className="task-meta">
          <span className={`badge status-${task.status}`}>{task.status}</span>
          <span className={`badge priority-badge-${task.priority}`}>{task.priority}</span>
        </div>
      </div>
      <div className="task-actions">
        <button className="btn-edit" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn-delete" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;