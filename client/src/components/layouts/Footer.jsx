import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer(){
  return(
    <Container fluid className="bg-main mt-4 footer">
        <p className="text-center text-light footer-text">Sistem Prediksi Saham Fuzzy Time Series &copy; 2020</p>
    </Container>
  );
}