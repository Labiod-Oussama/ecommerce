import React, { useContext, useState, useEffect, useReducer } from 'react'
import { useParams } from "react-router-dom";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import MuiAlert from '@mui/material/Alert';
import { Box, Button, Grow, Rating, Snackbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import Header from '../../Global/Header';
import Nav from '../../Global/Nav';
import Footer from '../../Global/Footer';
import { useNavigate } from 'react-router-dom'
import { serverAddress } from '../../Global/Config';
import { InfoGlobal } from '../../../App';
import '../../Global/Sketlon/Loader.css';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function OnePageProduct() {
    const { infos: { UserInfos, token }, setInfos } = useContext(InfoGlobal);
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [typeOfColor, setTypeOfColor] = useState('')
    const [starNbr, setStarNbr] = useState(0)
    const [alert, setAlert] = useState({ type: '', text: '' });
    const params = useParams()
    const product_id = params.product_ID
    const navigate = useNavigate()

    useEffect(() => {
        const gettingOneProduct = async () => {
            try {
                const response = await fetch(`${serverAddress}/Products/${product_id}`, {
                    method: 'GET',
                    headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
                });
                if (response.status === 401) {
                    localStorage.setItem('SearchProduct', JSON.stringify(product_id))
                    navigate('/login')
                } else {
                    const json = await response.json();
                    setProduct(json);
                    setTimeout(() => {
                        setLoading(false)
                    }, 1000);
                }
            }
            catch (error) {
                console.error('Error fetching product:', error);
            }
        }
        gettingOneProduct();
    }, [])
    useEffect(() => {
        if (product.length != 0) {
            setTypeOfColor(product.Color[0])
            setStarNbr(product.Evaluation)
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
    const [count, dispatch] = useReducer(reducer, initialState);

    //handling the alert of cart 
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const [SnackbarShow, setSnackbarShow] = useState({
        vertical: 'top',
        horizontal: 'center',
    })
    const { vertical, horizontal } = SnackbarShow;
    function GrowTransition(props) {
        return <Grow {...props} />;
    }
    const handleAdd = () => {
        const userId = UserInfos._id;
        fetch(`${serverAddress}/Cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                userId,
                productId: product_id,
                quantitiy: count,
                color:typeOfColor
            })
        }).then(async (res) => {
            if (res.ok) {
                const response = await res.json();
                setAlert({ type: 'success', text: response.alert });
            }
            else {
                const response = await res.json();
                setAlert({ type: 'error', text: response.alert });
            }
        }).then(handleClick())
    }
    const theme = useTheme()
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Box>
            <Header value={2} islogin={token ? true : false} />
            {
                loading ? <Box height='100vh' display='flex' justifyContent='center' alignItems='center'>
                    <Box className='loader'></Box>
                </Box> : (
                    <>
                        <Nav page='Products' />
                        <Box display='flex' flexDirection='column' sx={{p:{xs:'15px',md:'20px',lg:'40px'}}}>
                            <Button onClick={() => navigate('/Products')} variant='contained' color='secondary' sx={{ mr: 'auto', mb: 4 }}>
                                BACK TO PRODUCTS
                            </Button>
                            <Box  sx={{display:'flex',flexWrap:'wrap'}}>
                                <Box flex='1 1 50%'>
                                    <img src={product.image} alt="s" width={isMatchedPhone?'97%':'90%'} height='100%' style={{ borderRadius: '8px', objectFit: 'cover' }} />
                                </Box>
                                <Box flex={'1 1 50%'} display='flex' flexDirection='column'>
                                    <Typography variant='h3' color='primary.dark' mb={1}>{product.Product_name}</Typography>
                                    <Box display='flex' alignItems='center' mb={2}>
                                        <Box mr={2} display='flex' alignItems='center'>
                                            <Rating defaultValue={starNbr} readOnly />
                                        </Box>
                                        <Typography variant='body1' color='primary.text'>({product.Customer_review} customer reviews)</Typography>
                                    </Box>
                                    <Typography variant='h6' color='primary.light' mb={2} fontWeight='bolder'>${product.Price}</Typography>
                                    <Typography variant='body1' color='primary.text' lineHeight='35px' mb={3}>{product.Description}</Typography>
                                    <Box display='flex' mb={2}>
                                        <Typography variant='h6' color='primary.dark' fontWeight='bold' mr={2}> Available:</Typography>
                                        <Typography variant='h6' color='primary.dark'>{product.Available}</Typography>
                                    </Box>
                                    <Box display='flex' mb={2}>
                                        <Typography variant='h6' color='primary.dark' fontWeight='bold' mr={2}> SKU:</Typography>
                                        <Typography variant='h6' color='primary.dark'>{product.SKU}</Typography>
                                    </Box>
                                    <Box display='flex' mb={3}>
                                        <Typography variant='h6' color='primary.dark' fontWeight='bold' mr={2}> Brand:</Typography>
                                        <Typography variant='h6' color='primary.dark'>{product.Brand}</Typography>
                                    </Box>
                                    <hr style={{ width: '100%' }} />
                                    <Box display='flex' alignItems='center' mb={3}>
                                        <Typography variant='h6' color='primary.dark' fontWeight='bold' mr={5}> Colors:</Typography>
                                        {
                                            product.Color.map((col, index) => (
                                                <Box key={index} onClick={() => setTypeOfColor(col)} style={{ width: '25px', height: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', borderRadius: '50%', backgroundColor: col, marginLeft: 8, cursor: 'pointer', opacity: typeOfColor == col ? 1 : 0.3 }}>{typeOfColor == col ? <CheckOutlinedIcon sx={{ transform: 'scale(0.6)' }} /> : null}</Box>))
                                        }
                                    </Box>
                                    <Box display='flex' alignItems='center' mb={2}>
                                        <Box onClick={() => dispatch('decrement')} sx={{ bgcolor: 'primary.light', textAlign: 'center', lineHeight: '30px', width: '30px', height: '30px', borderRadius: '50%', fontSize: '1.5em', cursor: 'pointer', mr: 2 }}>-</Box>
                                        <Typography variant='h4' color='primary.dark' mr={2}>{count}</Typography>
                                        <Box onClick={() => dispatch('increment')} sx={{ bgcolor: 'primary.light', textAlign: 'center', lineHeight: '30px', width: '30px', height: '30px', borderRadius: '50%', fontSize: '1.5em', cursor: 'pointer' }}>+</Box>
                                    </Box>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        sx={{ mr: 'auto' }}
                                        onClick={handleAdd}
                                    >ADD TO CART</Button>
                                </Box>

                            </Box>
                        </Box>
                    </>
                )
            }
            {
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    transitionDuration={1000}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    TransitionComponent={GrowTransition}
                    key={vertical + horizontal}
                >

                    <Alert onClose={handleClose} severity={alert.type} >
                        {alert.text}
                    </Alert>
                </Snackbar>
            }
            <Footer />


        </Box>
    )
}

export default OnePageProduct