import React from 'react'
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';

const WelcomeLAnding = () => {
  const { user } = useSelector( state => state?.user )
  return (
    <Box p={6} fontWeight='600' fontSize='1.25rem'>
      <h2>Welcome {user?.nickname}</h2>
    </Box>
  )
}

export default WelcomeLAnding