import { Container, Typography, Divider, Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Welcome = () => {
  return (
    <>
      <Container sx={{ display: 'flex', flexDirection: 'column', width: '45vw', alignItems: 'center', justifyContent: 'center' }} >
        <Typography variant='overline' sx={{ fontSize: '1.5rem' }} >welcome to kitq!</Typography>
        <Divider sx={{ width: '100%', marginBottom: '0.2rem' }} />
        <Typography variant='overline' sx={{ fontSize: '0.8rem', textAlign: 'center' }} >You need to be registered to use this site.</Typography>
      </Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '15%', margin: '2rem auto' }}>
        <Button size='small' href='/register'>REGISTER</Button>
        <Divider orientation="vertical" flexItem />
        <Button size='small' href='/login'>LOGIN</Button>
      </Box>
    </>
  )
}

export default Welcome