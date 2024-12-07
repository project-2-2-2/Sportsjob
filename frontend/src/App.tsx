import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [currentView, setCurrentView] = useState('login');

  return (
    <div>
      {currentView === 'login' ? (
        <Login setCurrentView={setCurrentView} />
      ) : (
        <Register setCurrentView={setCurrentView} />
      )}
    </div>
  );
};

export default App;
