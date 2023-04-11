import { Box, Button, Grid, Typography } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
 import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
 const useStyles = makeStyles({
    ttn: {
        backgroundColor: (hov) => {
            if (hov) {
                return 'rgba(0, 0, 0, 0.5)'
            }
            else {
                return 'rgba(0, 0, 0, 0)'
            }
        }
    }
})
function Products({product_id,name, type, photo, price ,height}) {
    const [hov, setHov] = useState(false);
    const classes = useStyles(hov)
    const navigate=useNavigate()
    return (
         <Grid item sx={{ height: height, borderRadius: '5px'}} sm={6} xs={12} md={6} lg={4} style={{ position: 'relative' ,overflow:'hidden'}} >
            <Box position='absolute' onMouseOver={() => setHov(true)} onMouseLeave={() => setHov(false)} width='100%' height='76%' borderRadius='5px' style={{ transition: 'all .2s linear',display:'flex',justifyContent:'center',alignItems:'center' }} className={classes.ttn} >
                      <Button variant='contained' color='secondary' onClick={()=>navigate(`/Products/${product_id}`)} style={{width:30,height:60,transform:'scale(.8)',borderRadius:'50%',transition:'all .2s linear',opacity:hov?1:0}}>
                      <SearchOutlinedIcon />
                      </Button>
            </Box>
            <img src={photo} alt={name} style={{height: '80%', borderRadius: '5px', width: '100%' }} />
            <Box display='flex' justifyContent='space-between'   mt={1}>
                <Typography variant='body1' color='primary.dark'>
                    {name}
                </Typography>
                <Typography variant='body1' color='secondary'>
                    ${price}
                </Typography>
            </Box>
        </Grid>

    )
}

export default Products