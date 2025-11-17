import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Marketplace = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/marketplace/products/').then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      {products.map((p) => (
        <div key={p.id} className="bg-white p-4 rounded shadow">
          <h2>{p.sku}</h2>
          <p>Price: {p.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Marketplace;