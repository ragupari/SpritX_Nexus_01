import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '../components/Alert';
import '../components/signin.css';
import data from '../data.json';

const path = data.backend;

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [passwordRequirements, setPasswordRequirements] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
  });

  useEffect(() => {
    if (username.length > 0 && username.length < 8) {
      setUsernameAvailable(false); // Not enough characters
    } else if (username.length >= 8) {
      const checkUsernameAvailability = async () => {
        try {
          const response = await axios.get(`${path}/signup/check-username`, { params: { username } });
          setUsernameAvailable(response.data.available);
        } catch (error) {
          setUsernameAvailable(null);
        }
      };

      // Delay to avoid rapid calls
      const delayDebounceFn = setTimeout(() => {
        checkUsernameAvailability();
      }, 500);

      return () => clearTimeout(delayDebounceFn); // Cleanup
    } else {
      setUsernameAvailable(null); // Reset to null if username length is less than 8
    }
  }, [username]);

  useEffect(() => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    setPasswordRequirements({ hasUpperCase, hasLowerCase, hasSpecialChar });

    if (password.length < 8) setPasswordStrength('Weak');
    else if (hasUpperCase && hasLowerCase && hasSpecialChar) setPasswordStrength('Strong');
    else setPasswordStrength('Medium');
  }, [password]);

  useEffect(() => {
    setPasswordMatch(confirmPassword === password && confirmPassword !== '');
  }, [password, confirmPassword]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!username || !password || !confirmPassword) {
      setStatus('Please fill in all fields.');
      setSuccess(false);
      return;
    }
    if (username.length < 8) {
      setStatus('Username must be at least 8 characters long.');
      setSuccess(false);
      return;
    }
    if (password.length < 8) {  // Added password length check
      setStatus('Password must be at least 8 characters long.');
      setSuccess(false);
      return;
    }
    if (password !== confirmPassword) {
      setStatus('Passwords do not match.');
      setSuccess(false);
      return;
    }
    if (usernameAvailable === false) {
      setStatus('Username is already taken.');
      setSuccess(false);
      return;
    }
    if (passwordStrength !== 'Strong') {
      setStatus('Password must include an uppercase, a lowercase, and a special character.');
      setSuccess(false);
      return;
    }

    axios.post(`${path}/signup`, { username, password })
      .then(res => {
        setStatus(res.data.status);
        setSuccess(res.data.success);
        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          window.location.href = '/home';
        }
      })
      .catch(() => {
        setStatus('An error occurred. Please try again.');
        setSuccess(false);
      });
  }

  const isFormValid =
    username.length >= 8 &&
    password &&
    confirmPassword &&
    password === confirmPassword &&
    usernameAvailable === true &&
    passwordStrength === 'Strong' &&
    passwordMatch;

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <Alert message={status} success={success} />
        
        <div className="input-field">
          <input
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Enter your username</label>
          {username && username.length >= 8 && usernameAvailable === null ? (
            <small className="text-white">Checking...</small>
          ) : username && username.length >= 8 ? (
            usernameAvailable ? (
              <small className="text-success">Username is available</small>
            ) : (
              <small className="text-danger">Username is taken</small>
            )
          ) : username === "" ? null : (
            <small className="text-danger">Username should be 8 characters long</small>
          )}
        </div>

        <div className="input-field">
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Enter your password</label>
          {password && (
            <small className={`text-${passwordStrength === 'Strong' ? 'success' : passwordStrength === 'Medium' ? 'warning' : 'danger'}`}>
              Strength: {passwordStrength}
            </small>
          )}
        </div>

        <div className="password-requirements">
          
          <span className={passwordRequirements.hasLowerCase ? 'text-success' : 'text-danger'}>
            At least one lowercase letter
          </span>
          <br />
          <span className={passwordRequirements.hasUpperCase ? 'text-success' : 'text-danger'}>
            At least one uppercase letter
          </span>
          <br />
          <span className={passwordRequirements.hasSpecialChar ? 'text-success' : 'text-danger'}>
            At least one special character
          </span>
          <br />
          <span className={password.length >= 8 ? 'text-success' : 'text-danger'}>
    At least 8 characters long
  </span>
        </div>

        <div className="input-field">
          <input
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label>Confirm your password</label>
          {confirmPassword && (
            passwordMatch ? (
              <small className="text-success">Passwords match</small>
            ) : (
              <small className="text-danger">Passwords do not match</small>
            )
          )}
        </div>

        <button type="submit" disabled={!isFormValid}>Sign Up</button>

        <div className="register">
          <p>Already have an account? <a href="/signin">Sign In</a></p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
