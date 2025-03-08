import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../components/Alert';
import data from '../data.json';
import '../components/signin.css';

const path = data.backend;

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!username || !password) {
        setStatus('Please fill in both fields.');
        setSuccess(false);
        return;
    }

    axios.post(`${path}/signin`, { username, password })
        .then(res => {
            setStatus(res.data.status);
            setSuccess(res.data.success);
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                setTimeout(() => {
                  window.location.href = '/home';
                }, 2000); // Redirect after 2 seconds
            }
        })
        .catch(err => {
            console.log(err);
            setStatus('An error occurred. Please try again.');
            setSuccess(false);
        });
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <Alert message={status} success={success} />

        <div className="input-field">
          <input
            type="text"
            id="username"
           
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="username">Username</label>
        </div>

        <div className="input-field">
          <input
            type="password"
            id="password"
           
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
        </div>

 
          <button type="submit">Sign In</button>
       

        <div className="register">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
