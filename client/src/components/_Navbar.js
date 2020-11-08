import React from 'react';
import {Navbar, Nav, NavDropdown, Button, Form, FormControl} from 'react-bootstrap';
import Buscar from './Buscar';

function _Navbar(){
    return (
        <div className='NavBar'>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src=''
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          PCForge
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#link">Cat1</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Buscar" className="mr-sm-2" />
            <Button variant="outline-success">Buscar</Button>
          </Form>
        </Navbar.Collapse>
        </Navbar>
      </div>
    );
}

export default _Navbar;