import React, { useState } from 'react';
import api from '../services/api';

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '', phone: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login/' : '/auth/register/';
      const response = await api.post(endpoint, form);
      if (isLogin) {
        localStorage.setItem('token', response.data.access);
      }
      setIsOpen(false);
    } catch (error) {
      alert('Error: ' + error.response.data.detail);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="fixed top-4 right-4 bg-blue-500 text-white p-2 rounded">
        {isLogin ? 'Login' : 'Signup'}
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded">
            <input type="text" placeholder="Username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} required />
            <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required />
            {!isLogin && <input type="text" placeholder="Phone" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} required />}
            <button type="submit" className="bg-green-500 text-white p-2 mt-2">{isLogin ? 'Login' : 'Register'}</button>
            <button onClick={() => setIsLogin(!isLogin)} className="ml-2">Switch to {isLogin ? 'Signup' : 'Login'}</button>
          </form>
        </div>
      )}
    </>
  );
};

export default AuthModal;