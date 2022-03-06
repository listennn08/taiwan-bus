import { AnyAction } from 'redux'
import { actionTypes } from './action'


export interface ISearchReducer {
  idx: number
  isLoading: boolean
  cities: ICity[]
  currentCity: ICity
  otherCity: ICity
  keyword: string
  resultBusRoutes: IBusRoute[]
  resultBusStation: IBusStation[]
}

const initialState: ISearchReducer = {
  idx: 0,
  isLoading: false,
  cities: [],
  currentCity: {
    City: '',
    CityName: '',
  },
  otherCity: {
    City: '',
    CityName: '',
  },
  keyword: '',
  resultBusRoutes: [],
  resultBusStation: []
}

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case actionTypes.SET_IDX:
      return {
        ...state,
        idx: action.payload 
      }
    case actionTypes.SET_ISLOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case actionTypes.SET_CITIES:
      return {
        ...state,
        cities: action.payload
      }
    case actionTypes.SET_CURRENT_CITY:
      if (state.currentCity.City === action.payload.City)
        return {
          ...state,
          otherCity: { City: '', CityName: ''},
          currentCity: { City: '', CityName: '' }
        }

      return {
        ...state,
        otherCity: { City: '', CityName: ''},
        currentCity: action.payload
      }
    case actionTypes.SET_OTHER_CITY:
      if (state.otherCity.City === action.payload.City ) return {
        ...state,
        otherCity: { City: '', CityName: '' },
        currentCity: { City: '', CityName: '' }
      }
      
      return {
        ...state,
        currentCity: action.payload,
        otherCity: action.payload
      }
    case actionTypes.SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload
      }
    case actionTypes.SET_RESULT_BUS_ROUTES:
      return {
        ...state,
        resultBusRoutes: action.payload
      }
    case actionTypes.SET_RESULT_STATIONS:
      return {
        ...state,
        resultBusStation: action.payload
      }
    default:
      return state
  }
}
