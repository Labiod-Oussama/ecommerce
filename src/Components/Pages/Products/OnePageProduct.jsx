import React, { useContext, useState, useEffect, useReducer } from 'react'
import { useParams } from "react-router-dom";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Box, Button, Grid, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import Header from '../../Global/Header';
import Nav from '../../Global/Nav';
import { ProductData } from '../../../App';
import Footer from '../../Global/Footer';
import { useNavigate } from 'react-router-dom'
function OnePageProduct() {
    const ProductsData = useContext(ProductData)
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [typeOfColor, setTypeOfColor] = useState('')
    const [starNbr, setStarNbr] = useState(0)
    const params = useParams()
    const product_id = params.product_ID
    const navigate = useNavigate()
    useEffect(() => {
        const searchProduct = async () => {
            const productFound = await ProductsData.filter(product => {
                return product.Product_ID == product_id
            })
            setProduct(productFound)
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }
        searchProduct()
    }, [product_id])
    useEffect(() => {
        if (product.length != 0) {
            setTypeOfColor(product[0].Color[0])
            setStarNbr(product[0].Evaluation)
        }
    }, [product])
    const initialState = 1;
    const reducer = (state, action) => {
        switch (action) {
            case 'increment':
                return state + 1
            case 'decrement':
                if (state == 1) return 1
                return state - 1
        }
    }
    const [count, dispatch] = useReducer(reducer, initialState)
    const UserInfos = JSON.parse(localStorage.getItem('UserInfo')) ?? {};
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
            <Header value={2} islogin={token ? true : false} UserInfos={UserInfos} />
            {
                loading ? <Box height='100vh' display='flex' justifyContent='center' alignItems='center'>
                    Loading ...
                </Box> : (
                    <>
                        <Nav page='Products' product_id={product[0].Product_name} />
                        <Box display='flex' flexDirection='column' p='100px 50px'>
                            <Button onClick={() => navigate('/Products')} variant='contained' color='secondary' sx={{ mr: 'auto', mb: 7 }}>
                                BACK TO PRODUCTS
                            </Button>
                            <Box display='flex'>
                                <Box flex={1}>
                                    <img src={product[0].image} alt="s" width='90%' height='100%' style={{ borderRadius: '8px' }} />
                                </Box>
                                <Box flex={1} display='flex' flexDirection='column'>
                                    <Typography variant='h3' color='primary.dark' mb={1}>{product[0].Product_name}</Typography>
                                    <Box display='flex' alignItems='center' mb={2}>
                                        <Box mr={2} display='flex' alignItems='center'>
                                            {
                                                [1, 2, 3, 4, 5].map((star, index) => {
                                                    while (starNbr > index) {
                                                        return <StarBorderOutlinedIcon sx={{ color: 'yellow' }} />
                                                    }
                                                    return <StarBorderOutlinedIcon />
                                                })
                                            }
                                        </Box>
                                        <Typography variant='body1' color='primary.text'>({product[0].Customer_review} customer reviews)</Typography>
                                    </Box>
                                    <Typography variant='h6' color='primary.light' mb={2} fontWeight='bolder'>${product[0].Price}</Typography>
                                    <Typography variant='body1' color='primary.text' lineHeight='35px' mb={3}>{product[0].Description}</Typography>
                                    <Box display='flex' mb={2}>
                                        <Typography variant='h6' color='primary.dark' fontWeight='bold' mr={2}> Available:</Typography>
                                        <Typography variant='h6' color='primary.dark'>{product[0].Available}</Typography>
                                    </Box>
                                    <Box display='flex' mb={2}>
                                        <Typography variant='h6' color='primary.dark' fontWeight='bold' mr={2}> SKU:</Typography>
                                        <Typography variant='h6' color='primary.dark'>{product[0].SKU}</Typography>
                                    </Box>
                                    <Box display='flex' mb={3}>
                                        <Typography variant='h6' color='primary.dark' fontWeight='bold' mr={2}> Brand:</Typography>
                                        <Typography variant='h6' color='primary.dark'>{product[0].Brand}</Typography>
                                    </Box>
                                    <hr style={{ width: '100%' }} />
                                    <Box display='flex' alignItems='center' mb={3}>
                                        <Typography variant='h6' color='primary.dark' fontWeight='bold' mr={5}> Colors:</Typography>
                                        {
                                            product[0].Color.map(col => (
                                                <Box onClick={() => setTypeOfColor(col)} style={{ width: '25px', height: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', borderRadius: '50%', backgroundColor: col, marginLeft: 8, cursor: 'pointer', opacity: typeOfColor == col ? 1 : 0.3 }}>{typeOfColor == col ? <CheckOutlinedIcon sx={{ transform: 'scale(0.6)' }} /> : null}</Box>))
                                        }
                                    </Box>
                                    <Box display='flex' alignItems='center' mb={2}>
                                        <Box onClick={() => dispatch('decrement')} sx={{ bgcolor: 'primary.light', textAlign: 'center', lineHeight: '30px', width: '30px', height: '30px', borderRadius: '50%', fontSize: '1.5em', cursor: 'pointer', mr: 2 }}>-</Box>
                                        <Typography variant='h4' color='primary.dark' mr={2}>{count}</Typography>
                                        <Box onClick={() => dispatch('increment')} sx={{ bgcolor: 'primary.light', textAlign: 'center', lineHeight: '30px', width: '30px', height: '30px', borderRadius: '50%', fontSize: '1.5em', cursor: 'pointer' }}>+</Box>
                                    </Box>
                                    <Button variant='contained' color='secondary' sx={{ mr: 'auto' }}>ADD TO CART</Button>

                                </Box>

                            </Box>
                        </Box>
                    </>
                )
            }
            <Footer />


        </Box>
    )
}

export default OnePageProduct