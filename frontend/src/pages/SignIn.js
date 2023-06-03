import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect } from "react-router-dom";

import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup, Alert } from '@themesberg/react-bootstrap';

import BgImage from "../assets/img/illustrations/signin.svg";
import { Routes } from "../routes";

/**
 * The login component for logging in to the system.
 * This will use backend /login endpoint.
 * @returns A component for Login Page
 */
const LoginComponent = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginFailure, setShowLoginFailure] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [cookies, setCookie] = useCookies(['credentials']);

  // If user logged in, redirect to Dashboard.
  try {
    if (cookies.credentials.isLoggedIn === true) {
      return(<Redirect to={Routes.DashboardOverview.path} />);
    } else {
      ;
    }
  } catch (TypeError) { // Not logged in.
    ;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create JSON object with id and password
    const data = {
      id: id,
      password: password,
    };
  
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/login', data);
  
      // Handle response if needed
      console.log(response);
  
      // Handle success case
      // Assuming response status 200 is considered a successful login
      if (response.status === 200) {
        // Perform actions for successful login
        setShowLoginSuccess(true);
        setShowLoginFailure(false);

        // Store Cookie
        const credentials = {
          id: id,
          isLoggedIn: true,
        };
        setCookie('credentials', credentials, { path: '/' });
        console.log(cookies)
      } else {
        // Show alert for login failure
        setShowLoginFailure(true);
        setShowLoginSuccess(false);
      }
    } catch (error) {
      // Handle error
      console.error(error);
      // Show alert for login failure
      setShowLoginFailure(true);
    }
  };

  return (
    <main className="d-flex align-items-center min-vh-100">
      <section className="w-100">
        <Container>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">출튀 방지 시스템 로그인</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="text" className="mb-4">
                    <Form.Label>교번</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faIdBadge} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="text"
                        placeholder="32190984"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>비밀번호</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    로그인
                  </Button>
                  {showLoginFailure && (
                    <Alert variant="danger" className="mt-3">
                      로그인 정보가 일치하지 않습니다.
                    </Alert>
                  )}
                  {showLoginSuccess && (
                    <>
                    <Alert variant="success" className="mt-3">
                      로그인에 성공했습니다.
                    </Alert>
                      <Redirect to={Routes.DashboardOverview.path} />
                    </>
                  )}
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default LoginComponent;
