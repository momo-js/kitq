import { Divider, Typography, Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Typography variant='h3'>404</Typography>
            <Divider sx={{}} />
            <Button onClick={()=>{navigate('/')}} >Go Back</Button>
        </Box>
    )
}

export default NotFound