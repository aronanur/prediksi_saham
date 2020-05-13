import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Title, ToolbarPrediksi, ContentPrediksi, BaganPrediksi } from '../../components/index';

export default function PrediksiSahamPage(){
  const allDataSaham = useSelector(state => state.dataSahamReducer.allDataSaham);
  const nilaiD1 = useSelector(state => state.dataSahamReducer.d1);
  const nilaiD2 = useSelector(state => state.dataSahamReducer.d2);
  const [start, setStart] = useState(false);
  
  const generateContentView = () => {
    if(!start) return <ContentPrediksi />
    return <BaganPrediksi data={allDataSaham} d1={nilaiD1} d2={nilaiD2} setStart={setStart}/>
  }

  return(
    <>
      <Title 
        page="stock"
        title="Halaman Prediksi Saham"
      />
      <ToolbarPrediksi 
        setStart={setStart}
      />
      { generateContentView() }
    </>
  );

};