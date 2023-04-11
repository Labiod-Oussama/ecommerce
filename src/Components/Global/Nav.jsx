import { Box, Link, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Nav({ page, product_id }) {
    const navigate = useNavigate();
    return (
        <Box bgcolor='secondary.dark' mt={3} p='30px 40px' fontSize='2.5em'>
            <Link underline='none' color='primary.A200' style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>Home</Link>
            / {' '} <Link underline='none' color='primary.A200' style={{  marginRight: '10px', cursor: 'pointer' }} onClick={() => navigate('/Products')}>{page}</Link> {product_id && `/ ${product_id}`}
        </Box>
    )
}

export default Nav