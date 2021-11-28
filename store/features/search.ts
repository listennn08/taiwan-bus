import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ISearchSlice {
  idx: number
  isLoading: boolean
  cities: ICity[]
  currentCity: ICity
  otherCity: ICity
  keyword: string
  resultBusRoutes: IBusRoute[]
  resultBusStation: IBusStation[]
}
const initialState: ISearchSlice = {
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

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setIdx(state, action: PayloadAction<number>) {
      state.idx = action.payload
    },

    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },

    setCities(state, action: PayloadAction<ICity[]>) {
      state.cities = action.payload
    },

    setCurrentCity(state, action: PayloadAction<ICity>) {
      state.otherCity = { City: '', CityName: '' }

      if (state.currentCity.City === action.payload.City) {
        state.currentCity = { City: '', CityName: '' }
        return
      }

      state.currentCity = action.payload
    },
  
    setOtherCity(state, action: PayloadAction<ICity>) {
      if (state.otherCity.City === action.payload.City ) {
        state.otherCity = { City: '', CityName: '' }
        state.currentCity = { City: '', CityName: '' }
        return
      }

      state.currentCity = action.payload
      state.otherCity = action.payload
    },

    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload
    },

    setResultBusRoutes(state, action: PayloadAction<IBusRoute[]>) {
      state.resultBusRoutes = action.payload
    },

    setResultStations(state, action: PayloadAction<IBusStation[]>) {
      state.resultBusStation = action.payload
    }
  }
})

export const {
  setIdx,
  setIsLoading,
  setCities,
  setCurrentCity,
  setOtherCity,
  setKeyword,
  setResultBusRoutes,
  setResultStations,
} = searchSlice.actions
export default searchSlice.reducer
