import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

const PreferencesSecundaryTitle = ({title}) => {
  return (
    <Box
    py={5}
    borderBottom='1px solid #EBEBEB'
    mb={2}
    >
      <Heading 
      as='h3'
      fontSize='15px'
      lineHeight='18px'
      fontWeight='500'
      fontFamily='Inter'
      >
        {title}
        </Heading> 
    </Box>
  )
}

export default PreferencesSecundaryTitle
