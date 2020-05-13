import React from 'react';
import Swal from 'sweetalert2';
import { ExitToAppRounded } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../store/actions/user';
import { Dropdown } from 'react-bootstrap';
import { ToastAdmin } from '../../alert/toast';

export default function ButtonLogout(){
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    Swal.fire({
      title: 'Apakah anda yakin ingin keluar ?',
      customClass: 'swal-confirm-custom',
      position: 'top-end',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Tidak',
      confirmButtonText: 'Yakin!'
    }).then((result) => {
      if (result.value) {
        dispatch(logoutUser());
        ToastAdmin.fire({
          icon: 'success',
          title: 'Anda berhasil logout!'
        })
        localStorage.removeItem('access_token');
        history.push('/')
      }
    })
  }

  return(
    <Dropdown.Item
      onClick={logout}>
      <ExitToAppRounded className="start-icon" />
      Keluar
    </Dropdown.Item>
  );
}