import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { truncateSaham } from '../../server/request/dataSaham';
import { Tooltip } from '@material-ui/core';
import { actionFetchListDataSaham } from '../../store/actions/datasaham';
import { logoutUser } from '../../store/actions/user';
import { Button } from '@material-ui/core';
import { ClearAllRounded } from '@material-ui/icons';

export default function ButtonTruncate(){
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const truncateHandler = () => {
    Swal.fire({
      title: 'Apakah anda yakin ingin menghapus semua data ?',
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
        const request = await truncateSaham(setLoading);
        if(request === 200){
          dispatch(actionFetchListDataSaham())
        }else if(request === 403){
          localStorage.removeItem('access_token');
          dispatch(logoutUser())
          history.push('/');
        }
      }
    })
  }

  return(
    <>
    <Tooltip title="Hapus Semua Data Saham" arrow>
      <Button
        disabled={loading}
        onClick={truncateHandler}
        className="button-truncate" 
        variant="contained" 
        size="small" 
        startIcon={<ClearAllRounded />}>
        { loading ? 'Loading..' : 'Truncate' }
        </Button> 
    </Tooltip>
    </>
  );
}