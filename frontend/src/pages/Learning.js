import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Learning = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    api.get('/learning/lessons/').then((res) => setLessons(res.data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      {lessons.map((l) => (
        <div key={l.id} className="bg-white p-4 rounded shadow">
          <h2>{l.title}</h2>
          <video src={l.video_url} controls />
        </div>
      ))}
    </div>
  );
};

export default Learning;