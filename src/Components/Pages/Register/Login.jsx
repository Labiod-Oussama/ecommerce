import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Global/Header'
import { useNavigate } from 'react-router-dom'
import { InfoGlobal } from '../../../App';

function Login() {
    const { infos, setInfos } = useContext(InfoGlobal);
    const theme = useTheme()
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [emptyEmail, setEmptyEmail] = useState(false)
    const [emptyPassword, setEmptyPassword] = useState(false)
    const [errorLogin, setErrorLogin] = useState('')
    const navigate = useNavigate();
    const SearchProduct = JSON.parse(localStorage.getItem('SearchProduct')) ?? '';
    const handleLogin = () => {
        if (!Email) {
            setEmptyEmail(true)
        }
        if (!Password) {
            setEmptyPassword(true)
        }
        if (Email && Password) {
            setEmptyEmail(false)
            setEmptyPassword(false)
            setErrorLogin('')
            fetch('http://localhost:3001/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Email,
                    Password
                })
            }).then(res => {
                if (!res.ok) {
                    return res.json().then(errorResp => {
                        throw new Error(errorResp.error);
                    })
                }
                return res.json();
            }
            )
                .then(data => data.success && (SearchProduct ? (document.cookie = `token=${data.token}; expires=Tue, 19 Jan 2038 03:14:07 UTC; path=/`, localStorage.setItem('UserInfo', JSON.stringify(data.user)), setInfos({ token: data.token, UserInfos: JSON.parse(localStorage.getItem('UserInfo')) }), navigate(`/Products/${SearchProduct}`)) : (navigate('/'), document.cookie = `token=${data.token}; expires=Tue, 19 Jan 2038 03:14:07 UTC; path=/`, localStorage.setItem('UserInfo', JSON.stringify(data.user)), setInfos({ token: data.token, UserInfos: JSON.parse(localStorage.getItem('UserInfo')) }))))
                .catch(error => { setErrorLogin(error.message); console.log(error.message) })
        }
    }
    useEffect(() => {
        if (Email) {
            setEmptyEmail(false)
        }
        if (Password) {
            setEmptyPassword(false)
        }
    }, [Email, Password])
    return (
        <Box>
            <Header />
            <Box p='50px 20px' sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <Box sx={{ width: { xs: '80%', md: '50%', lg: '40%' }, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h4' style={{ color: theme.palette.secondary.main, marginBottom: '40px' }}>Login</Typography>
                    <TextField
                        name='Email'
                        label='Email'
                        type="text"
                        variant="outlined"
                        value={Email}
                        onChange={(e) => { setEmail(e.target.value); setErrorLogin('') }}
                        error={emptyEmail || errorLogin.includes('email')}
                        helperText={errorLogin.includes('email') && errorLogin}
                        style={{ marginBottom: '15px' }}
                    />
                    <TextField
                        name='Password'
                        label='Password'
                        type="text"
                        variant="outlined"
                        value={Password}
                        onChange={(e) => { setPassword(e.target.value); setErrorLogin('') }}
                        error={emptyPassword || errorLogin.includes('password')}
                        helperText={errorLogin.includes('password') && errorLogin}
                        style={{ marginBottom: '15px' }}
                    />
                    <Button variant='contained' color='primary' onClick={handleLogin}>Login</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Login