import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/users`);
      setUsers(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users. Backend might be offline.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/users`, newUser);
      setUsers([...users, response.data.data]);
      setNewUser({ name: '', email: '' });
      alert('User created successfully!');
    } catch (err) {
      alert('Failed to create user');
      console.error('Error creating user:', err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Full Stack Application</h1>
        <p>React Frontend + Node.js Backend</p>
      </header>

      <main className="App-main">
        <section className="users-section">
          <h2>Users List</h2>
          
          {loading && <p className="loading">Loading users...</p>}
          {error && <p className="error">{error}</p>}
          
          {!loading && !error && (
            <div className="users-grid">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <span className="user-id">ID: {user.id}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="add-user-section">
          <h2>Add New User</h2>
          <form onSubmit={handleSubmit} className="user-form">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
            <button type="submit">Add User</button>
          </form>
        </section>
      </main>

      <footer className="App-footer">
        <p>Built with ❤️ using Azure DevOps Pipeline</p>
      </footer>
    </div>
  );
}

export default App;