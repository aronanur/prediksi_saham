import { PrediksiApi } from '../api';
import { ToastAdmin } from '../../alert/toast';

const responseHandler = (data, status, setValidationError = {}, type = 'change-roles') => {

  switch (data.statusCode) {
    case 200:
      ToastAdmin.fire({
        icon: 'success',
        title: data.statusText
      })
      return status = 200

    case 201:
      ToastAdmin.fire({
        icon: 'success',
        title: data.statusText
      })
      return status = 201
      
    case 400:
      setValidationError(data.message)
      return status = 400
    
    case 401:
      ToastAdmin.fire({
        icon: 'error',
        title: data.message
      })
      return status = 401

    case 403:
      ToastAdmin.fire({
        icon: 'error',
        title: data.message
      })
      return status = 403

    default:
      ToastAdmin.fire({
        icon: 'error',
        title: data.message
      })
      return status = 500
  }
}

export const createSaham = async (form, setValidationError, setLoading, handleClose) => {
  let status = false;
  try {
    const { data } = await PrediksiApi.post('/data-saham', form, {
      headers: {
        access_token: localStorage.access_token
      }
    })

    if(data){
      status = responseHandler(data, status, setValidationError);
      if(status !== 400) handleClose()
      setLoading(false)
    }

  } catch (error) {
    ToastAdmin.fire({
      icon: 'error',
      title: 'Ups! Server Bermasalah'
    })
    setLoading(false)
  }

  return status;
}

export const createMultipleDataSaham = async (form, setLoading, handleClose) => {
  let status = false;
  try {
    const { data } = await PrediksiApi.post('/data-saham/multiple/create', { listSaham: form }, {
      headers: {
        access_token: localStorage.access_token
      }
    });

    if(data){
      status = responseHandler(data, status);
      if(status !== 400) handleClose()
      setLoading(false);
    }

  } catch (error) {
    ToastAdmin.fire({
      icon: 'error',
      title: 'Ups! Server Bermasalah'
    })
    setLoading(false)
  }

  return status
}

export const updateSaham = async(id, form, setValidationError, setLoading, handleClose) => {
  let status = false

  try {
    const { data } = await PrediksiApi.put(`/data-saham/${id}`, form, {
      headers: {
        access_token: localStorage.access_token
      }
    })

    if(data){
      status = responseHandler(data, status, setValidationError);
      if(status !== 400) handleClose();
      setLoading(false);
    }

  } catch (error) {
    ToastAdmin.fire({
      icon: 'error',
      title: 'Ups! Server Bermasalah'
    })
    setLoading(false)
  }

  return status;
}

export const deleteSaham = async(id, setLoading) => {
  let status = false

  try {
    const { data } = await PrediksiApi.delete(`/data-saham/${id}`, {
      headers: {
        access_token: localStorage.access_token
      }
    })

    if(data){
      status = responseHandler(data, status);
      setLoading(false);
    }

  } catch (error) {
    ToastAdmin.fire({
      icon: 'error',
      title: 'Ups! Server Bermasalah'
    })
    setLoading(false)
  }

  return status;
}

export const truncateSaham = async(setLoading) => {
  let status = false

  try {
    const { data } = await PrediksiApi.delete(`/data-saham/multiple/delete`, {
      headers: {
        access_token: localStorage.access_token
      }
    })

    if(data){
      status = responseHandler(data, status);
      setLoading(false);
    }

  } catch (error) {
    ToastAdmin.fire({
      icon: 'error',
      title: 'Ups! Server Bermasalah'
    })
    setLoading(false)
  }

  return status;
}

export const allDataSaham = async (setLoading, setStart, handleClose) => {
  const response = {}
  try {
    const { data } = await PrediksiApi.get('/data-saham/all/data', {
      headers: {
        access_token: localStorage.access_token
      }
    })
    
    if(data){
      response.status = data.statusCode
      response.body  = data.body
      setLoading(false);
      setStart(true);
      handleClose();
    }

  } catch (error) {
    ToastAdmin.fire({
      icon: 'error',
      title: 'Ups! Server Bermasalah'
    })
    setLoading(false)
  }
  return response;
}