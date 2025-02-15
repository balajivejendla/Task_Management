import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import Tasks from './Components/tasks';
import Features from './Components/Features';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from "react-router-dom";
import {Link} from 'react-router-dom';
import Navbar from './Components/Navbar';


function App() {

  return (
    <>
      

<div><Navbar/></div>
<br/>
<Routes>
<Route path='/' element={<div className="conatiner"><Tasks/></div>}/>

<Route path='/Features' element={<div className="container" ><Features/></div>}/>
</Routes>

    </>

  );
}

export default App;
