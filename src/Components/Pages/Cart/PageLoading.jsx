import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const PageLoading = () => {
    return (
        <Box sx={{ position: 'absolute',top:0,left:0, width: '100%', height: '100vh', bgcolor: '#696a6b8a', display:'flex',justifyContent:'center',alignItems:'center'}}>
            <CircularProgress color='primary'  />
        </Box>
    )
}

export default PageLoading