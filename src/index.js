import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MenuContext from './context/MenuContext';
import "./Custom.css"
import "../src/css/basics/Media.css"

import { BrowserRouter as Router } from "react-router-dom";
import { ScreenSizeProvider } from './context/ScreenSizeContext';
import SearchData from './context/SearchData';
import 'react-loading-skeleton/dist/skeleton.css'
import CartChangerContext from './context/CartChangerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartChangerContext>

      <SearchData>
  <MenuContext>
    <ScreenSizeProvider>


        <Router>

          {/* // <React.StrictMode> */}
          <App />
          {/* // </React.StrictMode> */}
        </Router>
    </ScreenSizeProvider>

  </MenuContext>
      </SearchData>
      </CartChangerContext>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
