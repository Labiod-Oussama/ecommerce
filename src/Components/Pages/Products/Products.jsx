import { Box } from '@mui/material'
import React, { useContext } from 'react'
import Header from '../../Global/Header'
import Nav from '../../Global/Nav'
import ProductFiltering from './ProductFiltering'
import { InfoGlobal } from '../../../App'

function Products() {
  const { infos: { UserInfos, token }, setInfos } = useContext(InfoGlobal);
  return (
    <Box>
      <Header value={2} islogin={token ? true : false} />
      <Nav page='Products' />
      <Box p='30px' display='flex'>
        <ProductFiltering />

      </Box>

    </Box>

  )
}

export default Products