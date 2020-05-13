import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ButtonCreatePrediksi, CreatePrediksi } from '../../components/index';

export default function Toolbar({ setStart }){
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <Row>
      <Col md={9}>
        <ButtonCreatePrediksi 
          handleShow={handleShow} />
        <CreatePrediksi
          setStart={setStart}
          handleClose={handleClose}
          show={show} />
      </Col>
    </Row>
  );
}