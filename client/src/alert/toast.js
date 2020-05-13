import Swal from 'sweetalert2';

export const ToastAdmin = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  customClass: 'swal-custom',
  timer: 5000,
  timerProgressBar: true,
});