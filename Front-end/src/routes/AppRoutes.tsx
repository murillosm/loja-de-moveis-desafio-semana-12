import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'

type Props = {
}

const AppRoutes = (props: Props) => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='./login' element={<Login />} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes