import React from 'react';
import { Tooltip } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { FunctionsRounded } from '@material-ui/icons';

export default function ButtonCreatePrediksi({ handleShow }){
  return(
    <Tooltip title="Memulai Prediksi Saham" arrow>
      <Button
        onClick={() => handleShow()}
        className="button-main" 
        variant="contained" 
        size="small" 
        startIcon={<FunctionsRounded />}>Prediksi Saham</Button> 
    </Tooltip>
  );
}