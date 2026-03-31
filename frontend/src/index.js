import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomePage from './landing_page/home/HomePage';
import Signup from './landing_page/signup/Signup.js'
import AboutPage from './landing_page/about/AboutPage.js'
import ProductPage from './landing_page/products/ProductPage.js'
import PricingPage from './landing_page/pricing/PricingPage.js'
import SupportPage from './landing_page/support/SupportPage.js'
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFoud.js';
import Auth from "./landing_page/signup/Signup.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<HomePage/>}></Route>
    <Route path="/auth" element={<Auth/>}/>
    <Route path='/about' element={<AboutPage/>}></Route>
    <Route path='/product' element={<ProductPage/>}></Route>
    <Route path='/pricing' element={<PricingPage/>}></Route>
    <Route path='/support' element={<SupportPage/>}></Route>
    <Route path='/*' element={<NotFound/>}></Route>
  </Routes>
  <Footer/>
  </BrowserRouter>
);
