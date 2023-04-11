import { AppBar, Avatar, Box, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { makeStyles, styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import logoshop from '../Assets/logoshop.svg'
import Draw from './Draw';
import user from '../Assets/user.jpg'
function Header({ value, islogin, UserInfos }) {
    const theme = useTheme()
    const navigate = useNavigate()
    const isMatched = useMediaQuery(theme.breakpoints.down('md'))
    //handleLogOut
    const handleLogOut = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('UserInfo')
        navigate('/login')
    }
    const [showLogin, setShowLogin] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false)
    useEffect(() => {
        if (window.location.pathname == '/signup') {
            setShowLogin(true)
        }
        if (window.location.pathname == '/login') {
            setShowSignUp(true)
        }
    }, [])
    return (
        <AppBar sx={{ boxShadow: 'none', position: 'relative' }}>
            <Toolbar sx={{ background: '#fff' }} >
                <img src={logoshop} alt="logoshop" style={{ width: 200, marginRight: '40px' }} />
                {
                    isMatched ? (
                        <Draw />
                    ) : (
                        <>
                            <Tabs sx={{ margin: 'auto' }} value={value} indicatorColor='secondary' >
                                <Tab label='Home' sx={{ fontSize: '1.1em' }} onClick={() => navigate('/')} />
                                <Tab label='About' sx={{ fontSize: '1.1em' }} onClick={() => navigate('/About')} />
                                <Tab label='Products' sx={{ fontSize: '1.1em' }} onClick={() => navigate('/Products')} />
                            </Tabs>
                            {/* <Button variant='contained' color='primary' sx={{ marginLeft: 'auto' }} endIcon={<ShoppingCartOutlinedIcon />}>
                                Cart
                            </Button> */}
                            {
                                !islogin && <>
                                    {
                                        !showSignUp && <Button variant='outlined' sx={{ marginLeft: '15px' }} color='primary' endIcon={<PersonAddAltOutlinedIcon />} onClick={() => navigate('/login')} >
                                            Login
                                        </Button>
                                    }
                                    {
                                        !showLogin && <Button variant='outlined' sx={{ marginLeft: '15px' }} color='primary' endIcon={<PersonAddAltOutlinedIcon />} onClick={() => navigate('/signup')}>
                                            Sign up
                                        </Button>
                                    }
                                </>
                            }

                            {
                                (islogin && UserInfos) && <>
                                    <Typography variant='h6' color='primary.dark'>{UserInfos.Name}</Typography>
                                    <Avatar variant="rounded" src={user} alt='profile_user' sx={{ ml: 1, cursor: 'pointer' }} />

                                    <Button variant='contained' sx={{ marginLeft: '15px', fontWeight: 'bold' }} color='secondary' onClick={handleLogOut}>
                                        logout
                                    </Button>
                                </>
                            }

                        </>
                    )
                }
            </Toolbar>
        </AppBar>
        // <Box sx={{ height: 80, p: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        //     <img src={logoshop} alt="logoshop" style={{ width: 200, marginRight: '40px' }} />
        //     <Root>

        //         <Box display='flex'>
        //             <Item
        //                 title='Home'
        //                 link='/'
        //                 selected={selected}
        //                 setSelected={setSelected}
        //                 theme={theme}
        //             />
        //             <Item
        //                 title='About'
        //                 link='/'
        //                 selected={selected}
        //                 setSelected={setSelected}
        //                 theme={theme}
        //             />
        //             <Item
        //                 title='Products'
        //                 link='/'
        //                 selected={selected}
        //                 setSelected={setSelected}
        //                 theme={theme}
        //             />
        //         </Box>
        //     </Root>
        //     <Root>

        //         <Box display='flex'>
        //             <Link to='/' style={{ textDecoration: 'none', marginRight: '20px' }}>
        //                 <Typography variant='h4' color={theme.palette.primary.dark}>
        //                     Cart {' '}
        //                     <ShoppingCartOutlinedIcon />
        //                 </Typography>
        //             </Link>
        //             <Link to='/' style={{ textDecoration: 'none' }}>
        //                 <Typography variant='h4' color={theme.palette.primary.dark}>
        //                     Login {' '}
        //                     <PersonAddAltOutlinedIcon />
        //                 </Typography>
        //             </Link>

        //         </Box>
        //     </Root>
        // </Box>
    )
}

export default Header