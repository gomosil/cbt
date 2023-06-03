import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Button, Modal } from '@themesberg/react-bootstrap';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Routes } from '../routes';

/**
 * The component for Extending or stopping mid attendance.
 */
const ButtonsComponent = ({ extendTimer, stopTimer, isTimerRunning }) => {
  return (
    <Row>
      <Col>
        <Button variant="success" className="w-100" onClick={extendTimer} disabled={!isTimerRunning}>
          중간 출석 연장 +10초
        </Button>
      </Col>
      <Col>
        <Button variant="danger" className="w-100" onClick={stopTimer} disabled={!isTimerRunning}>
          중간 출석 마감
        </Button>
      </Col>
    </Row>
  );
};

/**
 * The QR generator component for mid attendance check.
 * @param {*} props The props
 * @returns QR Code generated component for mid attendance check.
 */
export const QRGenerator = (props) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [remainingTime, setRemainingTime] = useState(60); // 60 seconds = 1 minute
  const [showPopup, setShowPopup] = useState(false);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const { classID } = props;

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/qr_code', {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            id: classID
          },
          responseType: 'blob'
        });

        if (response.status === 200) {
          const imageDataUrl = URL.createObjectURL(response.data);
          setImageUrl(imageDataUrl);
        } else {
          console.log('Failed to get QR code');
          console.log(response);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchQRCode();
  }, [classID]);

  useEffect(() => {
    if (isTimerRunning && remainingTime > 0) {
      const countdown = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    } else if (remainingTime === 0) {
      setShowPopup(true);
    }
  }, [isTimerRunning, remainingTime]);

  const extendTimer = () => {
    setRemainingTime((prevTime) => prevTime + 10);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setRemainingTime(0);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setRedirectToDashboard(true);
    return(<Redirect to={Routes.DashboardOverview.path} />);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          {imageUrl && (
            <Card className="qr-code-card">
              <Card.Body className="text-center">
                <h5>QR 코드를 카메라로 찍으세요!</h5>
                <div className="timer-counter">{remainingTime}초</div>
                <img src={imageUrl} alt="QR Code" className="centered-image" />
                <ButtonsComponent extendTimer={extendTimer} stopTimer={stopTimer} isTimerRunning={isTimerRunning} />
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Modal as={Modal.Dialog} centered show={showPopup} onHide={handleClosePopup}>
        <Modal.Body>
          <h5 className="text-center">중간 출석 종료!</h5>
          <p className="text-center">중간 출석이 종료되었습니다.</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={handleClosePopup}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

      {redirectToDashboard && <Redirect to={Routes.DashboardOverview.path} />}
    </>
  );
};

export default QRGenerator;
