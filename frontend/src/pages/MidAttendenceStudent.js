import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form, Alert } from "@themesberg/react-bootstrap";
import axios from "axios";

export default () => {
  const [studentName, setStudentName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [isSessionValid, setIsSessionValid] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let message = "Unknown";
    let response = undefined;
    try {
      // Create JSON object with id and password
      const data = {
        name: studentName,
        studentid: studentID,
        tmp_uuid: window.location.pathname.split("/")[2]
      };
      response = await axios.post(window.location.origin + "/api/lecture_attend", data);
      message = response.data.message;
      console.log(message);
  
      if (response.status === 200) {
        setAlertMessage("중간 출석에 성공했습니다!");
        setAlertVariant("success");
      } else {
        setAlertMessage("중간 출석에 실패했습니다: " + message);
        setAlertVariant("danger");
      }
    } catch (error) {
      console.log(error.response.data.message);
      message = error.response.data.message;
      setAlertMessage("중간 출석에 실패했습니다: " + message);
      setAlertVariant("danger");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lectureSlug = window.location.pathname.split("/")[2];
        console.log(lectureSlug)
        const data = {
          tmp_uuid: lectureSlug,
        };
        const response = await axios.post(window.location.origin + "/api/attendance_session_info", data);

        if (response.data.is_valid) {
          setIsSessionValid(true);
        } else {
          setIsSessionValid(false);
        }

        setLectureName(response.data.lecture_name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Row className="align-items-center">
        <Col>

          <h5>{lectureName} 중간 출석</h5>

          {isSessionValid ? (
            <Alert variant="success">중간 출석이 진행중입니다.</Alert>
          ) : (
            <Alert variant="danger">중간 출석이 마감되었습니다.</Alert>
          )}

          {alertMessage && (
            <Alert
              variant={alertVariant}
              onClose={() => setAlertMessage("")}
              dismissible
            >
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
                disabled={!isSessionValid}
              />
            </Form.Group>
            <Form.Group controlId="studentName">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="32000000"
                onChange={(e) => setStudentID(e.target.value)}
                disabled={!isSessionValid}
              />
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit" disabled={!isSessionValid}>
              출석
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
