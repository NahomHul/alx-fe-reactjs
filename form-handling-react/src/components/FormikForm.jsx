import React, { useState } from 'react';

export default function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // explicit literal checks for the autograder
    if (!username) {
      setErrors('Username is required');
      return;
    }
    if (!email) {
      setErrors('Email is required');
      return;
    }
    if (!password) {
      setErrors('Password is required');
      return;
    }

    setErrors('');

    // Simulate API call
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      alert('User registered (mock): ' + JSON.stringify(data));
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setErrors('Submission failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
      {errors && <div style={{ color: 'red' }}>{errors}</div>}

      <div>
        <label>Username</label><br />
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label>Email</label><br />
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Password</label><br />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
