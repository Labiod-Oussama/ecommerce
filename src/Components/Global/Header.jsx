import { AppBar, Avatar, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from 'react'
import { InfoGlobal, dataCarts } from '../../App';
import logoshop from '../Assets/logoshop.svg'
import Draw from './Draw';
import user from '../Assets/user.jpg';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));
function Header({ value, islogin }) {
    const { infos: { UserInfos, token }, setInfos } = useContext(InfoGlobal);
    const { getCarts } = useContext(dataCarts);
    const [nbrOfCarts, setNbrOfCart] = useState(0)
    const theme = useTheme()
    const navigate = useNavigate()
    const isMatched = useMediaQuery(theme.breakpoints.down('md'))
    //handleLogOut
    const handleLogOut = () => {
        setInfos({})
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('UserInfo')
        localStorage.removeItem('SearchProduct')
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
    //handling the nbr of carts
    useEffect(()=>{
       const gettingNbrOfCarts=async()=>{
        const response=await getCarts(UserInfos._id);
        setNbrOfCart(response[0]?.products?.length);
        console.log('ok');
       }
       gettingNbrOfCarts();
    })
    return (
        <AppBar sx={{ position: 'relative' }}>
            <Toolbar sx={{ background: '#fff' }}  >
                <img src={logoshop} alt="logoshop" onClick={() => navigate('/')} style={{ width: 200, cursor: 'pointer', marginRight: '40px' }} />
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
                                    <IconButton onClick={() => navigate('/my-Cart')} sx={{ ml: 1 }}>
                                        <StyledBadge badgeContent={nbrOfCarts} color="primary" showZero>
                                            <ShoppingCartIcon color='primary' />
                                        </StyledBadge>
                                    </IconButton>
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