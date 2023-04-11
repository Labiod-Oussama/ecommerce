import { Box, createStyles, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import Header from '../../Global/Header'
import Nav from '../../Global/Nav'
import home from '../../Assets/home.jpeg'
import { makeStyles } from '@material-ui/core'
import cx from "classnames";
import styles from './About.module.css'
import Footer from '../../Global/Footer'
function About() {
  const UserInfos = JSON.parse(localStorage.getItem('UserInfo'))??{};
  const getCookie = (name) => {
     const value = "; " + document.cookie;
     const parts = value.split("; " + name + "=");
     if (parts.length === 2) {
        return parts.pop().split(";").shift();
     }
  }
  const token = getCookie("token");
  const theme=useTheme()
  const isMatchedtablette = useMediaQuery(theme.breakpoints.down('lg'))
  const isMatchedphone = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box>
         <Header value={1} islogin={token ?true:false} UserInfos={UserInfos}/>
      <Nav page='About' />
      <Box p={isMatchedphone?'50px 20px':'100px 50px'} display='flex' flexWrap='wrap'>
        <Box width={isMatchedtablette?'100%':'44%'}>
          <img src={home} alt="home" width='100%' height='550px' style={{borderRadius:'8px'}}/>
        </Box>
        <Box width={isMatchedtablette?'100%':'46%'} m={isMatchedtablette?'50px 0':' 0 50px'} > 
          <Typography  className={cx(styles.ttt)} variant='h3' sx={{ fontWeight: 'bold' }} color='primary.dark' gutterBottom >
            Our Story
          </Typography>
          <Typography variant='h6' color='primary'  style={{lineHeight:'45px',marginTop:'40px'}} >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat accusantium sapiente tempora sed dolore esse deserunt eaque excepturi, delectus error accusamus vel eligendi, omnis beatae. Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque dolore, obcaecati incidunt sequi blanditiis est exercitationem molestiae delectus saepe odio eligendi modi porro eaque in libero minus unde sapiente consectetur architecto. Ullam rerum, nemo iste ex, eaque perspiciatis nisi, eum totam velit saepe sed quos similique amet. Ex, voluptate accusamus nesciunt totam vitae esse iste.
          </Typography>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default About