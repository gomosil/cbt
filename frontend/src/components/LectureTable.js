import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";


export const LectureTable = () => {
  const [cookies] = useCookies(['credentials']);
  const [tableInfo, setTableInfo] = useState([]);

  console.log(cookies)

  useEffect(() => {
    // Fetch professor information using axios using JSON formatting.
    const fetchProfessorInfo = async () => {
      try {
        console.log("table: sending: " + cookies.credentials.id)
        const response = await axios.get('http://172.25.244.37:5001/lecture_list', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            id: cookies.credentials.id,
          }),
        });
        
        setTableInfo(response.data);  // Access the JSON response
        console.log("TABLE INFO:" + tableInfo)
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfessorInfo();
  }, []);

  const TableRow = (props) => {
    console.log(props);
    const { name, dept, students, lectured } = props;
    const lecture_stat = lectured ? "출강" : "미출강";

    return (
      <tr>
        <th scope="row">{name}</th>
        <td>{dept}</td>
        <td>{students.length}</td>
        <td>{lecture_stat}</td>
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
          </tr>
        </thead>
        <tbody>
          {tableInfo.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
    </Card>
  );
};
