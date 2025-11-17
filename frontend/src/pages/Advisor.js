import React, { useState } from 'react';
import api from '../services/api';

const Advisor = () => {
  const [form, setForm] = useState({ soil_ph: '', size_ha: '' });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/ai/advisor/recommend/', form);
      setResult(res.data);
    } catch (error) {
      alert('Error fetching recommendations');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Soil pH" value={form.soil_ph} onChange={(e) => setForm({ ...form, soil_ph: e.target.value })} required />
        <input type="number" placeholder="Farm Size (ha)" value={form.size_ha} onChange={(e) => setForm({ ...form, size_ha: e.target.value })} required />
        <button type="submit" className="bg-green-500 text-white p-2">Get Recommendations</button>
      </form>
      {result && <div>{JSON.stringify(result)}</div>}
    </div>
  );
};

export default Advisor;