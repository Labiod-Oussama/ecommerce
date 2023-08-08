import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import Header from '../../Global/Header';
import { InfoGlobal, dataCarts } from '../../../App';
import { OneCart } from './OneCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import '../../Global/Sketlon/Loader.css';
import PageLoading from './PageLoading'
function Cart() {
    const { infos: { UserInfos, token }, setInfos } = useContext(InfoGlobal);
    const { getCarts } = useContext(dataCarts);
    const navigate = useNavigate();
    const [Carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0)
    useEffect(() => {
        const gettingCart = async () => {
            try {
                setLoading(true);
                const response = await getCarts(UserInfos._id);
                setCarts(response[0]);
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        gettingCart()
    }, [])
    useEffect(() => {
        if (!loading) {
            if (Carts?.products?.length > 0) {
                Carts.products.map(cart => {
                    setTotal(prev => prev + (cart.quantitiy * cart.productId.Price))
                })
            } else {
                setTotal(0)
            }
        }
    }, [loading, Carts]);
    const [LoadAmount, setLoadAmount] = useState(false)
    return (
        <Box sx={{position:'relative'}}>
            <Header islogin={token ? true : false} />
            <Box sx={{ p: 3 }}>
                <Typography variant='h3' color='primary' textAlign='center' mb={3}>
                    CHECKOUT
                </Typography>
                <Box sx={{ width: '100%' }}>
                    <Paper elevation={2} sx={{ p: '0 15px', mr: 2 }}>
                        <Typography variant='body1' color='primary.text' sx={{ height: '50px', lineHeight: '50px', borderBottom: 'solid 2px #ab7a5f' }}>
                            SHOPPING CART
                        </Typography>
                        <Box sx={{ height:'auto',maxHeight:'360px', overflowY: 'auto', '&::-webkit-scrollbar': { width: 8 }, '&::-webkit-scrollbar-track': { backgroundColor: '#f5f5f5' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#ab7a5f', borderRadius: 4 } }}>
                            {loading ? (
                                <Typography variant='h4' mt={1} mb={1} >Loading...</Typography>
                            ) : (
                                Array.isArray(Carts.products) && Carts.products.length > 0 ? (
                                    Carts.products.map((cart, index) => (
                                        <OneCart
                                            key={index}
                                            productId={cart.productId._id}
                                            name={cart.productId.Product_name}
                                            quantity={cart.quantitiy}
                                            price={cart.productId.Price}
                                            image={cart.productId.image}
                                            color={cart.color}
                                            setCarts={setCarts}
                                            setLoadAmount={setLoadAmount}
                                        />
                                    ))
                                ) : (
                                    <Typography variant='h4' mt={1} mb={1} >No carts found.</Typography>
                                )
                            )}

                        </Box>
                        <Box display='flex' justifyContent='space-between' p='20px 0' borderTop='solid 2px #ab7a5f'>
                            <Button variant='contained' size='large' color='secondary' onClick={() => navigate('/Products')} sx={{ fontWeight: 'bold' }} startIcon={<ArrowBackIosIcon />}>
                                Continue shopping
                            </Button>
                            <Box display='flex' alignItems='center'>
                                <Typography variant='h4' color='primary.text' fontWeight='bolder' mr={4}>
                                    Total:
                                </Typography>
                                {
                                    (total != 0 || !loading) ? <Typography variant='h5' color='secondary' fontWeight='bolder'>
                                        ${total.toFixed(2)}
                                    </Typography> : <Box className='loader'></Box>
                                }

                            </Box>
                        </Box>
                    </Paper>
                    {/* <Box sx={{ flex: 0.6, display: 'flex', flexDirection: 'column' }}>
                        <Paper elevation={2} sx={{ p: 1.5, mb: 3 }} >
                            <Typography variant='body1' sx={{ height: '40px', lineHeight: '40px', borderBottom: 'solid 1px grey', mb: 2 }}>
                                YOUR INFORMATION
                            </Typography>
                            <TextField
                                label='Email'
                                variant='outlined'
                                color='primary'
                                fullWidth
                            />

                        </Paper >
                        <Paper elevation={2} sx={{ p: 1.5 }} >
                            <Typography variant='body1' sx={{ height: '40px', lineHeight: '40px', borderBottom: 'solid 1px grey', mb: 2 }}>
                                PAYMENT OPTIONS
                            </Typography>
                            <Button variant='contained' color='primary' fullWidth sx={{ fontWeight: 'bold', letterSpacing: '2px' }}  >
                                BUY NOW
                            </Button>
                        </Paper >

                    </Box> */}
                </Box>
            </Box>
            {
                LoadAmount && <PageLoading/>
            }
        </Box>
    )
}

export default Cart