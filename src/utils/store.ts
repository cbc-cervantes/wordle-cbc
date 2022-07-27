import { configureStore } from '@reduxjs/toolkit'
import AppSlice from 'slices/AppSlice'

const AppStore = configureStore({
  reducer: AppSlice.reducer
})

export type RootState = ReturnType<typeof AppStore.getState>
export type AppDispatch = typeof AppStore.dispatch

export default AppStore