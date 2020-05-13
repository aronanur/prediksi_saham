const initialState = {
  listDataSaham: [],
  dataSaham: null,
  allDataSaham: [],
  count: 0,
  d1: 0,
  d2: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LIST_DATA_SAHAM':
      return {...state, listDataSaham: action.payload.body, count: action.payload.count}
    case 'FETCH_DATA_SAHAM':
      return {...state, dataSaham: action.payload.body }
    case 'STORE_ALL_DATA':
      return { ...state, allDataSaham: action.payload}
    case 'SET_D1':
      return { ...state, d1: action.payload}
    case 'SET_D2':
      return { ...state, d2: action.payload}

    default:
      return state
  }
}