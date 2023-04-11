import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../../Global/Header'

function Login() {
    const theme=useTheme()
    const [Email,setEmail]=useState('')
    const [Password,setPassword]=useState('')
    const[emptyEmail,setEmptyEmail]=useState(false)
    const[emptyPassword,setEmptyPassword]=useState(false)
   const handleLogin=()=>{
       if (!Email) {
           setEmptyEmail(true)
       }
       if (!Password) {
         setEmptyPassword(true)
       }
       if (Email && Password) {
          setEmptyEmail(false)
          setEmptyPassword(false)
          fetch('http://localhost:3001/login',{
            method:'post',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                Email,
                Password
            })
          }).then(res=>res.json())
            .then(data=>console.log(data))
       }
   }
  useEffect(()=>{
      if (Email) {
         setEmptyEmail(false)
      }
      if(Password){
        setEmptyPassword(false)
      }
  },[Email,Password])
    return (
        <Box>
            <Header />
            <Box p='50px 20px' sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <Box sx={{ width: '40%',display:'flex',flexDirection:'column' }}>
                    <Typography variant='h4' style={{ color: theme.palette.secondary.main, marginBottom: '40px' }}>Login</Typography>
                    <TextField
                        name='Email'
                        label='Email'
                        type="text"
                        variant="outlined"
                        value={Email}
                        onChange={(e)=>setEmail(e.target.value)}
                        error={emptyEmail}
                        style={{ marginBottom: '15px' }}
                    />
                    <TextField
                        name='Password'
                        label='Password'
                        type="text"
                        variant="outlined"
                        value={Password}
                        onChange={(e)=>setPassword(e.target.value)}
                        error={emptyPassword}
                        style={{ marginBottom: '15px' }}
                    />
                    <Button variant='contained' color='primary' onClick={handleLogin}>Login</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Login