import React, { useState } from 'react'
import { Alert, Box, Button, Container, Divider, TextField, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom'
import { loginApi, registerApi } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state';


type Inputs = {
  login: string,
  pass: string,
};

const schema = yup.object().shape({
  login: yup.string()
    .required('Required.')
    .min(4, 'Min. 4 characters.')
    .max(11, 'Max. 11 characters.'),
  pass: yup.string()
    .required('Required.')
    .min(6, 'Min. 6 characters.')
    .max(20, 'Max. 20 characters.'),
});

export const DynamicSign = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation()
  const [isRegister, setIsRegister] = useState() as any
  const [apiError, setApiError] = useState() as any
  const [apiSuccess, setApiSuccess] = useState() as any


  React.useEffect(() => {
    if (pathname === '/register') {
      setIsRegister(true)
    } else {
      setIsRegister(false)
    }
  }, [pathname])

  const { control, reset, handleSubmit, formState: { errors } } = useForm<Inputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isRegister) {
      try {
        const res = await registerApi(data.login, data.pass)
        console.log(res)
        reset()
        setApiError(null)
        setApiSuccess(res.data.message)
        navigate('/login')
      } catch (err: any) {
        setApiError(err.response.data.msg ?? '')
      }
    } else {
      try {
        console.log('loggin in')
        const res = await loginApi(data.login, data.pass)
        console.log(res)
        dispatch(
          setLogin({
            user: res.data.user,
            token: res.data.token,
          })
        )
        
        navigate('/home')
      } catch (err: any) {
        setApiError(err.response.data.msg ?? '')
      }
    }

  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container sx={{ display: 'flex', flexDirection: 'column', width: '30%', alignItems: 'center', justifyContent: 'center' }} >
        <Typography variant='overline' sx={{ fontSize: '1.5rem' }} >kitq</Typography>
        <Divider sx={{ width: '100%', marginBottom: '1rem' }} />
        <Controller
          name='login'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField {...field}
              placeholder='login'
              variant='outlined'
              error={!!errors.login}
              helperText={errors?.login?.message} />
          )}
        />
        <Controller
          name='pass'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField {...field}
              placeholder='pass'
              type='password'
              variant='outlined'
              error={!!errors.pass}
              helperText={errors?.pass?.message} />
          )}
        />
        <Button variant="text" type='submit' endIcon={<NavigateNextIcon />} sx={{ marginTop: '0.5rem' }}>
          {isRegister ? 'register' : 'login'}
        </Button>
      </Container>
      {
        (apiError) && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
            <Alert sx={{ maxWidth: '75vw' }} severity="error">{apiError}</Alert>
          </Box>
        )
      }
      {
        (apiSuccess) && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
            <Alert sx={{ maxWidth: '75vw' }} severity="success">{apiSuccess}</Alert>
          </Box>
        )
      }
    </form>
  )
}
