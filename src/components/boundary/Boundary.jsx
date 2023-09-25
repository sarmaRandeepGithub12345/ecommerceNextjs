"use client"
import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../../utils/CounterSlice"
import { Provider } from 'react-redux'

export const store = configureStore({
    reducer : {
        counter:counterReducer
    }
})

const Boundary = ({children}) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default Boundary