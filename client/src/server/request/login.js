import { PrediksiApi } from '../api';
import { ToastAdmin } from '../../alert/toast';

export const actionLogin = async (form, setLoading, setError) => {
  const response = {};
  try {
    const { data } = await PrediksiApi.post('/user/login', form);

    if(data){
      response.status = data.statusCode;
      response.text = data.statusCode === 200 ? data.body.user : data.message;
      if(data.statusCode === 200) localStorage.access_token = data.body.access_token;
      if(data.statusCode !== 200) setError(data.message);
      setLoading(false)
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