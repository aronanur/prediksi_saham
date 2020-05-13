import React from 'react';
import Helper from '../../helper/helper';
import { Table } from 'react-bootstrap';
import { ActionButton } from '../../components/index';
import * as moment from 'moment';
import 'moment/locale/id';

export default function TableUser({ columns, dataSaham, rowPerPage }){

  const generateTableHead = () => {
    return(
      <thead className="normal-table-text-head">
        <tr>
          { columns.map((column, i) => {
            return(
              <th
                style={{ width: `${column.width}` }} 
                key={i}>{ column.title }</th>
            )
          })
          }
        </tr>
       </thead>
    )
  }

  const generateTableBody = () => {
    if(dataSaham.length > 0){
      return(
        <tbody className="normal-table-text-body">
            { dataSaham.map((data, i) => {
              return(
                <tr key={i}>
                  <td>{ data.id }</td>
                  <td>{ moment(data.tanggal).format('DD MMMM YYYY') }</td>
                  <td>{ Helper.formatRupiah(data.harga_closed) }</td>
                  <td>{ <ActionButton id={data.id} rowPerPage={rowPerPage} /> }</td>
                </tr>
              )
            }) 
          }
        </tbody>
      )
    }else{
      return(
        <tbody>
          <tr>
            <td colSpan={4} rowSpan={2}>
              <h3 style={{ textAlign: 'center' }}>Data Kosong!</h3>
            </td>
          </tr>
        </tbody>
      )
    }
  }

  return(
    <>
      <Table striped bordered hover responsive>
        { generateTableHead() }
        { generateTableBody() }
      </Table>
    </>
  )
}