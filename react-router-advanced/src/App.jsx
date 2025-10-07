import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Post from './pages/Post';

function ProtectedRoute({ children, isAuth }) {
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [isAuth, setIsAuth] = useState(false); // simple auth flag

  return (
    <div style={{ padding: 20 }}>
      <nav>
        <Link to="/">Home</Link> | <Link to="/profile">Profile</Link> | <Link to="/posts/1">Post 1</Link>
        <button onClick={() => setIsAuth(a => !a)} style={{ marginLeft: 10 }}>
          {isAuth ? 'Logout' : 'Login'}
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={() => setIsAuth(true)} />} />

        <Route path="/profile/*" element={
          <ProtectedRoute isAuth={isAuth}>
            <Profile />
          </ProtectedRoute>
        } />

        {/* dynamic routing */}
        <Route path="/posts/:postId" element={<Post />} />
      </Routes>
    </div>
  );
}
