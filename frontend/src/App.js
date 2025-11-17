import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Advisor from './pages/Advisor';
import Diagnosis from './pages/Diagnosis';
import Marketplace from './pages/Marketplace';
import Equipment from './pages/Equipment';
import Learning from './pages/Learning';
import SACCO from './pages/SACCO';
import Profile from './pages/Profile';
import AuthModal from './components/AuthModal';

function App() {
  return (
    <div className="App">
      <AuthModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/advisor" element={<Advisor />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/sacco" element={<SACCO />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;