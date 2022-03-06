import { Dispatch } from 'redux'

export const actionTypes = {
  SET_IDX: 'SET_IDX',
  SET_ISLOADING: 'SET_ISLOADING',
  SET_CITIES: 'SET_CITIES',
  SET_CURRENT_CITY: 'SET_CURRENT_CITY',
  SET_OTHER_CITY: 'SET_OTHER_CITY',
  SET_KEYWORD: 'SET_KEYWORD',
  SET_RESULT_BUS_ROUTES: 'SET_RESULT_BUS_ROUTES',
  SET_RESULT_STATIONS: 'SET_RESULT_STATIONS',
}

export const setIdx = (idx: number) => (dispatch: Dispatch) =>
  dispatch({ type: actionTypes.SET_IDX, payload: idx })

export const setIsLoading = (isLoading: boolean) => (dispatch: Dispatch) =>
  dispatch({ type: actionTypes.SET_ISLOADING, payload: isLoading })

export const setCities = (cities: ICity[]) => (dispatch: Dispatch) => 
  dispatch({ type: actionTypes.SET_CITIES, payload: cities })

export const setCurrentCity = (city: ICity) => (dispatch: Dispatch) => 
  dispatch({ type: actionTypes.SET_CURRENT_CITY, payload: city })

export const setOtherCity = (city: ICity) => (dispatch: Dispatch) =>
  dispatch({ type: actionTypes.SET_OTHER_CITY, payload: city })

export const setKeyword = (keyword: string) => (dispatch: Dispatch) =>
  dispatch({ type: actionTypes.SET_KEYWORD, payload: keyword })

export const setResultBusRoutes = (busRoutes: IBusRoute[]) => (dispatch: Dispatch) =>
  dispatch({ type: actionTypes.SET_RESULT_BUS_ROUTES, payload: busRoutes })

export const setResultStations = (busStations: IBusStation[]) => (dispatch: Dispatch) =>
  dispatch({ type: actionTypes.SET_RESULT_STATIONS, payload: busStations })