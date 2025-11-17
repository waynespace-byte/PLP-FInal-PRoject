import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Home = () => {
  const [news, setNews] = useState([]);
  const [filters, setFilters] = useState({ category: '', region: '' });

  useEffect(() => {
    api.get('/news/', { params: filters }).then((res) => setNews(res.data));
  }, [filters]);

  const handleTTS = (item) => {
    api.post('/learning/tts/generate/', { text: item.body }).then((res) => {
      const audio = new Audio(res.data.audio_url);
      audio.play();
    });
  };

  return (
    <div className="container mx-auto p-4">
      <input placeholder="Category" onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="border p-2" />
      <input placeholder="Region" onChange={(e) => setFilters({ ...filters, region: e.target.value })} className="border p-2 ml-2" />
      {news.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded shadow mt-4">
          <h2>{item.title}</h2>
          <p>{item.body}</p>
          <button onClick={() => handleTTS(item)} className="bg-blue-500 text-white p-2">Listen</button>
        </div>
      ))}
    </div>
  );
};

export default Home;