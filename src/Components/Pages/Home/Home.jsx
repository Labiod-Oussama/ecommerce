import React from 'react'
import { Box, Button, Grid, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import Data from "../../Data/Data.json"
import Header from '../../Global/Header';
import home from '../../Assets/home.jpeg'
import worker from '../../Assets/worker.jpeg'
import Products from './Products';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import Footer from '../../Global/Footer';

const Item = ({ photo, title, description }) => {
   return (
      <Grid item sm={6} xs={12} md={5.8} lg={3.8} display="flex" flexDirection='column' alignItems='center' sx={{ bgcolor: 'primary.A400' }} p={4}>
         <Box marginBottom={1} sx={{ width: 60, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', bgcolor: 'secondary.dark' }} >{photo}</Box>
         <Typography marginBottom={3} variant='h4' color='primary.A100'>{title}</Typography>
         <Typography variant='body1' color='primary.A100' textAlign='center'>{description}</Typography>
      </Grid>
   )
}
function Home() {
   const UserInfos = JSON.parse(localStorage.getItem('UserInfo'))??{};
   const getCookie = (name) => {
      const value = "; " + document.cookie;
      const parts = value.split("; " + name + "=");
      if (parts.length === 2) {
         return parts.pop().split(";").shift();
      }
   }
   const token = getCookie("token");
   const theme = useTheme()
   const isMatchedtablette = useMediaQuery(theme.breakpoints.down('lg'))
   const isMatchedphone = useMediaQuery(theme.breakpoints.down('md'))
   return (
      <Box overflow='hidden'>
         <Header value={0} islogin={token ?true:false} UserInfos={UserInfos}/>
         <Box p='0px 0px 20px 30px' display='flex'>
            <Box flex={isMatchedtablette ? '2' : '.9'} display='flex' flexDirection='column' p={isMatchedphone ? 1 : 2} mt={isMatchedtablette ? "50px" : 0} justifyContent='center'>
               <Typography variant='h3' sx={{ fontWeight: 'bold' }} color='primary.dark' gutterBottom >
                  Design Your <br />
                  Comfort Zone
               </Typography>
               <Typography variant='h5' color='primary' gutterBottom sx={{ wordSpacing: '2px', lineHeight: '40px' }}  >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?
               </Typography>
               <Button variant='contained' color='secondary' sx={{ width: 180, height: 50, mt: 2 }}>
                  SHOP NOW
               </Button>
            </Box>
            <Box flex='1.1' display={isMatchedtablette ? 'none' : 'block'} p='20px' textAlign='center' position='relative'>
               <img src={home} style={{ width: '70%', borderRadius: '8px' }} />
               <img src={worker} style={{ position: 'absolute', width: '35%', bottom: -50, left: '0%', borderRadius: '8px' }} />
            </Box>
         </Box>
         <Box bgcolor={theme.palette.secondary.light} p='50px' textAlign='center'>
            <Typography variant={isMatchedphone ? 'h4' : 'h2'} color='primary.dark' gutterBottom mt={3}>
               Featured Products
            </Typography>
            <Grid container spacing={2} mt={3}>
               {
                  Data.filter(Product => Product.Featured).map(Product => (
                     <Products name={Product.Product_name} type={Product.Product_type} photo={Product.image} price={Product.Price} height={350} />
                  ))
               }
            </Grid>
            <Button variant='contained' color='secondary' style={{ marginTop: '50px' }}>
               ALL PRODUCTS
            </Button>
         </Box>
         <Box bgcolor='secondary.dark' p='90px 60px 50px '>
            <Box display='flex' flexDirection={isMatchedphone ? 'column' : 'row'} mb='100px'>
               <Typography variant='h4' flex={1} fontWeight='bold' color='primary.A100' mb={isMatchedphone ? '40px' : '0'}>
                  Custom Furniture <br />
                  Built Only For You
               </Typography>
               <Typography variant='h6' fontWeight='lighter' flex={1} color='primary.A200'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorum debitis consectetur reprehenderit non aliquam voluptates dolore aut vero consequuntur.
               </Typography>
            </Box>
            <Grid container gap={3} >
               <Item
                  photo={<ExploreOutlinedIcon />}
                  title='Mission'
                  description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi'
               />
               <Item
                  photo={<DiamondOutlinedIcon />}
                  title='Vision'
                  description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi'
               />
               <Item
                  photo={<FeedOutlinedIcon />}
                  title='History'
                  description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi'
               />
            </Grid>
         </Box>
         <Box p='15% 30px'>
            <Box display='flex' flexDirection={isMatchedphone ? 'column' : 'row'}>
               <Box flex={isMatchedphone ? 1 : 1.1}>
                  <Typography variant='h4' color='primary.dark' mb={5} letterSpacing={isMatchedphone ? 0 : 3}>
                     Join our newsletter and get 20% off
                  </Typography>
                  <Typography variant='body1' color='primary' width='82%'>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sint unde quaerat ratione soluta veniam provident adipisci cumque eveniet tempore?
                  </Typography>
               </Box>
               <Box height='56px' display='flex' mt={isMatchedphone ? '50px' : '75px'} flex={.9}>
                  <TextField placeholder='Enter Email' variant='outlined' style={{ width: '80%' }} />
                  <Button variant='outlined' color='secondary' type='submit' style={{ height: '56px' }}>Subscribe</Button>
               </Box>
            </Box>
         </Box>
         <Footer />
      </Box>
   )
}

export default Home