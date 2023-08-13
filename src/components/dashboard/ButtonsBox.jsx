import { Button, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'

const ButtonsBox = ({primaryLabel, secundaryLabel, isLoading, confirmAction, cancelAction, disabledConditions, position}) => {
  return (
    <Flex mt={4} gap={4} justifyContent={position && 'flex-end'}>
        <Button 
        as={motion.div}
        transition='all ease .7s'
        type='submit'
        border='none' 
        w={['50%','50%','20%','20%']}
        bg='#086CE7'
        _hover={{
          background:'#000072'
        }}
        color='#fff'        
        fontWeight='500'
        onClick={!disabledConditions && confirmAction}
        disabled={disabledConditions}
        isLoading={isLoading}
        >
          {primaryLabel}
        </Button>
        <Button 
        transition='all ease .7s'
        onClick={cancelAction}
        border='1px solid gray' 
        w={['50%','50%','20%','20%']}
        bg='#fff'      
        fontWeight='500'
        >
          {secundaryLabel || 'Cancel'}
        </Button>
    </Flex>
  )
}

export default ButtonsBox
