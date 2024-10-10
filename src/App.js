import React, { useState } from 'react';
import './App.css';
import Login from './components/login';
import Message from './components/message';

function App() {
  const [message, setMessage] = useState('');

  return (
    <div className='app-container'>
      <Message message={message} />
      <Login setMessage={setMessage} />      
    </div>
  );
}

export default App;
