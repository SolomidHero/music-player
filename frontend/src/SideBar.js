import React, { useState } from 'react';
import UserProfile from './UserProfile';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const SideBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Musli</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/SolomidHero">GitHub</NavLink>
            </NavItem>
            <NavItem className="nav-profile">
              {/* <NavLink href="/components/">Components</NavLink> */}
              <UserProfile name="U'r name" clickHandler={ () => console.log("Stop it!") } />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default SideBar;
