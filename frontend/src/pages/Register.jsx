import { useState } from 'react';
import client from '../api/client';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await client.post('/auth/register', form);
      alert('Registration successful! You can log in now.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div>
      <div>
        <h2>Register</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit} className="">
          Name:
          <input type="text" name="name" placeholder="Name" value={form.name}
            onChange={handleChange}
           required />
            <br />
            <br />
          Email:
          <input type="email" name="email" placeholder="Email" value={form.email}
            onChange={handleChange}
            required />
            <br />
            <br />
          Password:
          <input type="password" name="password" placeholder="Password" value={form.password}
            onChange={handleChange}
            required />
            <br />
            <br />
          <button type="submit">
            Register</button>
        </form>
        <p>
          Already registered? <a href="/login" >Login</a>
        </p>
      </div>
    </div>
  );
}