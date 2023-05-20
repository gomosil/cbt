
import React from "react";
import { useCookies } from 'react-cookie';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';


import { CheckLogin } from "../HomePage";
import { LectureTable } from "../../components/LectureTable" 

export default () => {
  return (
    <>
      <CheckLogin></CheckLogin>
      <LectureTable></LectureTable>
    </>
  );
};
