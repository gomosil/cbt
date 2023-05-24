import React, { useState } from "react";
import { Col, Row, Button, Form, Alert } from "@themesberg/react-bootstrap";
import axios from "axios";

export default () => {
  const [studentName, setStudentName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
            // Create JSON object with id and password
      const data = {
        name: studentName,
        studentid: studentID,
      };
      const response = await axios.post("http://172.25.244.37:5001/lecture_attend", data);

      if (response.status === 200) {
        setAlertMessage("중간 출석에 성공했습니다!");
        setAlertVariant("success");
      } else {
        setAlertMessage("중간 출석에 실패했습니다. 인적사항을 확인해주세요");
        setAlertVariant("danger");
      }
    } catch (error) {
      setAlertMessage("중간 출석에 실패했습니다.");
      setAlertVariant("danger");
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h5>중간 출석</h5>
          {alertMessage && (
            <Alert variant={alertVariant} onClose={() => setAlertMessage("")} dismissible>
              {alertMessage}
            </Alert>
          )}
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="lectureSlug">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                placeholder="홍길동"
                onChange={(e) => setStudentName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="studentName">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="32000000"
                onChange={(e) => setStudentID(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit">
              출석
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
