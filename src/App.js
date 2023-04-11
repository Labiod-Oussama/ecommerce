import './App.css';
import {Button, createTheme,CssBaseline,GlobalStyles,ThemeProvider} from '@mui/material'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Components/Pages/Home/Home';
import { blue, purple, red } from '@mui/material/colors';
import About from './Components/Pages/About/About';
import Products from './Components/Pages/Products/Products';
import Data from "./Components/Data/Data.json";
import { createContext } from 'react';
import OnePageProduct from './Components/Pages/Products/OnePageProduct';
import SignUp from './Components/Pages/Register/SignUp';
import Login from './Components/Pages/Register/Login';
export const ProductData =createContext();
function App() {
  const theme = createTheme({
    // components: {
    //   MuiCssBaseline: {
    //     styleOverrides: `
    //       div {
    //         background-color: white;
    //       }
    //     `,
    //   },
    // },
    palette: { 
      primary: {
         main:'#48647f',
        light:'#ab7a5f',
        dark:'#102a42',
        A100:'#453227',
        A200:'#795744',
        A400:'#c5a491',
        grey:'#f1f5f8',
        text:'#324d67'
      },
      secondary: {
         main: '#ab7a5f',
        light:'#f1f5f8',
        dark:'#eaded7'
      },
    },
  });
  return (
    <ProductData.Provider value={Data}>
    <div className="App">
      <ThemeProvider theme={theme}>
       <BrowserRouter>
         <Routes>
          <Route path="/"  element={<Home/>}/>
          <Route path="/About"  element={<About/>}/>
          <Route path="/Products"  element={<Products />}/>
          <Route path="/Products/:product_ID"  element={<OnePageProduct />}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
         </Routes>
      </BrowserRouter>
        
      </ThemeProvider>
    </div>
    </ProductData.Provider>
  );
}

export default App;
 