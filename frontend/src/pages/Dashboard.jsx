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
    <div className="">
      <p className="">Loading tasks...</p>
    </div>
  );

  return (
    <div className="">
      <div className="">
        <div className="">
          <h1 className="">My Tasks</h1>
          <button style={{ position: 'absolute',right: '20px', top: '20px' }}
            onClick={handleLogout}
            className=""
          >
            Logout
          </button>
        </div>

        <div className="">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What needs to be done?"
            className=""
          />
          <button
            onClick={addTask}
            className=""
            /*style={{ position: 'absolute', right: '200px', top: '345px' }}*/
          >
            Add
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="">🎉 You're all caught up!</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map(task => (
              <li
                key={task._id}
                className=""
              >
                <label className="">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task._id, task.completed)}
                    className=""
                  />
                  <span className={task.completed ? 'line-through text-gray-400' : 'text-gray-800'}>
                    {task.title}
                  </span>
                </label>
                <button
                  onClick={() => deleteTask(task._id)}
                  className=""
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