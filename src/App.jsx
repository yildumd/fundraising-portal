import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;