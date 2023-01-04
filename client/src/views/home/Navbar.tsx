import React, { useState } from 'react'
import { Box, Button, Icon, IconButton, Typography } from '@mui/material'
import { Container } from '@mui/system'
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AddBoxIcon from '@mui/icons-material/AddBox';
import NiceModal from '@ebay/nice-modal-react';
import createPostModal from './createPostModal';
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { setLogout } from '../../state';
import PetsIcon from '@mui/icons-material/Pets';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

type NavbarProps = {
  handleFetchAll: () => void,
  handleFetchHot: () => void
}

const Navbar = ({ handleFetchAll, handleFetchHot }: NavbarProps) => {
  const { login } = useSelector((state: any) => state.user);
  const dispatch = useDispatch()
  const [isHot, setIsHot] = useState(false)

  const handleHotClick = () => {
    handleFetchHot()
    setIsHot(true)
  }

  const handleAllClick = () => {
    handleFetchAll()
    setIsHot(false)
  }



  return (
    <Container sx={{ border: '1px solid pink', borderTop: '0', marginBottom: '2rem', boxShadow: '0 0 30px 2px black', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', position: 'static' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Button variant={isHot ? 'contained' : 'outlined'} startIcon={<WhatshotIcon />} sx={{ marginRight: '1rem' }} onClick={handleHotClick}>
            Hot
          </Button>
          <Button variant={isHot ? 'outlined' : 'contained'} endIcon={<AllInclusiveIcon />} onClick={handleAllClick}>
            All
          </Button>
        </Box>
        <Box>
          <PetsIcon color='primary' sx={{ marginLeft: '3.5rem', marginRight: '1rem', top: '2px', position: 'relative' }} />
          <Typography variant='overline' sx={{ fontSize: '1.5rem' }} >kitq</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="text" endIcon={<AddBoxIcon />} sx={{ marginRight: '1rem' }}
            onClick={() => {
              NiceModal.show(createPostModal, {
                // action: 'edit',
              })
            }}
          >add post</Button>
          <Typography variant='overline' sx={{ fontSize: '0.6rem', color: 'grey' }} >logged in as</Typography>
          <Typography variant='overline' sx={{ fontSize: '0.8rem', color: 'pink', marginLeft: '0.2rem' }} >{login}</Typography>
          <IconButton color='primary' onClick={() => {
            dispatch(setLogout())
          }}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>
    </Container>
  )
}

export default Navbar