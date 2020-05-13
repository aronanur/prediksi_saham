import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createSaham, updateSaham } from '../../server/request/dataSaham';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { AddCircleRounded } from '@material-ui/icons';
import { FormStore } from '../index';
import { formList, formBody } from '../../form/saham';
import { SaveRounded } from '@material-ui/icons';
import { logoutUser } from '../../store/actions/user';
import { actionFetchListDataSaham } from '../../store/actions/datasaham';

export default function CreateSaham({ handleClose, show, type="create", data = null, id = null }){
  const dispatch = useDispatch()
  const history = useHistory();
  const [form, setForm] = useState(formBody)
  const [validationError, setValidationError] = useState({})
  const [loading, setLoading] = useState(false)

  const handleInput = (event) => {
    setForm({
      ...form,
      [event.target.name] : event.target.value
    })
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true)
    const request = 
      type === 'create' ? await createSaham(form, setValidationError, setLoading, handleClose) :
      await updateSaham(id, form, setValidationError, setLoading, handleClose)

    if(request === 201){
      dispatch(actionFetchListDataSaham())
      setForm(formBody);
    }else if(request === 200){
      dispatch(actionFetchListDataSaham())
      setForm(formBody);
    }else if(request === 403){
      dispatch(logoutUser(false));
      localStorage.removeItem('access_token')
      history.push('/');
    }

  }

  useEffect(() => {
   if(data !== null && type !== 'create'){
     setForm(data);
   }
  }, [data, type])

  return(
    <Modal
      show={show}
      onHide={() => handleClose()}>
      <Modal.Header>
        <Modal.Title className="modal-title-text"><AddCircleRounded className="start-icon" /> Data Saham </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={submitHandler}>
          <FormStore 
            handleInput={handleInput}
            formList={formList}
            validationError={validationError}
            value={form}
          />
          <Button
            disabled={loading}
            type="submit"
            size="sm" 
            variant="primary"> 
            <SaveRounded className="start-icon"/> { loading ? 'Loading' : 'Simpan Data' }
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          size="sm" 
          variant="secondary" 
          onClick={() => handleClose()}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
}