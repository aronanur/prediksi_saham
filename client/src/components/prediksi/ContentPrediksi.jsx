import React from 'react';
import { Fade } from 'react-reveal';
import Vector from '../../assets/vector/undraw_all_the_data_h4ki.png';
import { Col } from 'react-bootstrap';

export default function ContentPrediksi(){
  return(
    <Fade delay={200}>
      <Col md={8} className="mx-auto ml-auto">
        <img alt="Vector Analysis" src={Vector}
          style={{ width: '90%', height: '50%' }}
        />
        <h4 className="text-dark text-center">Untuk Melakukan Prediksi Silahkan Klik Tombol <b className="text-success">Prediksi Saham</b></h4> 
      </Col>
    </Fade>
  )
}
