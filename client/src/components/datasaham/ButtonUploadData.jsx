import React, { useState } from 'react';
import { Tooltip } from '@material-ui/core';
import { UploadData } from '../index';
import { Button } from '@material-ui/core';
import { CloudUploadRounded } from '@material-ui/icons';

export default function ButtonUploadData(){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
    <Tooltip title="Upload Data Saham" arrow>
      <Button
        onClick={handleShow}
        className="button-upload" 
        variant="contained" 
        size="small" 
        startIcon={<CloudUploadRounded />}>Upload</Button> 
    </Tooltip>
      <UploadData 
        handleClose={handleClose}
        show={show}
      />
    </>
  );
}