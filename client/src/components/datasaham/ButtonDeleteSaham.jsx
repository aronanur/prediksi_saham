import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteSaham } from '../../server/request/dataSaham';
import { Tooltip } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { actionFetchListDataSaham } from '../../store/actions/datasaham';
import { logoutUser } from '../../store/actions/user';

export default function ButtonDeleteUser({ id, rowPerPage }){
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const deleteSahamHandler = () => {
    Swal.fire({
      title: 'Apakah anda yakin ingin menghapus data ini ?',
      icon: 'question',
      customClass: 'swal-confirm-custom',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Tidak!',
      confirmButtonText: 'Yakin!'
    }).then(async (result) => {
      if (result.value) {
        setLoading(true);
        const request = await deleteSaham(id, setLoading);
        if(request === 200){
          dispatch(actionFetchListDataSaham(1, rowPerPage))
        }else if(request === 403){
          localStorage.removeItem('access_token');
          dispatch(logoutUser())
          history.push('/');
        }
      }
    })
  }

  return(
    <Tooltip title="Hapus Saham" arrow>
      <Button
        onClick={deleteSahamHandler}
        disabled={loading} 
        className="button-action" 
        size="sm" 
        variant="danger">
        Hapus
      </Button>
    </Tooltip>
  )
}