import { Box, Button, Grid, Typography } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { blue, grey } from '@mui/material/colors'
import React from 'react'
import { useState } from 'react';
import { red } from '@material-ui/core/colors';
// const useStyles = makeStyles({
//     ttn: {
//         backgroundColor: (hov) => {
//             if (hov) {
//                 return 'rgba(0, 0, 0, 0.5)'
//             }
//             else {
//                 return 'rgba(0, 0, 0, 0)'
//             }
//         }
//     }
// })
function ProductsByLine({ name, type, photo, price,description}) {
  
  return (
    <Box sx={{height: 270, borderRadius: '5px',display:'flex',mb:2}}>
           <Box flex={0.3} mr={3}> <img src={photo} alt={name} style={{height: '100%',borderRadius: '5px', width:'100%' }} /></Box>
            <Box display='flex' flex={0.7} flexDirection='column' justifyContent='space-evenly'>
                <Typography variant='h5' color='primary.dark'>
                    {name}
                </Typography>
                <Typography variant='h6' color='secondary' gutterBottom>
                    ${price}
                </Typography>
                <Typography variant='boby1' color='primary.text' lineHeight='25px' height='50px' overflow='hidden'   gutterBottom>
                    {description}...
                </Typography>
                <Button size='small' variant='contained' color='secondary' sx={{width:'120px'}}>Details</Button>
            </Box>
        </Box>
  )
}

export default ProductsByLine