import React from 'react';
import { Tooltip } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { AddCircleRounded } from '@material-ui/icons';

export default function ButtonCreateSaham({ handleShow }){
  return(
    <Tooltip title="Tambah Data Saham" arrow>
      <Button
        onClick={() => handleShow()}
        className="button-main" 
        variant="contained" 
        size="small" 
        startIcon={<AddCircleRounded />}>Tambah</Button> 
    </Tooltip>
  );
}