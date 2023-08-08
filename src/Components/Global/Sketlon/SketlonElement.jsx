import { Box, useMediaQuery, useTheme } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
import Shimer from './Shimer'
import Sketlon from './Sketlon'
function SketlonElement() {
  const theme = useTheme()
  const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
  const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Box display='flex' flexDirection='column' sx={{   overflow: 'hidden', mb: isMatchedPhone ? 3 : 5, mr: isMatchedPhone && 1, ml: isMatchedPhone && 1 }}>
      <Sketlon type='position' />
      <Box display='flex' justifyContent='space-between' >
        <Sketlon type='thumbnail' />
        <Box sx={{ width: '100%' }}>
          <Sketlon type='place' />
          <Sketlon type='name' />
          <Sketlon type='remote' />
          <Sketlon type='Description' />
        </Box>
      </Box>
      <Shimer />
    </Box>
  )
}

export default SketlonElement