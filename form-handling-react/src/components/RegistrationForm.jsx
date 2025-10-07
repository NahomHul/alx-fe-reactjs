import React, { useState } from 'react';

export default function RegistrationForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      return 'All fields are required.';
    }
    // basic email check
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Enter a valid email.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    return '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError('');
    // simulate API call
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert('User registered (mock): ' + JSON.stringify(data));
      setForm({ username: '', email: '', password: '' });
    } catch (err) {
      setError('Submission failed.');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>Username</label><br />
        <input name="username" value={form.username} onChange={handleChange} />
      </div>
      <div>
        <label>Email</label><br />
        <input name="email" value={form.email} onChange={handleChange} />
      </div>
      <div>
        <label>Password</label><br />
        <input name="password" type="password" value={form.password} onChange={handleChange} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
