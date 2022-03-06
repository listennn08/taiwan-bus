import { Dispatch } from "redux"

export const countActionTypes = {
  ADD: 'ADD'
}

export const addCount = () => (dispatch: Dispatch) => {
  return dispatch({ type: countActionTypes.ADD })
}