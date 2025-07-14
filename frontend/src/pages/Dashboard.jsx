import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await client.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        alert("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTitle.trim()) return alert("Please enter a task title");
    try {
      if (editId) {
        const res = await client.put(`/tasks/${editId}`, { title: newTitle });
        setTasks(tasks.map((t) => (t._id === editId ? res.data : t)));
        setEditId(null);
      } else {
        const res = await client.post("/tasks", { title: newTitle });
        setTasks([res.data, ...tasks]);
      }
      setNewTitle("");
    } catch {
      alert("Failed to save task");
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await client.put(`/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch {
      alert("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await client.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch {
      alert("Failed to delete task");
    }
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setNewTitle(task.title);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  if (loading)
    return (
      <div className="spinner">
        <p>Loading tasks...</p>
      </div>
    );

  return (
    <div className="dashboard-container">
      <div>
        <div>
          <h1>My Tasks</h1>
          <button
            style={{ position: "absolute", right: "20px", top: "20px" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="filter wrapper">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="asc">Sort A-Z</option>
            <option value="desc">Sort Z-A</option>
          </select>
        </div>

        <div className="dashboard-input">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What needs to be done?"
          />
          <button onClick={addTask}>{editId ? "Update" : "Add"}</button>
        </div>

        {tasks.length === 0 ? (
          <p>🎉 You're all caught up!</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
            {filteredTasks.map((task) => (
              <li key={task._id} className="task-item">
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task._id, task.completed)}
                  />
                  <span
                    style={{
                      marginLeft: "10px",
                      textDecoration: task.completed ? "line-through" : "none",
                      color: task.completed ? "#999" : "#000",
                    }}
                  >
                    {task.title}
                    <br />
                    <small>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "#555",
                          marginTop: "5px",
                        }}
                      >
                        <p>
                          Started: {new Date(task.createdAt).toLocaleString()}
                        </p>
                        {task.completed && task.completedAt && (
                          <p>
                            Time Taken:{" "}
                            {Math.round(
                              (new Date(task.completedAt) -
                                new Date(task.createdAt)) /
                                60000
                            )}{" "}
                            mins
                          </p>
                        )}
                      </div>
                    </small>
                  </span>
                </label>
                <div>
                  <button
                    onClick={() => startEdit(task)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
