import React, { useEffect, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { ClearAllRounded } from '@material-ui/icons';
import Perhitungan from '../../perhitungan/perhitungan';
import { PrediksiTahap2, PrediksiTahap3 } from '../index';
import { Col } from 'react-bootstrap';

export default function BaganPrediksi({ data, d1, d2, setStart }){
  const [tahap1, setTahap1] = useState([]);

  const generateTahap3 = useCallback(() => {
    if(tahap1.length > 0){
      return(
        <PrediksiTahap3
          data={Perhitungan.prediksiTahap3(tahap1[0])}
      />
    )
    }
  }, [tahap1])

  useEffect(() => {
    if(data.length > 0) setTahap1(Perhitungan.prediksiTahap2(data, +d1, +d2))
  }, [data, d1, d2])

  return(
    <Col md={12} className="mt-3">
      <PrediksiTahap2 
        dataPrediksi={tahap1}
      />
      { generateTahap3() }
    <Button
      onClick={() => setStart(false)}
      variant="danger"
      size="sm">
        <ClearAllRounded className="start-icon" />
        Clear Perhitungan
    </Button>
    </Col>
  )
}