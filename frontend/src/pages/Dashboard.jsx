import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch tasks on mount
  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await client.get('/tasks');
        setTasks(res.data);
      } catch (err) {
        alert('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  // Create new task
  const addTask = async () => {
    if (!newTitle.trim()) return alert('Please enter a task title');
    try {
      const res = await client.post('/tasks', { title: newTitle });
      setTasks([res.data, ...tasks]);
      setNewTitle('');
    } catch {
      alert('Failed to add task');
    }
  };

  // Toggle complete
  const toggleComplete = async (id, completed) => {
    try {
      const res = await client.put(`/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map(t => (t._id === id ? res.data : t)));
    } catch {
      alert('Failed to update task');
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await client.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch {
      alert('Failed to delete task');
    }
  };

  const handleLogout = () => {
    // Clear auth token or user data
    localStorage.removeItem('token'); // or whatever you're using
    navigate('/login');
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl mb-4">Dashboard</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task title"
          className="flex-grow border px-2 py-1"
        />
        <button onClick={addTask} className="bg-blue-600 text-white px-4 py-1 rounded">Add</button>
      </div>

      {tasks.length === 0 ? <p>No tasks found</p> : (
        <ul>
          {tasks.map(task => (
            <li key={task._id} className="flex justify-between items-center mb-2">
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task._id, task.completed)}
                />
                <span className={task.completed ? 'line-through ml-2' : 'ml-2'}>
                  {task.title}
                </span>
              </label>
              <button onClick={() => deleteTask(task._id)} className="text-red-600">Delete</button>
            </li>
          ))}
        </ul>
      )}
      <div>
      <button onClick={handleLogout}>Logout</button>
      {/* Your other content */}
    </div>
    </div>
  );
}