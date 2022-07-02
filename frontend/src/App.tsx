import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/welcome';
import AboutPage from './pages/about';
import ProfilePage from './pages/profile';
import ProtectedRoute from './components/protected-route';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './components/loader';
import Footer from './components/footer';
import Dashboard from './pages/dashboard';
import ProjectPage from './pages/project';

const App = () => {

  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="app"> 
      <div className="app-content">
        <div className='main'>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/profile" element={<ProtectedRoute component={ProfilePage} />} />
            <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
            <Route path="/project/:id" element={<ProtectedRoute component={ProjectPage} />} />
          </Routes>  
        </div>
        <Footer />
      </div> 
    </div>
  );
}

export default App;
