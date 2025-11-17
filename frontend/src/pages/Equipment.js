import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Equipment = () => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    api.get('/marketplace/equipment/').then((res) => setEquipment(res.data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      {equipment.map((e) => (
        <div key={e.id} className="bg-white p-4 rounded shadow">
          <h2>{e.type}</h2>
          <p>Rate: {e.hourly_rate}</p>
        </div>
      ))}
    </div>
  );
};

export default Equipment;