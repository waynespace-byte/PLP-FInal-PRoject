import React, { useState } from 'react';
import api from '../services/api';

const SACCO = () => {
  const [form, setForm] = useState({ amount: '', purpose: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/loans/apply/', form);
      alert('Loan applied');
    } catch (error) {
      alert('Error applying');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
        <textarea placeholder="Purpose" value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} required />
        <button type="submit" className="bg-indigo-500 text-white p-2">Apply</button>
      </form>
    </div>
  );
};

export default SACCO;