import { Box, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <Box height='100px' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#000' }}>
    <Typography variant='h6' color='white'>
    © {new Date().getFullYear()} <Typography variant='h6' component='span' color='secondary'>ComfySloth</Typography> All rights reserved
    </Typography>
 </Box> 
  )
}

export default Footer