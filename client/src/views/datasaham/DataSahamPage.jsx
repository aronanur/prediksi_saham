import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { Title, Toolbar, PaginationDataSaham, TableSaham } from '../../components/index';
import { actionFetchListDataSaham } from '../../store/actions/datasaham';
import { columnSaham } from '../../table/saham';

export default function DataSahamPage(){
  const dispatch = useDispatch();
  const listDataSaham = useSelector(state => state.dataSahamReducer.listDataSaham);
  const countData = useSelector(state => state.dataSahamReducer.count);
  const [showAlert, setShowAlert] = useState(true);
  const [rowPerPage, setRowPerPage] = useState(10);

  const changeRowPerPage = (row) => {
    setRowPerPage(row)
  }

  useEffect(() => {
    dispatch(actionFetchListDataSaham())
  }, [dispatch])

  const alertView = () => {
    if(showAlert){
      return(
        <Alert variant="success" onClose={() => setShowAlert(false)} style={{ fontSize: 14 }} dismissible>
          <Alert.Heading style={{ fontSize: 16 }}>Tentang Aplikasi :</Alert.Heading>
          <p style={{ textAlign: 'justify' }}>
            Sistem prediksi saham menggunakan metode fuzzy time series adalah aplikasi yang digunakan
            untuk memprediksi sebuah saham melalui metode fuzzy time series.
          </p>
        </Alert>
      );
    }
  }

  return(
    <>
      <Title 
        page="stock"
        title="Data Saham & Tambah Data Saham"
      />
      { alertView() }
      <Toolbar 
        changeRowPerPage={changeRowPerPage}
      />
      <TableSaham 
        dataSaham={listDataSaham}
        columns={columnSaham}
        rowPerPage={rowPerPage}
      />
      <PaginationDataSaham 
        count={countData}
        rowPerPage={rowPerPage}
      />
    </>
  )
}