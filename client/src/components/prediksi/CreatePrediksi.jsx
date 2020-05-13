import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { allDataSaham } from '../../server/request/dataSaham';
import { Modal, Button, Form } from 'react-bootstrap';
import { ShowChartRounded, SettingsApplicationsRounded } from '@material-ui/icons';
import { FormStore } from '../../components/index';
import { formList, formBody } from '../../form/prediksi';
import { storeAllData, setD2, setD1 } from '../../store/actions/datasaham';

export default function CreateSaham({ handleClose, show, setStart }){
  const dispatch = useDispatch();
  const [form, setForm] = useState(formBody);
  const [loading, setLoading] = useState(false)

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const getAllData = async (e) => {
    e.preventDefault();
    setLoading(true)
    const request = await allDataSaham(setLoading, setStart, handleClose);
    if(request.status === 200) {
      dispatch(storeAllData(request.body));
      dispatch(setD1(form.d1 || 0));
      dispatch(setD2(form.d2 || 0));
    }
  }


  return(
    <Modal
      show={show}
      onHide={() => handleClose()}>
      <Modal.Header>
        <Modal.Title className="modal-title-text"><ShowChartRounded className="start-icon" /> Prediksi Saham </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={getAllData}>
          <FormStore 
            handleInput={handleInput}
            formList={formList}
            validationError={{}}
            value={form}
          />
          <Button
            disabled={loading}
            type="submit"
            size="sm" 
            variant="primary"> 
            <SettingsApplicationsRounded className="start-icon"/> { loading ? 'Loading' : 'Proses Data' }
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