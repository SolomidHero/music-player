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
import { withRouter } from 'react-router-dom';

const SideBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand onClick={() => props.history.push("/")}>Musli</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/SolomidHero">GitHub</NavLink>
            </NavItem>
            {/* <NavLink href="/components/">Components</NavLink> */}
            <UserProfile name="Username" />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default withRouter(SideBar);
