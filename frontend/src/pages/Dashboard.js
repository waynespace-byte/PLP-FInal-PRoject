import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1>Farmer Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/advisor" className="bg-green-500 text-white p-4 rounded">AI Advisor</Link>
        <Link to="/diagnosis" className="bg-yellow-500 text-white p-4 rounded">Disease Diagnosis</Link>
        <Link to="/marketplace" className="bg-blue-500 text-white p-4 rounded">Marketplace</Link>
        <Link to="/equipment" className="bg-purple-500 text-white p-4 rounded">Equipment</Link>
        <Link to="/learning" className="bg-red-500 text-white p-4 rounded">Learning Hub</Link>
        <Link to="/sacco" className="bg-indigo-500 text-white p-4 rounded">SACCO Loans</Link>
      </div>
    </div>
  );
};

export default Dashboard;