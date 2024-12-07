import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const Login = ({ setCurrentView }: { setCurrentView: React.Dispatch<React.SetStateAction<string>> }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/login', { userId, password, otp });
      alert(response.data.message);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
      <button onClick={() => setCurrentView('register')}>Go to Register</button>
    </div>
  );
};

export default Login;
