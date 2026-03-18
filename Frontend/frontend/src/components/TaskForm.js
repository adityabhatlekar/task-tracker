import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [form, setForm] = useState({
    title: '', description: '', status: 'pending', priority: 'medium'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) setForm(editingTask);
    else setForm({ title: '', description: '', status: 'pending', priority: 'medium' });
  }, [editingTask]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    return errs;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    onSubmit(form);
    setForm({ title: '', description: '', status: 'pending', priority: 'medium' });
    setErrors({});
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <div className="form-dot"></div>
        <h2>{editingTask ? 'Edit Task' : 'New Task'}</h2>
      </div>

      <input
        name="title"
        placeholder="What needs to be done?"
        value={form.title}
        onChange={handleChange}
      />
      {errors.title && <span className="error">⚠ {errors.title}</span>}

      <textarea
        name="description"
        placeholder="Add a description..."
        value={form.description}
        onChange={handleChange}
      />

      <div className="form-row">
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pending">⏳ Pending</option>
          <option value="in-progress">🔄 In Progress</option>
          <option value="completed">✅ Completed</option>
        </select>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">🟢 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🔴 High Priority</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editingTask ? 'Update Task' : '+ Add Task'}
        </button>
        {editingTask && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;