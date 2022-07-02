import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LogoutButton from './buttons/logout-button';

const Nav = () => {

  return (
    <Menu className="nav">
        <Menu.Item as={ Link } name='dashboard' to='/dashboard'>
            Dashboard
        </Menu.Item>
        <Menu.Item as={ Link } name='profile' to='/profile'>
            Profile
        </Menu.Item>
        <Menu.Item position='right'>
            <LogoutButton /> 
        </Menu.Item>
    </Menu>
  );
};

export default Nav;