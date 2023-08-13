import React from 'react'
import './styles/welcome.css'
import { useSelector } from 'react-redux';
import { Box, Text } from '@chakra-ui/react';

const Welcome = () => {
  const { user } = useSelector( state => state?.user )
  return (
    // <div className='welcome-section'>
    //   <h2>Welcome {user?.nickname || user?.email}</h2>
    //   <p>Your journey begins here.</p>
    // </div>
    <Box 
    m={0}
    color='#086CE7'
    >
      <Text fontWeight='bold' m={0} display='inline-block'>Welcome,</Text> {user?.nickname || user?.email}
    </Box>
  )
}

export default Welcome
