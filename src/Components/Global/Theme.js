import { createTheme } from "@mui/material";

export  const theme = createTheme({
  typography:{
    fontFamily:[
       'Source Sans Pro',
       'Comfortaa'
    ].join(',')
  },
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