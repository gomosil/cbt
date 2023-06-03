import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import axios from 'axios';
import { Col, Row, Card, Table} from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { RightSlidePage } from './RightSlide';

// A Table for all lecture list.
export const LectureTable = () => {
  const [cookies] = useCookies(['credentials']);
  const [tableInfo, setTableInfo] = useState([]);

  console.log(cookies)

  useEffect(() => {
    // Fetch professor information using axios using JSON formatting.
    const fetchProfessorInfo = async () => {
      try {
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/lecture_list', { id: cookies.credentials.id });    
        setTableInfo(response.data);  // Access the JSON response
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfessorInfo();
  }, []);

  const TableRow = (props) => {
    const { name, dept, count, lectured, id } = props;
    const lecture_stat = lectured ? "출강" : "미출강";

    return (
      <tr>
        <th scope="row">{name}</th>
        <td>{dept}</td>
        <td>{count}</td>
        <td>{lecture_stat}</td>
        <td><RightSlidePage clickButton={<FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>} classID={id} lectureName={name}> </RightSlidePage></td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>수업 목록</h5>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">수업 이름</th>
            <th scope="col">학과</th>
            <th scope="col">학생 총원</th>
            <th scope="col">출강 여부</th>
            <th scope="col">자세히</th>
          </tr>
        </thead>
        <tbody>
          {tableInfo.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
    </Card>
  );
};

// A Table for all students in lecture.
export const LectureInfo = (props) => {
  const { classID } = props;
  const [tableInfo, setTableInfo] = useState([]);

  useEffect(() => {
    // Fetch professor information using axios using JSON formatting.
    const fetchLectureInfo = async () => {
      try {
        console.log("table: sending: " + classID)
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/lecture_details', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            id: classID
          }),
        });
        
        setTableInfo(response.data);  // Access the JSON response
        console.log("TABLE INFO:" + tableInfo)
      } catch (error) {
        console.error(error);
      }
    };
    fetchLectureInfo();
  }, []);

  const TableRow = (props) => {
    console.log(props);
    const { student_name, student_id, department, attendance } = props;
    const stat = attendance ? "출석" : "결석";

    return (
      <tr>
        <th scope="row">{student_name}</th>
        <td>{student_id}</td>
        <td>{department}</td>
        <td>{stat}</td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>학생 목록</h5>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">이름</th>
            <th scope="col">학번</th>
            <th scope="col">학과</th>
            <th scope="col">출결</th>
          </tr>
        </thead>
        <tbody>
          {tableInfo.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
    </Card>
  );
};
