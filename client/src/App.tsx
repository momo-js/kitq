import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DynamicSign } from './views/signin';
import NotFound from './views/NotFound';
import Welcome from './views/welcome';
import { useSelector } from 'react-redux';
import Home from './views/home';

function App() {
  const isAuth = Boolean(useSelector((state: any) => state.token));

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/home' element={ isAuth ? <Home /> : <Navigate to='/' /> } />
        <Route path='/register' element={<DynamicSign />} />
        <Route path='/login' element={<DynamicSign />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
