import React from 'react'
import { Box, Divider, Heading, Text } from '@chakra-ui/react'

const SectionTitle = ({title, text}) => {
  return (
    <Box
    fontFamily='inherit'
    >
        <Heading
        as='h3' 
        size='md'
        fontWeight='600'
        mb={3}
        >
            {title}
        </Heading>
        <Text 
        fontSize='xs'
        color='#666666'
        >
            {text}
        </Text>
        <Divider borderColor='#EBEBEB' />
    </Box>
  )
}

export default SectionTitle
