import { Avatar, Box, Button, Typography } from '@mui/material'
import React, { useContext, useReducer, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { serverAddress } from '../../Global/Config';
import { InfoGlobal } from '../../../App';
export const OneCart = ({ productId, name, quantity, price, image, color, setCarts, setLoadAmount }) => {
    const { infos: { UserInfos, token }, setInfos } = useContext(InfoGlobal);
    const [Quantity, setQuantity] = useState(quantity)
    // const initialAmount = Quantity;
    const reducer = (state, action) => {
        switch (action) {
            case '+':
                return state + 1;
            case '-':
                return state - 1;
            default:
                return;
        }
    }
    const [amount, dispatch] = useReducer(reducer, Quantity);
    const handleRemove = () => {
        fetch(`${serverAddress}/deleteCart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: UserInfos._id,
                productId,
                color
            })
        }).then(res => res.json())
            .then(data => setCarts(data[0]))
            .catch(err => console.log(err))
    }
    const handleLoadIncrement = () => {
        setLoadAmount(true)
        fetch(`${serverAddress}/Cart`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                userId: UserInfos._id,
                productId,
                quantitiy: 1,
                color
            })
        }).then(res=>res.json())
            .then(data => { console.log(data)})
            .then(setTimeout(() => {
                setLoadAmount(false)
            }, 2000)
            )
            .catch(err => console.log(err))
    }
    const handleLoadDecrement = () => {
        setLoadAmount(true)
        fetch(`${serverAddress}/Cart`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                userId: UserInfos._id,
                productId,
                quantitiy: -1,
                color
            })
        }).then(res=>res.json())
            .then(data => { console.log(data)})
            .then(setTimeout(() => {
                setLoadAmount(false)
            }, 2000)
            )
            .catch(err => console.log(err))
    }

    return (
        <Box sx={{ display: 'flex', p: '15px 15px 15px 0', borderBottom: 'solid 1px grey' }}>
            <Box display='flex' flex={1} alignItems='center'>
                <Avatar variant="rounded" src={image} alt='profile_user' sx={{ width: '80px', height: '80px', mr: 2 }} />
                <Typography variant='h6' color='primary.text'>
                    {name}
                </Typography>
            </Box>
            <Box display='flex' flex={1} alignItems='center' justifyContent='center' >
                <Button variant='contained' color='primary' disabled={amount == 1} onClick={() => { dispatch('-') ;handleLoadDecrement()}} sx={{ mr: 1.5 }}>
                    -
                </Button>
                <Typography variant='h5' color='primary' sx={{ mr: 1.5 }}>{amount}</Typography>
                <Button variant='contained' color='primary' disabled={amount == 3} onClick={() => {dispatch('+');handleLoadIncrement()}} >
                    +
                </Button>
            </Box>
            <Box display='flex' flex={1} alignItems='center' justifyContent='flex-end'>
                <span style={{ backgroundColor: color, width: '30px', height: '30px', borderRadius: '50%', marginRight: '30px' }}></span>
                <Typography variant='h6' color='secondary' mr={3}>
                    ${(price * amount).toFixed(2)}
                </Typography>
                <ClearIcon
                    onClick={handleRemove}
                    sx={{ bgcolor: 'primary.main', color: 'whitesmoke', cursor: 'pointer' }}
                />
            </Box>
        </Box>
    )
}
