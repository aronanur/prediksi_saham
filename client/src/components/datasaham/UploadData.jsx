import React, { useState } from 'react';
import csv from 'csv';
import Helper from '../../helper/helper';
import { useHistory } from 'react-router-dom';
import { createMultipleDataSaham } from '../../server/request/dataSaham';
import { useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';
import { Modal, Button, Table } from 'react-bootstrap';
import { RefreshRounded, CloudUploadRounded } from '@material-ui/icons';
import { actionFetchListDataSaham } from '../../store/actions/datasaham';
import { logoutUser } from '../../store/actions/user';

export default function UploadData({ handleClose, show }){
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false)
  const [dataSaham, setDataSaham] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [fileRow, setFileRow] = useState(0);
  const [fileName, setFileName] = useState(null);
  const [type, setType] = useState(null);

  const closeModal = () => {
    handleClose()
    setDataSaham([])
  }

  const onDropFiles = (acceptedFiles) => {
    const files = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        const csvFormat = [];
        data.forEach(column => {
          csvFormat.push({ tanggal: column[1], harga_closed: Helper.makeIntegerFormat(column[2]) })
        })
        setFileRow(csvFormat.length)
        setFileName(files.name);
        setType(files.type)
        setUploaded(true)
        setDataSaham(csvFormat)
      })
    }
    reader.readAsBinaryString(files)
  }

  const uploadHandler = async () => {
    setLoading(true)
    const request = await createMultipleDataSaham(dataSaham, setLoading, handleClose);

  if(request === 201){
      dispatch(actionFetchListDataSaham())
      setDataSaham([]);
      setUploaded(false)
    }else if(request === 403){
      dispatch(logoutUser());
      localStorage.removeItem('access_token')
      history.push('/');
    }
  }

  const generateView = () => {
    if(!uploaded){
      return(
        <Dropzone accept=".csv" onDrop={onDropFiles}>
          {({getRootProps, getInputProps}) => (
            <section className="uploader-container">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="text-secondary">Drag some files, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      )
    }else{ 
      return (
        <>
          <Table striped bordered hover>
            <tbody className="normal-table-text-body">
              <tr>
                <td>Nama File</td>
                <td>{ fileName }</td>
              </tr>
              <tr>
                <td>Jumlah Baris</td>
                <td>{ fileRow } (baris)</td>
              </tr>
              <tr>
                <td>Format File</td>
                <td>{ type }</td>
              </tr>
            </tbody>
          </Table>
          <br></br>
          <Button
            disabled={loading}
            style={{ marginRight: 5 }}
            size="sm" 
            variant="primary"
            onClick={uploadHandler}>
            <CloudUploadRounded className="start-icon"/>
            { loading ? 'Sedang upload data' : 'Upload Data' }
          </Button>
          <Button
            className="text-light"
            size="sm" 
            variant="dark"
            onClick={() => setUploaded(false)}>
            <RefreshRounded className="start-icon"/>
            Ulang
          </Button>
        </> 
      );
    }
  }

  return(
    <Modal
      backdrop={true} 
      show={show}
      onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>Upload Data Saham</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { generateView() }
      </Modal.Body>
      <Modal.Footer>
        <Button
          size="sm" 
          variant="secondary" 
          onClick={closeModal}>
          Batal
        </Button>
      </Modal.Footer>
    </Modal>
  );
}