
import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup } from '@themesberg/react-bootstrap';

import Profile3 from "../assets/img/team/profile-picture-3.jpg";


export default () => {
  const [cookies, removeCookie] = useCookies(['credentials']);
  const [professorName, setProfessorName] = useState('');

  console.log(cookies)

  useEffect(() => {
    // Fetch professor information using axios using JSON formatting.
    const fetchProfessorInfo = async () => {
      try {
        console.log("sending: " + cookies.credentials.id)
        const response = await axios.get('http://172.25.244.37:5001/professor_info', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            id: cookies.credentials.id,
          }),
        });
        
        const professorInfo = response.data;  // Access the JSON response
        setProfessorName(professorInfo.name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfessorInfo();
  }, []);
  
  // For handling signout.
  const handleSignout = () => {
    console.log("HANDLE SIGNOUT")
    // Remove the cookie
    removeCookie('credentials');
    // Refresh the page
    window.location.href = "/login";
  };

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
          </div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image src={Profile3} className="user-avatar md-avatar rounded-circle" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">{professorName}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold" onClick={handleSignout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Signout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};