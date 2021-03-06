import { createStore, applyMiddleware, combineReducers, AnyAction, Reducer, Middleware } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import search, { ISearchReducer } from './search/reducer'

export interface RootState {
  search: ISearchReducer
}

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware)
}

const combineReducer = combineReducers({
  search
})

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    }

    return nextState
  }

  return combineReducer(state, action)
}

const initStore = () => createStore(reducer, bindMiddleware([thunkMiddleware]))

export const wrapper = createWrapper(initStore)
