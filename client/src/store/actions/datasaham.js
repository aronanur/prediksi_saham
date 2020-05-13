import { PrediksiApi } from '../../server/api';

const fetchListDataSaham = (payload) => ({
  type: 'FETCH_LIST_DATA_SAHAM',
  payload
})

export const actionFetchListDataSaham = (page = 1, pageSize = 10) => {
  return async(dispatch) => {
    try {
      const { data } = await PrediksiApi.get(`/data-saham?page=${page}&pageSize=${pageSize}`,{
        headers: {
          access_token: localStorage.access_token
        }
      })
      dispatch(fetchListDataSaham(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const fetchDataSaham = (payload) => ({
  type: 'FETCH_DATA_SAHAM',
  payload
})

export const actionFetchDataSaham = (id) => {
  return async(dispatch) => {
    try {
      const { data } = await PrediksiApi.get(`/data-saham/${id}`, {
        headers: {
          access_token: localStorage.access_token
        }   
      })
  
      dispatch(fetchDataSaham(data))

    } catch (error) {
      console.log(error)
    }

  }
}

export const storeAllData = (payload) => ({
  type: 'STORE_ALL_DATA',
  payload
})

export const setD1 = (payload) => ({
  type: 'SET_D1',
  payload
})

export const setD2 = (payload) => ({
  type: 'SET_D2',
  payload
})