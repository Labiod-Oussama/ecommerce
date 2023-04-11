import { Box, FormControl, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useReducer } from 'react'
import { useState, useContext } from 'react'
import { ProductData } from '../../../App'
import Products from '../Home/Products'
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ProductsByLine from '../Home/ProductsByLine'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useEffect } from 'react'
function ProductFiltering() {
    const [CatChoose, setCatChoose] = useState('All')
    const Category = [
        'All', 'Office', 'Living Room', 'Kitchen', 'Bedroom', 'Dining', 'Kids'
    ]
    const Colors = ['red', 'green', 'blue', 'black', 'yellow']
    const Company = ['All', 'marcos', 'liddy', 'ikea', 'caressa']
    const OrderBy = ['Price (Lowest)', 'Price (Highest)', 'Name (A-Z)', 'Name (Z-A)']
    const ProductsData = useContext(ProductData)
    const aa = [];
    ProductsData.map(ele => aa.push(ele.Price))
    const bb = aa.reduce((a, b) => { return Math.max(a, b) })
    const [priceMax, setPriceMax] = useState(bb)
    const [Search, setSearch] = useState('')
    const [nbrProductsFound, setNbrProductsFound] = useState(ProductsData.length)
    const [ModeOfShowing, setModeOfShowing] = useState('BYGROUP')
    const [typeOfProduct, setTypeOfProduct] = useState('All')
    const [typeOfCompany, setTypeOfCompany] = useState('All')
    const [typeOfColor, setTypeOfColor] = useState('All')
    const [PossibiliteOfShipping, setPossibiliteOfShipping] = useState(false);
    const [Order, setOrder] = useState('')
    const [ProductsDataClonning,setProductsDataClonning]=useState(ProductsData)
    let tempArray =[...ProductsData]
    function comparePrice( a, b ) {
        if ( a.Price < b.Price ){
          return -1;
        }
        if ( a.Price > b.Price ){
          return 1;
        }
        return 0;
      }
      function compareName(a,b) {
        if ( a.Product_name < b.Product_name ){
            return -1;
          }
          if ( a.Product_name > b.Product_name ){
            return 1;
          }
          return 0;
      }
     useEffect(()=>{
        if (Order=='Price (Lowest)') {
            setProductsDataClonning(tempArray.sort(comparePrice))
        }
        if(Order=='Price (Highest)') {
            setProductsDataClonning(tempArray.sort(comparePrice).reverse())
        }
        if (Order=='Name (Z-A)') {
            setProductsDataClonning(tempArray.sort(compareName))
        }
        if (Order=='Name (A-Z)') {
            setProductsDataClonning(tempArray.sort(compareName).reverse())
        }
    },[Order])
    return (
        <Box width='100%' display='flex'>

            <Box flex={0.4}>
                <TextField
                    onChange={(e) => setSearch(e.target.value)}
                    value={Search}
                    label='Search'
                    variant='outlined'
                    sx={{ bgcolor: 'primary.grey', borderRadius: '8px', mb: 3 }}
                    size='small'
                />
                <Box>
                    <Typography variant='h5' color='primary.dark' mb={1}>Category</Typography>
                    <Box display='flex' flexDirection='column' mb={3}>
                        {
                            Category.map(cat => (
                                <Link underline='hover' mb={1} onClick={() => { setCatChoose(cat); setTypeOfProduct(cat) }} style={{ cursor: 'pointer', textDecoration: CatChoose == cat ? 'underline' : 'none' }}>{cat}</Link>
                            ))
                        }
                    </Box>
                    <Typography variant='h5' color='primary.dark' mb={1}>Company</Typography>
                    <FormControl size='small' sx={{ minWidth: 120, mb: 3 }}>
                        <InputLabel id="demo-simple-select-label">Company</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label='Company'
                        >
                            {
                                Company.map(com => (
                                    <MenuItem value={com} onClick={() => setTypeOfCompany(com)}>{com}</MenuItem>

                                ))
                            }
                        </Select>
                    </FormControl>
                    <Typography variant='h5' color='primary.dark' mb={1}>Colors</Typography>
                    <Box display='flex' alignItems='center' mb={4} >
                        <Link onClick={() => setTypeOfColor('All')} underline={typeOfColor == 'All' ? 'always' : 'none'} sx={{ cursor: 'pointer' }}>All</Link>
                        {
                            Colors.map(col => (
                                <Box onClick={() => setTypeOfColor(col)} style={{ width: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', borderRadius: '50%', backgroundColor: col, marginLeft: 8, cursor: 'pointer', opacity: typeOfColor == col ? 1 : 0.3 }}>{typeOfColor == col ? <CheckOutlinedIcon sx={{ transform: 'scale(0.6)' }} /> : null}</Box>
                            ))
                        }
                    </Box>
                    <Typography variant='h5' color='primary.dark' mb={1}>Price</Typography>
                    <Box mb={4}>
                        <Typography variant='body1'>${priceMax}</Typography>
                        <input type='range' min={0} max={bb} value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
                    </Box>
                    Free Shipping {''}<input type='checkbox' onChange={() => setPossibiliteOfShipping(!PossibiliteOfShipping)} style={{ marginLeft: '10px', transform: 'scale(1.1)' }} />
                </Box>
            </Box>
            <Box flex={1.6}>
                <Box display='flex' alignItems='center' mb={2}>
                    <WidgetsOutlinedIcon onClick={() => setModeOfShowing('BYGROUP')} sx={{ mr: 2, color: ModeOfShowing == 'BYGROUP' ? 'whitesmoke' : 'black', bgcolor: ModeOfShowing == 'BYGROUP' ? 'black' : 'whitesmoke', border: 'solid 1px black', borderRadius: '3px', cursor: 'pointer' }} />
                    <MenuOutlinedIcon onClick={() => setModeOfShowing('BYLINE')} sx={{ mr: 2, color: ModeOfShowing == 'BYLINE' ? 'whitesmoke' : 'black', bgcolor: ModeOfShowing == 'BYLINE' ? 'black' : 'whitesmoke', borderRadius: '3px', cursor: 'pointer' }} />
                    <Typography variant='h6' color='primary.dark' mr={2}>{nbrProductsFound} Products Found</Typography>
                    <span style={{ flexGrow: '1', height: '1px', backgroundColor: 'grey', marginRight: 15 }}></span>
                    <FormControl size='small' sx={{ minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label='Sort By'>
                            {
                                OrderBy.map(order => (
                                    <MenuItem value={order} onClick={()=>setOrder(order)}>{order}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
                {
                    ModeOfShowing == 'BYGROUP' ?
                        <Grid container spacing={2}>
                            {
                                ProductsDataClonning.filter(Product => {
                                    let condition = false
                                    let reg = new RegExp(Search.toLowerCase(), "g");
                                    if (Product.Product_type == typeOfProduct || typeOfProduct == 'All') {
                                        if (Product.Brand == typeOfCompany || typeOfCompany == 'All') {
                                            if (Product.Color.some((e) => e == typeOfColor) || typeOfColor == 'All') {
                                                if (Product.Price <= priceMax) {
                                                    if (Product.Shipping != PossibiliteOfShipping) {
                                                        if (Product.Product_name.toLowerCase().match(reg)) {
                                                            condition = true

                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    return condition
                                }).map(Product => (
                                    <Products product_id={Product.Product_ID}  name={Product.Product_name} type={Product.Product_type} photo={Product.image} price={Product.Price} height={270} />
                                ))
                            }
                        </Grid> :
                        ProductsDataClonning.filter(Product => {
                            let condition = false
                            let reg = new RegExp(Search.toLowerCase(), "g");

                            if (Product.Product_type == typeOfProduct || typeOfProduct == 'All') {
                                if (Product.Brand == typeOfCompany || typeOfCompany == 'All') {
                                    if (Product.Color.some((e) => e == typeOfColor) || typeOfColor == 'All') {
                                        if (Product.Price <= priceMax) {
                                            if (Product.Shipping != PossibiliteOfShipping) {
                                                if (Product.Product_name.toLowerCase().match(reg)) {
                                                    condition = true

                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            return condition
                        }).map(Product => (
                            <ProductsByLine product_id={Product.Product_ID} name={Product.Product_name} type={Product.Product_type} photo={Product.image} price={Product.Price} description={Product.Description} />
                        ))
                }
            </Box>
        </Box>

    )
}

export default ProductFiltering