import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import axios from 'axios';
import { Col, Row, Card, Table, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { RightSlidePage } from './RightSlide';

// A Table for all lecture list.
export const LectureTable = () => {
  const [cookies] = useCookies(['credentials']);
  const [tableInfo, setTableInfo] = useState([]);

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
  const [attendenceInfo, setAttendenceInfo] = useState([]);

  useEffect(() => {
    // Fetch professor information using axios using JSON formatting.
    const fetchLectureInfo = async () => {
      try {
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/lecture_details', { lecture_id: classID });
        setTableInfo(response.data);  // Access the JSON response

        const attendanceData = response.data.map((info) => {
          return {
            student_id: info.student_id,
            attendance: 'true'
          };
        });
        setAttendenceInfo(attendanceData)

      } catch (error) {
        console.error(error);
      }
    };
    fetchLectureInfo();
  }, []);

  const handleSaveAttendance = async () => {
    try {
      const updatedTableInfo = tableInfo.map((student) => {
        const attendanceInfo = attendenceInfo.find((info) => info.student_id === student.student_id);
        return {
          ...student,
          student_id: attendanceInfo ? attendanceInfo.student_id : student.student_id,
          attendance: attendanceInfo ? attendanceInfo.attendance : student.attendance
        };
      });
      setTableInfo(updatedTableInfo);
  
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/save_attendance',
        {lecture_id: classID, attendance: attendenceInfo}
      );
    } catch (error) {
      console.error(error);
    }
  };

  const TableRow = (props) => {
    const getAttendanceBadgeColor = (attendance) => {
      if (attendance === "not-ready") {
        return "info";
      } else if (attendance === "true") {
        return "success";
      } else if (attendance === "false") {
        return "danger";
      } else if (attendance === "late") {
        return "warning";
      }
    };

    const getAttendanceBadgeText = (attendance) => {
      if (attendance === "not-ready") {
        return "출석 체크 X";
      } else if (attendance === "true") {
        return "출석";
      } else if (attendance === "false") {
        return "결석";
      } else if (attendance === "late") {
        return "지각";
      }
    };

    const { student_name, student_id, department, attendance, missing } = props;
    const selectedAttendanceObj = attendenceInfo.find((info) => info.student_id === student_id);
    const [selectedAttendance, setSelectedAttendance] = useState(selectedAttendanceObj ? selectedAttendanceObj.attendance : "true");
    const attendanceBadgeColor = getAttendanceBadgeColor(attendance);
    const attendanceBadgeText = getAttendanceBadgeText(attendance);
    const midAttendanceBadgeColor = missing ? "danger" : "success";
    const midAttendanceBadgeText = missing ? "중간 출석 X" : "중간 출석 O";

    const handleAttendanceChange = (event, studentId) => {
      const updatedAttendenceInfo = attendenceInfo.map((student) => {
        if (student.student_id === studentId) {
          return {
            ...student,
            attendance: event.target.value
          };
        }
        return student;
      });
    
      setAttendenceInfo(updatedAttendenceInfo);
      setSelectedAttendance(event.target.value);
    };
    
    return (
      <tr>
        <th scope="row">{student_name}</th>
        <td>{student_id}</td>
        <td>{department}</td>
        <td>
          <span className={`badge bg-${attendanceBadgeColor} badge-lg font-size-18`}>
            {attendanceBadgeText}
          </span>
        </td>
        <td>
          <span className={`badge bg-${midAttendanceBadgeColor} badge-lg font-size-18`}>
            {midAttendanceBadgeText}
          </span>
        </td>
        <td>
          <select
            className="form-select"
            value={selectedAttendance}
            onChange={(event) => handleAttendanceChange(event, student_id)}
          >
            <option value="true">출석</option>
            <option value="false">결석</option>
            <option value="late">지각</option>
          </select>
        </td>
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
            <th scope="col">중간 출석</th>
            <th scope="col">출결 변경</th>
          </tr>
        </thead>
        <tbody>
          {tableInfo.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleSaveAttendance}>
        출석 저장
      </Button>
    </Card>
  );
};