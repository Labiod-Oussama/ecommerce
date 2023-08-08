import { Box, Link, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Nav({ page }) {
    const navigate = useNavigate();
    const theme = useTheme()
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Box bgcolor='secondary.dark' display='flex' alignItems='center' mt={3} p={isMatchedPhone?'20px 30px':'30px 40px'} fontWeight='bold' fontSize={isMatchedPhone?'1.5em':isMatchedTablette?'2em':'2.6em'}>
            <Link underline='none' style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                <Typography variant={isMatchedPhone ? 'h5' : isMatchedTablette ? 'h4' : 'h3'} color='primary.A100' fontWeight='bold'>
                    Home
                </Typography>
            </Link>
            / {' '} <Link underline='none' style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => navigate('/Products')}>
                <Typography variant={isMatchedPhone ? 'h5' : isMatchedTablette ? 'h4' : 'h3'} color='primary.A100' fontWeight='bold'>
                    {page}
                </Typography>
            </Link>
        </Box>
    )
}

export default Nav