import { configureStore } from '@reduxjs/toolkit'

import dailyWorkReducer from './dailyWork'
import userInfoReducer from './userInfo'

export const store = configureStore({
  reducer: {
    dailyWork: dailyWorkReducer,
    userInfo: userInfoReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
