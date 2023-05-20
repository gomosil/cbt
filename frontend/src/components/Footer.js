
import React from "react";
import { Row, Col, Card, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBug, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default (props) => {
  const showSettings = props.showSettings;

  const toggleSettings = (toggle) => {
    props.toggleSettings(toggle);
  }

  return (
    <div>
      {showSettings ? (
        <Card className="theme-settings">
          <Card.Body className="pt-4">
            <Button className="theme-settings-close" variant="close" size="sm" aria-label="Close" onClick={() => { toggleSettings(false) }} />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <center><b><p className="m-0 mb-1 me-3 fs-7">이 웹사이트는 쿠키를 사용합니다 <span role="img" aria-label="gratitude"></span></p></b></center>
            </div>
            <p className="fs-7 text-gray-700 text-center">쿠키 사용에 동의하지 않으면 페이지를 종료해주세요</p>
          </Card.Body>
        </Card>
      ) : (
        <></>
      )}
      <footer className="footer section py-5">
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
          </Col>
          <Col xs={12} lg={6}>
            <ul className="list-inline list-group-flush list-group-borderless text-center text-xl-right mb-0">
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://github.com/gomosil/cbt/" target="_blank">
                  <FontAwesomeIcon icon={faBook}></FontAwesomeIcon> 소개
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://github.com/gomosil/cbt/" target="_blank">
                <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon> GitHub
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://github.com/gomosil/cbt/issues" target="_blank">
                <FontAwesomeIcon icon={faBug}></FontAwesomeIcon> 버그 제보
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://github.com/gomosil/cbt/discussion" target="_blank">
                <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon> 문의
                </Card.Link>
              </li>
            </ul>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
