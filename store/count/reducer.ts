import { AnyAction } from 'redux'
import { countActionTypes } from './action'

const countInitialState = {
  count: 0,
}

export default function reducer(state = countInitialState, action: AnyAction) {
  switch (action.type) {
    case countActionTypes.ADD:
      return {
        ...state,
        count: state.count + 1,
      }
    default:
      return state
  }
}

