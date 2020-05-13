import React from 'react';
import * as moment from 'moment';
import 'moment/locale/id';
import Helper from '../../helper/helper';
import { tahap3, fuzzyLinguistik, fuzzyLinguistikRelasi, tahap4, tahap5, kesimpulanMetode } from '../../table/prediksi';
import { Table, Row, Col } from 'react-bootstrap';

export default function PrediksiTahap3({ data }){

  const generateTableHead = () => {
    return(
      <thead className="normal-table-text-head">
        <tr>
          { tahap3.map((column, i) => {
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
    if(data.uInterval){
      return(
        <tbody className="normal-table-text-body">
            { data.uInterval.map((data, i) => {
              return(
                <tr key={i}>
                  <td>{ data.interval }</td>
                  <td>{ data.min }</td>
                  <td>{ data.max }</td>
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
            <td colSpan={3} rowSpan={2}>
              <h3 style={{ textAlign: 'center' }}>Data Kosong!</h3>
            </td>
          </tr>
        </tbody>
      )
    }
  }

  const generateTableHeadFuzzy = () => {
    return(
      <thead className="normal-table-text-head">
        <tr>
          { fuzzyLinguistik.map((column, i) => {
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

  const generateTableBodyFuzzy = () => {
    if(data.uInterval){
      return(
        <tbody className="normal-table-text-body">
            { data.fuzzyLinguistik.map((data, i) => {
              return(
                <tr key={i}>
                  <td>{ data.nilai }</td>
                  <td>{ data.linguistik }</td>
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
            <td colSpan={3} rowSpan={2}>
              <h3 style={{ textAlign: 'center' }}>Data Kosong!</h3>
            </td>
          </tr>
        </tbody>
      )
    }
  }


  const generateTableHeadFuzzyRelasi = () => {
    return(
      <thead className="normal-table-text-head">
        <tr>
          { fuzzyLinguistikRelasi.map((column, i) => {
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

  const generateTableBodyFuzzyRelasi = () => {
    if(data.uInterval){
      return(
        <tbody className="normal-table-text-body">
            { data.relasiFuzzyLinguistik.map((data, i) => {
              return(
                <tr key={i}>
                  <td>{ data.a }</td>
                  <td>{ data.b }</td>
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
            <td colSpan={3} rowSpan={2}>
              <h3 style={{ textAlign: 'center' }}>Data Kosong!</h3>
            </td>
          </tr>
        </tbody>
      )
    }
  }

  const generateTableHeadTahap4 = () => {
    return(
      <thead className="normal-table-text-head">
        <tr>
          { tahap4.map((column, i) => {
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

  const generateTableBodyTahap4 = () => {
    if(data.uInterval){
      return(
        <tbody className="normal-table-text-body">
            { data.defuzzyfikasi.map((data, i) => {
              return(
                <tr key={i}>
                  <td>{ data.total }</td>
                  <td>{ data.iterasi }</td>
                  <td>{ Helper.joinRelasi(data.relasi) || '-'  }</td>
                  <td>{ data.nilaiInterval }</td>
                  <td>{ data.fuzzyfikasi !== '-' ? Math.round(data.fuzzyfikasi) : data.fuzzyfikasi }</td>
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
            <td colSpan={3} rowSpan={2}>
              <h3 style={{ textAlign: 'center' }}>Data Kosong!</h3>
            </td>
          </tr>
        </tbody>
      )
    }
  }

  const generateTableHeadMatrixHimpunan = () => {
    return(
      <thead className="normal-table-text-head">
        <tr>
          <th>#</th>
          { data.matrixHimpunanFuzzy.map((column, i) => {
            return(
              <th
                key={i}>{ `U${i+1}` }</th>
            )
          })
          }
        </tr>
       </thead>
    )
  }

  const generateTableBodyMatrixHimpunan = () => {
    if(data.uInterval){
      return(
        <tbody className="normal-table-text-body">
            { data.matrixHimpunanFuzzy.map((data, i) => {
              return(
                <tr key={i}>
                  <td>{ `U${i + 1}` }</td>
                  { Object.keys(data).map((item) => {
                    return(
                      <td>{ data[item] }</td>
                    )
                  }) }
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
            <td colSpan={3} rowSpan={2}>
              <h3 style={{ textAlign: 'center' }}>Data Kosong!</h3>
            </td>
          </tr>
        </tbody>
      )
    }
  }

  const generateTableHeadMatrixNormalisasi = () => {
    return(
      <thead className="normal-table-text-head">
        <tr>
          <th>#</th>
          { data.matrixNormalisasi.map((column, i) => {
            return(
              <th
                key={i}>{ `U${i+1}` }</th>
            )
          })
          }
        </tr>
       </thead>
    )
  }

  const generateTableBodyMatrixNormalisasi = () => {
    if(data.uInterval){
      return(
        <tbody className="normal-table-text-body">
            { data.matrixNormalisasi.map((data, i) => {
              return(
                <tr key={i}>
                  <td>{ `U${i + 1}` }</td>
                  { Object.keys(data).map((item) => {
                    return(
                      <td>{ Number(data[item]).toFixed(3) }</td>
                    )
                  }) }
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
            <td colSpan={3} rowSpan={2}>
              <h3 style={{ textAlign: 'center' }}>Data Kosong!</h3>
            </td>
          </tr>
        </tbody>
      )
    }
  }

  const generateTableHeadTahap5 = () => {
    return(
      <thead className="normal-table-text-head">
        <tr>
          { tahap5.map((column, i) => {
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

  const generateTableBodyTahap5 = () => {
    if(data.uInterval){
      return(
        <tbody className="normal-table-text-body">
            { data.tahap5.map((data, i) => {
              return(
                <tr key={i}>
                  <td>{ moment(data.tanggal).format('DD MMMM YYYY') }</td>
                  <td>{ data.nilai }</td>
                  <td>{ data.linguistik  }</td>
                  <td>{ Math.round(data.defuzzyfikasi)  }</td>
                  <td>{ Math.round(data.nilaiPeramalan)  }</td>
                  <td>{ Math.round(data.nilaiMSE)  }</td>
                  <td>{ Number(data.nilaiAffer).toFixed(5)  }</td>
                  <td>{ Number(data.nilaiAbsAffer).toFixed(5)  }</td>
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
            <td colSpan={3} rowSpan={2}>
              <h3 style={{ textAlign: 'center' }}>Data Kosong!</h3>
            </td>
          </tr>
        </tbody>
      )
    }
  }

  const generateTableHeadKesimpulan = () => {
    return(
      <thead className="normal-table-text-head">
        <tr>
          { kesimpulanMetode.map((column, i) => {
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

  const generateTableBodyKesimpulan = () => {
    if(data.uInterval){
      return(
        <tbody className="normal-table-text-body">
          <tr>
            { Object.keys(data.kesimpulan).map((item, i) => {
              return(
                  <td key={i}>{ Number(data.kesimpulan[item]).toFixed(4)  }</td>
              )
            }) 
            }
          </tr>
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
      <hr />
      <h4>Prediksi Tahap 3</h4>
      <Row>
        <Col md={6}>
        <h5>- U Interval</h5>
          <Table striped bordered hover responsive>
            { generateTableHead() }
            { generateTableBody() }
          </Table>
        </Col>
        <Col md={3}>
        <h5>- Fuzzy Linguistik</h5>
          <Table striped bordered hover responsive>
            { generateTableHeadFuzzy() }
            { generateTableBodyFuzzy() }
          </Table>
        </Col>
        <Col md={3}>
        <h5>- Fuzzy Linguistik Relasi</h5>
          <Table striped bordered hover responsive>
            { generateTableHeadFuzzyRelasi() }
            { generateTableBodyFuzzyRelasi() }
          </Table>
        </Col>
      </Row>
      <hr />
        <h4>Prediksi Tahap 4</h4>
        <h5>- Matrix Himpunan Fuzzy</h5>
        <Table striped bordered hover responsive>
            { generateTableHeadMatrixHimpunan() }
            { generateTableBodyMatrixHimpunan() }
        </Table>
        <hr />
        <h5>- Matrix Normalisasi</h5>
        <Table striped bordered hover responsive>
            { generateTableHeadMatrixNormalisasi() }
            { generateTableBodyMatrixNormalisasi() }
        </Table>
        <hr />
        <h5>- Defuzzyfikasi</h5>
        <Table striped bordered hover responsive>
            { generateTableHeadTahap4() }
            { generateTableBodyTahap4() }
        </Table>
        <hr />
        <h4> Prediksi Tahap 5</h4>
        <Table striped bordered hover responsive>
            { generateTableHeadTahap5() }
            { generateTableBodyTahap5() }
        </Table>
        <hr />
        <h4> Kesimpulan </h4>
        <Table striped bordered hover responsive>
            { generateTableHeadKesimpulan() }
            { generateTableBodyKesimpulan() }
        </Table>
    </>
  )
}