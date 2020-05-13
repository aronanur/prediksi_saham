import React from 'react';
import { navbarMenu } from '../../menu/index';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShowChartRounded, FunctionsRounded } from '@material-ui/icons';

export default function MenuBar(){
  const generateMenu = () => {
    return(
      <>
        { navbarMenu.map((menu, i) => {
          return(
            <div key={i}>
              { navbarType(menu) }
            </div>
          )
        }) }
      </>
    );
  }

  const navbarType = (menu) => {
    if(menu.type === 'link'){
      return(
        <Nav.Link as={Link} to={menu.path} className="nav-listitem">
          { menuText(menu.icon, menu.label) }
        </Nav.Link>
      )
    }else{
      return(
        <NavDropdown title={menuText(menu.icon, menu.label)}>
          { generateNavItem(menu.options) }
        </NavDropdown>
      )
    }
  }

  const generateNavItem = (options) => {
    return(
      <>
        { options.map((option, i) => {
          return(
              <NavDropdown.Item as={Link} to={option.path} key={i}>{ menuText(option.icon, option.label) }</NavDropdown.Item>
          )
        }) }
      </>
    )
  }

  const menuText = (icon, label) => {
    switch (icon) {
      case 'stock':
        return (
          <>
            <ShowChartRounded className="navbar-icon" /> { label }
          </>
        )
      case 'function':
        return (
          <>
            <FunctionsRounded className="navbar-icon" /> { label }
          </>
        );

      default:
        break;
    }
  }

  return(
    <>
      { generateMenu() }
    </>
  );
}