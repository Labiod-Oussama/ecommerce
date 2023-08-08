import { TextField, Typography } from '@material-ui/core'
import { Box, Button, useTheme } from '@mui/material'
import { ErrorMessage, Field, Form, Formik, formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import Header from '../../Global/Header'
import { useNavigate } from 'react-router-dom';
import { InfoGlobal } from '../../../App';

function SignUp() {
    const { infos, setInfos } = useContext(InfoGlobal);
    const theme = useTheme();
    const navigate = useNavigate();
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const initialValues = {
        Name: '',
        Email: '',
        Password: ''
    }
    const SignSchema = Yup.object().shape({
        Name: Yup.string()
            .min(2, 'Name is too short')
            .required('Name is required'),

        Email: Yup.string()
            .email('Invalid Email')
            .required('Email is required'),
        Password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .required('Password is required')
    })
    return (
        <Box>
            <Header />
            <Box p='50px 20px' sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <Box sx={{ width: '40%' }}>
                    <Typography variant='h4' style={{ color: theme.palette.secondary.main, marginBottom: '40px' }}>Sign up</Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={SignSchema}
                        onSubmit={(values, action) => {
                            action.setSubmitting(false)
                            fetch(`http://localhost:3001/signup`,
                                {
                                    method: 'post',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        Name: values.Name,
                                        Email: values.Email,
                                        Password: values.Password,
                                    })
                                }
                            ).then(res => res.json())
                                .then(data => data.success && (navigate('/'), document.cookie = `token=${data.token}; expires=Tue, 19 Jan 2038 03:14:07 UTC; path=/`, localStorage.setItem('UserInfo', JSON.stringify(data.user)), setInfos({ token: data.token, UserInfos: JSON.parse(localStorage.getItem('UserInfo')) })))
                                .catch(er => console.log(er))
                        }}
                    >
                        {
                            ({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
                                <Form style={{ display: 'flex', flexDirection: 'column' }}>
                                    <TextField
                                        name='Name'
                                        label='Name'
                                        type="text"
                                        variant="outlined"
                                        value={values.Name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={<ErrorMessage name="Name" />}
                                        error={(touched.Name && errors.Name)}
                                        style={{ marginBottom: '15px' }}
                                    />
                                    <TextField
                                        name='Email'
                                        label='Email'
                                        type="text"
                                        variant="outlined"
                                        value={values.Email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={<ErrorMessage name="Email" />}
                                        error={(touched.Email && errors.Email)}
                                        style={{ marginBottom: '15px' }}
                                    />
                                    <TextField
                                        name='Password'
                                        label='Password'
                                        type="text"
                                        variant="outlined"
                                        value={values.Password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={<ErrorMessage name="Password" />}
                                        error={(touched.Password && errors.Password)}
                                        style={{ marginBottom: '15px' }}
                                    />
                                    <Button type="submit" variant='contained' color='primary' disabled={isSubmitting}>
                                        Sign up
                                    </Button>
                                </Form>
                            )
                        }
                    </Formik>
                </Box>
            </Box>
        </Box>
    )
}

export default SignUp