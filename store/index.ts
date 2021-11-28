import { configureStore } from '@reduxjs/toolkit'
import searchSlice from './features/search'

const store = configureStore({
  reducer: {
    search: searchSlice,
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch