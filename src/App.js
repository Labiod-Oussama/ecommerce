import './App.css';
import { Button, createTheme, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home/Home';
import { blue, purple, red } from '@mui/material/colors';
import About from './Components/Pages/About/About';
import Products from './Components/Pages/Products/Products';
import Data from "./Components/Data/Data.json";
import { createContext, useState } from 'react';
import OnePageProduct from './Components/Pages/Products/OnePageProduct';
import SignUp from './Components/Pages/Register/SignUp';
import Login from './Components/Pages/Register/Login';
import { theme } from './Components/Global/Theme';
import { token, UserInfos } from './Components/Global/Config';
import { gettingProducts, getSuggestion } from './Components/API/ApiProducts';
import { getCarts } from './Components/API/ApiAddCart';
import Cart from './Components/Pages/Cart/Cart';
export const InfoGlobal = createContext();
export const dataProducts = createContext();
export const dataCarts = createContext();
function App() {
  const [infos, setInfos] = useState({ token, UserInfos })
  return (
    <InfoGlobal.Provider value={{ infos, setInfos }}>
      <dataProducts.Provider value={{ gettingProducts, getSuggestion }}>
        <dataCarts.Provider value={{getCarts}}>
          <div className="App">
            <ThemeProvider theme={theme}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/About" element={<About />} />
                  <Route path="/Products" element={<Products />} />
                  <Route path="/Products/:product_ID" element={<OnePageProduct />} />
                  <Route path='/my-Cart' element={<Cart />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/login' element={<Login />} />
                </Routes>
              </BrowserRouter>
            </ThemeProvider>
          </div>
        </dataCarts.Provider>
      </dataProducts.Provider>
    </InfoGlobal.Provider>
  );
}

export default App;
