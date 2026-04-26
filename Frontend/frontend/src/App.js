import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const API = process.env.REACT_APP_API || 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleCreate = async (data) => {
    await axios.post(API, data);
    fetchTasks();
  };

  const handleUpdate = async (id, data) => {
    await axios.put(`${API}/${id}`, data);
    setEditingTask(null);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  const filteredTasks = tasks
    .filter(t => filterStatus === 'all' || t.status === filterStatus)
    .filter(t => filterPriority === 'all' || t.priority === filterPriority);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;

  return (
    <div className="app">
      <div className="app-header">
        <h1>Task Tracker</h1>
        <p>Stay organised. Ship faster.</p>
        <div className="header-stats">
          <div className="stat">
            <div className="stat-number">{totalTasks}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat">
            <div className="stat-number">{inProgressTasks}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat">
            <div className="stat-number">{completedTasks}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
      </div>

      <TaskForm
        onSubmit={editingTask
          ? (data) => handleUpdate(editingTask._id, data)
          : handleCreate}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      <div className="filters-bar">
        <span className="filter-label">Filter</span>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <span className="task-count">{filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}</span>
      </div>

      <TaskList
        tasks={filteredTasks}
        onEdit={setEditingTask}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;