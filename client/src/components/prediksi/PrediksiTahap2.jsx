import React from 'react';
import { tahap2 } from '../../table/prediksi';
import { Table } from 'react-bootstrap';

export default function PrediksiTahap2({ dataPrediksi }){

  const generateTableHead = () => {
    return(
      <thead className="normal-table-text-head">
        <tr>
          { tahap2.map((column, i) => {
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
    if(dataPrediksi.length > 0){
      return(
        <tbody className="normal-table-text-body">
            { dataPrediksi.map((data, i) => {
              return(
                <tr key={i}>
                  <td>{ data.nmax }</td>
                  <td>{ data.nmin }</td>
                  <td>{ data.d1 }</td>
                  <td>{ data.d2 }</td>
                  <td>{ data.uMax }</td>
                  <td>{ data.uMin }</td>
                  <td>{ data.interval.toFixed(2) }</td>
                  <td>{ Number(data.absinterval).toFixed(2) }</td>
                  <td>{ data.pinterval }</td>
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
            <td colSpan={9} rowSpan={2}>
              <h3 style={{ textAlign: 'center' }}>Data Kosong!</h3>
            </td>
          </tr>
        </tbody>
      )
    }
  }

  return(
    <>
      <h4>Prediksi Tahap 2</h4>
      <Table striped bordered hover responsive>
        { generateTableHead() }
        { generateTableBody() }
      </Table>
    </>
  )
}