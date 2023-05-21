import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Image, Button, Container } from '@themesberg/react-bootstrap';

import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import NotFoundImage from "../assets/img/illustrations/404.svg";


export default () => {
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
              <div>
                <Card.Link as={Link} to={Routes.DashboardOverview.path}>
                  <Image src={NotFoundImage} className="img-fluid w-75" />
                </Card.Link>
                <h1 className="text-primary mt-5">
                  존재하지 않거나 만료된 페이지입니다.
                </h1>
                <p className="lead my-4">
                  중간 출석 페이지의 경우 출석 시간이 만료되었습니다.
            </p>
                <Button as={Link} variant="primary" className="animate-hover" to={Routes.DashboardOverview.path}>
                  <FontAwesomeIcon icon={faChevronLeft} className="animate-left-3 me-3 ms-2" />
                  대시보드로 돌아가기
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};