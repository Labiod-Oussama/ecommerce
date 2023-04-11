import { Box } from '@mui/material'
import React from 'react'
import Header from '../../Global/Header'
import Nav from '../../Global/Nav'
import ProductFiltering from './ProductFiltering'

function Products() {
  const UserInfos = JSON.parse(localStorage.getItem('UserInfo'))??{};
  const getCookie = (name) => {
     const value = "; " + document.cookie;
     const parts = value.split("; " + name + "=");
     if (parts.length === 2) {
        return parts.pop().split(";").shift();
     }
  }
  const token = getCookie("token");
  return (
    <Box>
         <Header value={2} islogin={token ?true:false} UserInfos={UserInfos}/>
        <Nav page='Products' />
        <Box p='60px 50px' display='flex'>
             <ProductFiltering />
              
        </Box>

    </Box>
    
  )
}

export default Products