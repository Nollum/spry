import React, { useEffect } from 'react'
import '../App.css';
import { Header, Container } from 'semantic-ui-react';
import LoginButton from '../components/buttons/login-button';
import SignupButton from '../components/buttons/signup-button';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const WelcomePage = () => {

  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <Container className='welcome' textAlign='center'>
      <Header as='h1'>Welcome to <span style={{color: "#008080"}}>Spry</span></Header>
        <Header as='h3'>A minimalist project management tool</Header>
        <LoginButton /> 
        <SignupButton />
    </Container>
  );
};

export default WelcomePage;