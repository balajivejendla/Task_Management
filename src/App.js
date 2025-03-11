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
import Contact from './Components/contactus';

import Tip1 from './Components/Tips';


function App() {

  return (
    <>
      
      
<Navbar/>

<div className=" custom_css1">
<Routes>
<Route path='/' element={<div className="conatiner"><Tasks/></div>}/>

<Route path='/Features' element={<div className="container" ><Features/></div>}/>
<Route path='/Contactus' element={<div className="container" ><Contact/></div>}/>
<Route path='/Tips' element={<div className="container" ><Tip1/></div>}/>
</Routes>
</div>

    </>

  );
}

export default App;
