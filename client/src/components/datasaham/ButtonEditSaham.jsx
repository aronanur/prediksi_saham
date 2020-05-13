import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { CreateSaham } from '../../components/index';
import { actionFetchDataSaham } from '../../store/actions/datasaham';

export default function ButtonEditSaham({ id }){
  const dispatch = useDispatch();
  const dataSaham = useSelector(state => state.dataSahamReducer.dataSaham);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    dispatch(actionFetchDataSaham(id))
  };

  return(
    <>
      <Tooltip title="Update Saham" arrow>
        <Button
          onClick={handleShow} 
          className="button-action" 
          size="sm" 
          variant="dark">
          Update
        </Button>
      </Tooltip>
      <CreateSaham
        type="update"
        data={dataSaham}
        handleClose={handleClose}
        show={show}
        id={id}
      />
    </>
  )
}