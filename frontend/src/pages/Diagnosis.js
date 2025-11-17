import React, { useState } from 'react';
import api from '../services/api';

const Diagnosis = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    try {
      const res = await api.post('/ai/diagnose/', formData);
      setResult(res.data);
    } catch (error) {
      alert('Error diagnosing');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit" className="bg-yellow-500 text-white p-2">Diagnose</button>
      </form>
      {result && <div>{JSON.stringify(result)}</div>}
    </div>
  );
};

export default Diagnosis;