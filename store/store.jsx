import { configureStore } from '@reduxjs/toolkit'
import  dataReducer  from '../src/slices/dataSlices'
import  formReducer  from '../src/slices/formSlices'
import searchReducer  from '../src/slices/searchSlices'

export const store = configureStore({
  reducer: {
    Data: dataReducer,
    Form: formReducer,
    Search: searchReducer
  },
})