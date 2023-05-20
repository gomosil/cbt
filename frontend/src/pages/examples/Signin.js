
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup } from '@themesberg/react-bootstrap';

import BgImage from "../../assets/img/illustrations/signin.svg";


const YourComponent = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create JSON object with id and password
    const data = {
      id: id,
      password: password,
    };

    try {
      const response = await axios.post('http://172.25.244.37:5001/login', data);
      // Handle response if needed
      console.log(response);
    } catch (error) {
      // Handle error if needed
      console.error(error);
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
                  <h3 className="mb-0">Dankook University CBT Login</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="text" className="mb-4">
                    <Form.Label>Professor ID</Form.Label>
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
                      <Form.Label>Password</Form.Label>
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
                    Sign in
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default YourComponent;