import React from "react";
import { Col, Row } from '@themesberg/react-bootstrap';

import { CheckLogin } from "./HomePage";
import { QRGenerator } from "../components/QRGenerator"

export default (props) => {
  const { classID, courseName } = props;
  return (
    <>
      <CheckLogin></CheckLogin>
      <Row className="align-items-center">
          <Col>
            <h5>중간 출석 - {courseName}</h5>
            <QRGenerator classID={classID}></QRGenerator>
          </Col>
        </Row>
    </>
  );
};
