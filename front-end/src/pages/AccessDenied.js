import React from 'react';
import '../components/signin.css';

const AccessDenied = () => {
  const handleLoginAgain = () => {
    window.location.href = '/signin';
  };

  return (
    <div className="wrapper">
      <div className="access-denied-container text-white">
        <h1>Access Denied</h1>
        <p>You do not have permission to access this page.</p>
        <a className='text-white' onClick={handleLoginAgain}>Login Again</a>
      </div>
    </div>
  );
};

export default AccessDenied;
