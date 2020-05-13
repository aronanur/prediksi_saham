import React from 'react';
import Unpak from '../../assets/logo/unpak.png';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Menu, ButtonLogout } from '../index';
import { Link } from 'react-router-dom';
import { AccountCircleRounded } from '@material-ui/icons';

export default function MenuNavbar(){
  const user = useSelector(state => state.userReducer.user);
  return(
    <Navbar 
      collapseOnSelect 
      expand="xl" 
      className="bg-main" 
      variant="dark"
      sticky="top">
      <Navbar.Brand as={Link} to="/prediksi">
        <img
          className="img-logo" 
          src={Unpak} alt="Logo Unpak" />
        <span className="navbar-text">Sistem Prediksi Saham</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Menu />
          <Dropdown style={{ textAlign: 'left' }}>
            <Dropdown.Toggle className="button-navbar" variant="dark" size="sm">
              <AccountCircleRounded/> { user.username }
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ButtonLogout />
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

};