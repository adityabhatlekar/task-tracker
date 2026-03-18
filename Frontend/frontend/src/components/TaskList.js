import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks.length) {
    return <p className="empty">No tasks yet. Add one above!</p>;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;