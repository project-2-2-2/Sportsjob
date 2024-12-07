import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const Register = ({ setCurrentView }: { setCurrentView: React.Dispatch<React.SetStateAction<string>> }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axiosInstance.post('/register', { userId, password, phoneNumber });
      alert(response.data.message);
      setCurrentView('login');
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      {error && <p>{error}</p>}
      <button onClick={() => setCurrentView('login')}>Go to Login</button>
    </div>
  );
};

export default Register;
