import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "../routes";

import "./css/RightSlide.css";
import { LectureInfo } from "./LectureTable";
import { Button, Row, Col } from "@themesberg/react-bootstrap";

const ButtonsComponent = (props) => {
  const { classID, lectureName } = props;
  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: Routes.MidAttendenceAdmin.path,
      state: {
        classID: classID,
        lectureName: lectureName,
      },
    });
  };

  return (
    <Row>
      <Col>
        <Button variant="primary" className="w-100" onClick={handleClick}>
          중간 출석 QR 생성
        </Button>
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
    const { clickButton, classID, lectureName } = props;

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
                    <ButtonsComponent classID={classID} lectureName={lectureName}></ButtonsComponent>
                </div>
            </div>
        </div>
      </>
    );
}
