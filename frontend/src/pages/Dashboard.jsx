import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const toggleComplete = async (id, completed) => {
    try {
      const res = await client.put(`/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map(t => (t._id === id ? res.data : t)));
    } catch {
      alert('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await client.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch {
      alert('Failed to delete task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <p className="text-lg text-gray-700 animate-pulse">Loading tasks...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">My Tasks</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full shadow"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-grow border-2 border-gray-300 rounded-full px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg shadow"
          >
            Add
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center text-lg mt-10">🎉 You're all caught up!</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map(task => (
              <li
                key={task._id}
                className="flex justify-between items-center bg-white border border-gray-200 shadow-sm p-4 rounded-xl hover:shadow-md transition-all duration-200"
              >
                <label className="flex items-center gap-3 text-lg">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task._id, task.completed)}
                    className="accent-blue-600 w-5 h-5"
                  />
                  <span className={task.completed ? 'line-through text-gray-400' : 'text-gray-800'}>
                    {task.title}
                  </span>
                </label>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}