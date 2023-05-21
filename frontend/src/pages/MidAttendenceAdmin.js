import React from "react";
import { Col, Row } from "@themesberg/react-bootstrap";
import { useLocation } from "react-router-dom";

import { CheckLogin } from "./HomePage";
import QRGenerator from "../components/QRGenerator";

export default () => {
  const location = useLocation();
  const { classID, lectureName } = location.state || {};

  return (
    <>
      <CheckLogin></CheckLogin>
      <Row className="align-items-center">
        <Col>
          <h5>중간 출석 - {lectureName}</h5>
          <QRGenerator classID={classID} lectureName={lectureName} />
        </Col>
      </Row>
    </>
  );
};
