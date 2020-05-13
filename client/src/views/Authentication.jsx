import React, { useEffect, useCallback } from 'react';
import Unpak from '../assets/logo/unpak.png';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, loginUser } from '../store/actions/user';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { PrediksiApi } from '../server/api';
import { ToastAdmin } from '../alert/toast';

export default function Authentication({ children, ...rest }){
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector(state => state.userReducer.loginStatus);

  const authenticatingUser = useCallback(async() => {
    if(localStorage.access_token){
      try {
        const { data } = await PrediksiApi.get('/user/check-user', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        if(data.statusCode === 200){
          dispatch(loginUser(data.body));
        }else{
          dispatch(logoutUser())
          ToastAdmin.fire({
            icon: 'error',
            title: data.message
          })
          localStorage.removeItem('access_token');
          history.push('/')
        }

      } catch (error) {
        ToastAdmin.fire({
          icon: 'error',
          title: 'Ups!! maaf terjadi kesalahan!'
        })
        localStorage.removeItem('access_token');
      }
    }else{
      history.push('/');
      ToastAdmin.fire({
        icon: 'success',
        title: 'Silahkan login terlebih dahulu!'
      })
    }
  }, [dispatch, history]);

  const generateView = () => {
    if(isLoggedIn){
      return(
        <Route
          {...rest}
          render={({ location }) =>
              isLoggedIn === 200 ? (
                children
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { from: location }
                  }}
                />
              )
            }
        >
        </Route>
      )
    }else{
      return (
      <div className='loader'>
        <img alt="Logo Unpak" src={Unpak} height="100" width="100"/>
        <Loader
          type="ThreeDots"
          color="#19854B"
          height={100}
          width={100}
        />
      </div>
      )
    }
  };

  useEffect(() => {
    authenticatingUser();
  }, [authenticatingUser])

  return(
    <>
      { generateView() }
    </>
  )

};