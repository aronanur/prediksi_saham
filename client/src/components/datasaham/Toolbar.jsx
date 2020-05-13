import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { CreateSaham, ButtonCreateSaham, ButtonRowPerMenu, ButtonUploadData, ButtonTruncate } from '../../components/index';

export default function Toolbar({ changeRowPerPage }){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <Row>
      <Col md={9} className="mb-3 d-flex justify-content-end ml-auto">
        <ButtonCreateSaham 
          handleShow={handleShow} />
        <ButtonRowPerMenu 
          changeRowPerPage={changeRowPerPage}
        />
        <ButtonUploadData />
        <ButtonTruncate />
        <CreateSaham
          handleClose={handleClose}
          show={show}
        />
      </Col>
    </Row>
  );
}