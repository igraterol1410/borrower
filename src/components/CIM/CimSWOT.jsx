import { Box, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

const CimSWOT = ({swot}) => {
  return (
    <Grid 
    templateColumns={['1fr','1fr 1fr']} 
    gap={6}
    bg='#F1F3FE' 
    alignContent='center'
    p={4}
    fontSize={14}
    borderRadius={20}
    maxW='85vw'
    >
        <GridItem>
            <Box
            w={['100px','180px']}
            h={['100px','180px']}
            borderRadius='50%'
            bgGradient='linear(to-br, #355ADA, #496EEF, #00ECAE)'
            m='auto'
            p={8}
            fontSize={50}
            fontWeight='bold'
            textAlign='center'
            color='white'
            display='grid'
            alignContent='center'
            >S</Box>
            <Box fontWeight='bold' fontSize={20} textAlign='center' py={6}>Strength</Box>
            <Box>{swot ? swot[0]?.strength : ''}</Box>
        </GridItem>
        <GridItem>
        <Box
            w={['100px','180px']}
            h={['100px','180px']}
            borderRadius='50%'
            bgGradient='linear(to-br, #355ADA, #496EEF, #00ECAE)'
            m='auto'
            p={8}
            fontSize={50}
            fontWeight='bold'
            textAlign='center'
            color='white'
            display='grid'
            alignContent='center'
            >O</Box>
            <Box fontWeight='bold' fontSize={20} textAlign='center' py={6}>Opportunity</Box>
            <Box>{swot ? swot[0]?.opportunity : ''}</Box>
        </GridItem>
    </Grid>
  )
}

export default CimSWOT
