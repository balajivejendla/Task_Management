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
import Signin from './Components/Signin';
import { AuthProvider } from './Components/AuthContext';
import { LoadingProvider } from './Components/LoadingContext';
import { useLoading } from './Components/LoadingContext';

function App() {

  return (
    <AuthProvider>
    <LoadingProvider>
    <>
    

      
      
<Navbar/>

<div className=" custom_css1">
<Routes>
<Route path='/' element={<div className="container"><Tasks/></div>}/>

     

<Route path='/Features' element={<div className="container" ><SuspenseWithLoading><Features/></SuspenseWithLoading></div>}/>
<Route path='/Contactus' element={
              <div className="container">
                <SuspenseWithLoading>
                  <Contact/>
                </SuspenseWithLoading>
              </div>
            } />
            <Route path='/Tips' element={<div className="container" ><SuspenseWithLoading><Tip1/></SuspenseWithLoading></div>}/>
            <Route path='/Signin' element={
              <div className="container">
                <SuspenseWithLoading>
                  <Signin/>
                </SuspenseWithLoading>
              </div>
            }/>
</Routes>
</div>

    </>
    </LoadingProvider>
    </AuthProvider>

  );
}

function SuspenseWithLoading({ children }) {
  const { isLoading, loadingType } = useLoading();
  
  if (isLoading) {
    const getLoadingGif = () => {
      switch(loadingType) {
        case 'features':
          return '/loading.gif';
        case 'contact':
          return '/loadingbar.gif';
        case 'tips':
          return '/dot.gif';
        case 'signin':
          return '/loading.gif';
        default:
          return '/loading.gif';
      }
    };

    return (
      <div className="loading-overlay">
        <div className="loading-spinner">
          <img 
            key={loadingType}
            src={getLoadingGif()}
            alt={`Loading ${loadingType}...`}
            style={{ width: '100px', height: '100px' }}
          />
          <p className="loading-text">
            {`Loading ${loadingType ? loadingType.charAt(0).toUpperCase() + loadingType.slice(1) : ''}...`}
          </p>
        </div>
      </div>
    );
  }

  return children;
}

export default App;
