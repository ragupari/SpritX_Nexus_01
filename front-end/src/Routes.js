import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AccessDenied from './pages/AccessDenied';
import { useState, useEffect } from 'react';
import {login} from './Login';

export default function AppRoutes() {
    const [loginInfo, setLoginInfo] = useState(null);

    useEffect(() => {
        async function fetchLoginInfo() {
            const info = await login();
            setLoginInfo(info);
        }
        fetchLoginInfo();
    }, []);

// Loading state
if (loginInfo === null) {
  return (
      <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
      </div>
  );
}


    // If login is unsuccessful, show the public routes
    if (loginInfo && !loginInfo.success) {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<AccessDenied />} /> {/* Catch-all route */}
                </Routes>
            </Router>
        );
    }

    // If login is successful, show protected routes
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home user={loginInfo.username} />} />
                <Route path="/home" element={<Home user={loginInfo.username} />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/access-denied" element={<AccessDenied />} />
                <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
            </Routes>
        </Router>
    );
}
