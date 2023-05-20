import React, { useState, useEffect } from "react";

import './css/RightSlide.css'; // import the styles.css file
import { LectureInfo } from './LectureTable'; // import the styles.css file
import { Button, Row, Col } from '@themesberg/react-bootstrap';

const ButtonsComponent = () => {
    return (
      <Row>
        <Col>
          <Button variant="primary" className="w-100">중간 출석 QR 생성</Button>
        </Col>
        <Col>
          <Button variant="success" className="w-100">중간 출석 시작</Button>
        </Col>
        <Col>
          <Button variant="danger" className="w-100">중간 출석 마감</Button>
        </Col>
      </Row>
    );
  };

/**
 * A function that generates a white rounded page sliding out from the right side.
 * @param {*}} props The props to use as argument.
 * @returns A button that opens the right slide page when clicked.
 */
export const RightSlidePage = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { clickButton, content, classID, lectureName } = props;

    const openSpace = () => setIsOpen(true);
    const closeSpace = () => setIsOpen(false);
  
    useEffect(() => {
      const handleEsc = (event) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };
  
      window.addEventListener('keydown', handleEsc);
  
      return () => {
        window.removeEventListener('keydown', handleEsc);
      };
    }, []);
  
    return (
      <>
        <button className="open-button" onClick={openSpace}>
          {clickButton}
        </button>
        <div className={`overlay${isOpen ? ' open' : ''}`}></div>
        <div className={`space${isOpen ? ' open' : ''}`}>
          <button className="close-button" onClick={closeSpace}>
            X
          </button>
            <div>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '24px' }}>{lectureName}</h1>
                    <br></br>
                    <LectureInfo classID={classID} />
                    <br></br>
                    <ButtonsComponent></ButtonsComponent>
                </div>
            </div>
        </div>
      </>
    );
}
