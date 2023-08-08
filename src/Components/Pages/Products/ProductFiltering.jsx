import { Box, FormControl, Grid, InputAdornment, InputLabel, Link, MenuItem, Pagination, PaginationItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import React, { useReducer, useRef } from 'react'
import { useState, useContext } from 'react'
import { ProductData, dataProducts } from '../../../App'
import Products from '../Home/Products'
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ProductsByLine from '../Home/ProductsByLine'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import SearchOutlinedIcon from '@mui/icons-material/Search';
import { MuiScrollbar } from '@mui/material';
import { css } from '@emotion/react';
import { useEffect } from 'react'
import axios from 'axios'
import { serverAddress } from '../../Global/Config'
import '../../Global/Sketlon/Loader.css'
function ProductFiltering() {
    const { gettingProducts, getSuggestion } = useContext(dataProducts);

    const Category = ['All', 'Office', 'Living Room', 'Kitchen', 'Bedroom', 'Dining', 'Kids']
    const Colors = ['red', 'green', 'blue', 'black', 'yellow']
    const Company = ['All', 'marcos', 'liddy', 'ikea', 'caressa']
    const OrderBy = ['Default', 'Price (Lowest)', 'Price (Highest)']
    const [Search, setSearch] = useState('')
    const [ModeOfShowing, setModeOfShowing] = useState('BYGROUP')
    const [PossibiliteOfShipping, setPossibiliteOfShipping] = useState(false);
    const [Order, setOrder] = useState('')
    const [ProductDatabase, setProductDatabase] = useState([]);
    const [ProductsDataClonning, setProductsDataClonning] = useState([])
    const [tempArray, setTempArray] = useState([]);
    const [countProducts, setCountProducts] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [priceMax, setPriceMax] = useState(0);
    const [price, setPrice] = useState(0);
    const [messageError, setMessageError] = useState('');
    const [dataToSending, setDataToSending] = useState({
        Search: '',
        Category: 'All',
        typeOfCompany: 'All',
        typeOfColor: 'All',
        Shipping: false,
        Order: 'Default'
    });
    const getProducts = async () => {
        setLoading(true);
        const { Products, Total, MaxPrice } = await gettingProducts(dataToSending, page);
        console.log(MaxPrice);
        setTimeout(() => {
            setLoading(false)
        }, 1500);
        setProductDatabase(Products);
        setCountProducts(Total);
        setPriceMax(MaxPrice);
        setPrice(MaxPrice);
    }
    useEffect(() => {
        getProducts();
    }, [page, dataToSending])
    useEffect(() => {
        if (Order == 'Price (Lowest)') {
            setProductsDataClonning(tempArray.sort(comparePrice))
        }
        if (Order == 'Price (Highest)') {
            setProductsDataClonning(tempArray.sort(comparePrice).reverse())
        }
        if (Order == 'Default') {
            setProductsDataClonning(ProductDatabase)

        }
    }, [Order])
    function comparePrice(a, b) {
        if (a.Price < b.Price) {
            return -1;
        }
        if (a.Price > b.Price) {
            return 1;
        }
        return 0;
    }
    const ref = useRef(null);
    const [height, setHeight] = useState('auto')
    useEffect(() => {
        if (ref.current) {
            setHeight(ref.current.clientHeight - 50);
        }
    }, [])
    //search bar 
    const [Suggestion, setSuggestion] = useState([]);
    useEffect(() => {
        async function fetchGetSuggestion() {
            const { Suggestion: S } = await getSuggestion(dataToSending.Search);
            setSuggestion(S)
        }
        setTimeout(() => {
            fetchGetSuggestion();
        }, 1000);
    }, [dataToSending.Search])
    // fetch when i click on the suggestion
    const handleSelect = async (event, value) => {
        const Search = value.Product_name;
        setSearch(Search)
        axios.post(`${serverAddress}/ProductSearch`, {
            Search
        }).then(res => res.data)
            .then(data => { setProductDatabase(data.Products); setCountProducts(data.Total) })
    }
    useEffect(() => {
        if (Suggestion.length != 0) {
            Suggestion.reduce((acc, current) => {
                if (acc.findIndex(item => item.Product_name === current.Product_name) === -1) {
                    acc.push(current);
                }
                return acc;
            }, []);
        }
    }, [Suggestion])
    useEffect(() => {
        if (ProductDatabase.length == 0 && !loading) {
            setMessageError('No Product has been found');
        }
        else {
            setMessageError('');
        }
    }, [ProductDatabase, loading])
    const theme = useTheme()
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Box width='100%' display='flex' flexDirection={isMatchedPhone ? 'column' : 'row'}>
            <Box flex={0.4} ref={ref} mr={2} mb={isMatchedPhone && 3} >
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={Suggestion.map((option, index) => ({ ...option, _id: index }))}
                    getOptionLabel={(option) => option.Product_name}
                    renderOption={(props, option) => (
                        <li {...props} key={option._id}>
                            {option.Product_name}
                        </li>
                    )}
                    onChange={handleSelect}
                    renderInput={(params) => (
                        <TextField
                            onChange={(e) => { setSearch(e.target.value) }}
                            label="Search"
                            size='small'
                            value={dataToSending.Search}
                            sx={{ bgcolor: 'primary.grey', borderRadius: '8px', mb: isMatchedPhone ? 2 : 3 }}
                            {...params}
                            InputProps={{
                                ...params.InputProps,
                                // type: 'search'
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlinedIcon onClick={() => setDataToSending({ ...dataToSending, Search })} sx={{ color: 'black', cursor: 'pointer' }} />
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />
                <Box>
                    <Typography variant='h5' color='primary.dark' mb={1}>Category</Typography>
                    <Box display='flex' flexDirection='column' mb={isMatchedPhone ? 2 : 3}>
                        {
                            Category.map((cat, index) => (
                                <Link key={index} underline='hover' mb={1} onClick={() => { setDataToSending({ ...dataToSending, Category: cat }) }} style={{ cursor: 'pointer', textDecoration: dataToSending.Category == cat ? 'underline' : 'none' }}>{cat}</Link>
                            ))
                        }
                    </Box>
                    <Typography variant='h5' color='primary.dark' mb={1}>Company</Typography>
                    <FormControl size='small' sx={{ minWidth: 120, mb: isMatchedPhone ? 2 : 3 }}>
                        <InputLabel id="demo-simple-select-label">Company</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label='Company'
                            value={dataToSending.typeOfCompany}
                        >
                            {
                                Company.map((com, index) => (
                                    <MenuItem key={index} value={com} onClick={() => { setDataToSending({ ...dataToSending, typeOfCompany: com }) }}>{com}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <Typography variant='h5' color='primary.dark' mb={1}>Colors</Typography>
                    <Box display='flex' alignItems='center' mb={isMatchedPhone ? 2 : 4} >
                        <Link onClick={() => setDataToSending({ ...dataToSending, typeOfColor: 'All' })} underline={dataToSending.typeOfColor == 'All' ? 'always' : 'none'} sx={{ cursor: 'pointer' }}>All</Link>
                        {
                            Colors.map((col, index) => (
                                <Box key={index} onClick={() => { setDataToSending({ ...dataToSending, typeOfColor: col }) }} style={{ width: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', borderRadius: '50%', backgroundColor: col, marginLeft: 8, cursor: 'pointer', opacity: dataToSending.typeOfColor == col ? 1 : 0.3 }}>{dataToSending.typeOfColor == col ? <CheckOutlinedIcon sx={{ transform: 'scale(0.6)' }} /> : null}</Box>
                            ))
                        }
                    </Box>
                    <Typography variant='h5' color='primary.dark' mb={1}>Price</Typography>
                    <Box mb={isMatchedPhone ? 2 : 4}>
                        <Typography variant='body1'>${price}</Typography>
                        <input type='range' min={0} max={Math.ceil(priceMax)} value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Box>
                    Free Shipping {''}<input type='checkbox' value={dataToSending.Shipping} onChange={() => setDataToSending({ ...dataToSending, Shipping: !dataToSending.Shipping })} style={{ marginLeft: '10px', transform: 'scale(1.1)' }} />
                </Box>
            </Box>
            <Box flex={1.6}>
                <Box display='flex' alignItems='center' mb={2}>
                    <WidgetsOutlinedIcon onClick={() => setModeOfShowing('BYGROUP')} sx={{ mr: isMatchedPhone ? 1 : 2, color: ModeOfShowing == 'BYGROUP' ? 'whitesmoke' : 'black', bgcolor: ModeOfShowing == 'BYGROUP' ? 'black' : 'whitesmoke', border: 'solid 1px black', borderRadius: '3px', cursor: 'pointer' }} />
                    <MenuOutlinedIcon onClick={() => setModeOfShowing('BYLINE')} sx={{ mr: isMatchedPhone ? 1 : 2, color: ModeOfShowing == 'BYLINE' ? 'whitesmoke' : 'black', bgcolor: ModeOfShowing == 'BYLINE' ? 'black' : 'whitesmoke', borderRadius: '3px', cursor: 'pointer' }} />
                    <Typography variant={isMatchedPhone ? 'body2' : isMatchedTablette ? 'body1' : 'h6'} color='primary.dark' mr={2}>{countProducts} Products Found</Typography>
                    <span style={{ flexGrow: '1', height: '1px', backgroundColor: 'grey', marginRight: 15 }}></span>
                    <FormControl size='small' sx={{ minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label='Sort By'
                            value={dataToSending.Order}
                        >
                            {
                                OrderBy.map((order, index) => (
                                    <MenuItem key={index} value={order} onClick={() => setDataToSending({ ...dataToSending, Order: order })} sx={{ color: order === dataToSending.Order && 'secondary.main' }}>
                                        {order}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
                {
                    loading && <Box className='loader' margin='100px 45%'></Box>
                }
                {
                    messageError && <Typography variant='h4' color='primary' textAlign='center'>
                        {messageError}
                    </Typography>
                }
                {
                    ModeOfShowing == 'BYGROUP' ?
                        !loading && <Box sx={{ height: height, pr: 1, overflow: 'auto', '&::-webkit-scrollbar': { width: 8 }, '&::-webkit-scrollbar-track': { backgroundColor: '#f5f5f5' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#ab7a5f', borderRadius: 4 } }}>
                            <Grid container columnSpacing={1} rowGap={isMatchedPhone ? 1 : 2} >
                                {
                                    ProductDatabase.filter(Product => {
                                        let condition = false
                                        if (Product.Price <= price) {
                                            condition = true
                                        }
                                        return condition
                                    }).map((Product, index) => (
                                        <Products key={index} product_id={Product._id} name={Product.Product_name} type={Product.Product_type} photo={Product.image} price={Product.Price} height={270} />
                                    ))
                                }
                            </Grid>
                            {
                                (countProducts != 0 && ProductDatabase.length != 0) && <Stack sx={{ mt: 5 }}>
                                    <Pagination
                                        count={Math.ceil(countProducts / 6)}
                                        page={page}
                                        onChange={(e, newPage) => {
                                            if (page != newPage) {
                                                setPage(newPage);
                                            }
                                        }}
                                        color='primary'
                                        sx={{ margin: '0 auto' }}
                                        renderItem={(item) => (
                                            <PaginationItem
                                                component="button"
                                                data-page={item.page}
                                                {...item}
                                            />
                                        )}
                                    />
                                </Stack>
                            }
                        </Box>
                        :
                        <Box sx={{ height: height, pr: 1, overflow: 'auto', '&::-webkit-scrollbar': { width: 8 }, '&::-webkit-scrollbar-track': { backgroundColor: '#f5f5f5' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#ab7a5f', borderRadius: 4 } }}>
                            {
                                !loading &&
                                ProductDatabase.filter(Product => {
                                    let condition = false
                                    if (Product.Price <= price) {
                                        condition = true
                                    }
                                    return condition
                                }).map((Product, index) => (
                                    <ProductsByLine key={index} product_id={Product.Product_ID} name={Product.Product_name} type={Product.Product_type} photo={Product.image} price={Product.Price} description={Product.Description} />
                                ))
                            }
                            {
                                (countProducts != 0 && ProductDatabase.length != 0) && <Stack sx={{ mt: 5 }}>
                                    <Pagination
                                        count={Math.ceil(countProducts / 6)}
                                        page={page}
                                        onChange={(event, newPage) => {
                                            if (page != newPage) {
                                                setPage(newPage);
                                            }
                                        }}
                                        color='primary'
                                        sx={{ margin: '0 auto' }}
                                        renderItem={(item) => (
                                            <PaginationItem
                                                component="button"
                                                data-page={item.page}
                                                {...item}
                                            />
                                        )}
                                    />
                                </Stack>
                            }
                        </Box>
                }
            </Box>
        </Box >

    )
}

export default ProductFiltering