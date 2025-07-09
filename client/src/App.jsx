import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateBugPage from './pages/CreateBugPage';
import UpdateBugPage from './pages/UpdateBug.jsx';
import './App.css';

function App() {
  // Simple auth check (token in localStorage)
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/project/:id/bug/create" element={isAuthenticated ? <CreateBugPage /> : <Navigate to="/login" />} />
        <Route path="/bug/:id/edit" element={isAuthenticated ? <UpdateBugPage /> : <Navigate to="/login" />} />
        {/* Default route: if not authenticated, go to register, else dashboard */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/register"} />} />
      </Routes>
    </Router>
  );
}

export default App;
