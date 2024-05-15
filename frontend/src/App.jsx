import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Home from './Components/Home';
import { DataProvider } from './ContextApi/dataprovider';

function App() {
  return (
    <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/users' element={<Home/>}/>
            {/* <Route path='/add-user/:id' element={<CreateUserComponent/>}/> */}
          </Routes>
        </BrowserRouter>
    </DataProvider>
  );
}

export default App;
