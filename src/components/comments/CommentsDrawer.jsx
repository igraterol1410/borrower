import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import Comment from './Comment'

const CommentsDrawer = ({ show, setShow, comments }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [position, setPosition] = useState(false)

    useEffect(() => {
      if(show){
        onOpen()
      }
    },[show])

    const handleClose = () => {
      setShow(false)
      onClose()
    }

  return (
    <Drawer placement={position ? 'right' : 'left'} onClose={handleClose} isOpen={isOpen} size='md'>
        <DrawerOverlay />
        <DrawerContent>            
            <DrawerHeader mt={8}>
              <Flex justifyContent='space-between' direction={position ? 'row-reverse' : 'row'}>
                <Box>Comments</Box>
                <Flex>
                  <Flex 
                  alignItems='center' 
                  justifyContent='center'
                  h='30px'
                  w='30px'
                  borderRadius='50%'
                  bg='#eee'
                  onClick={() => setPosition(!position)}
                  >
                    {
                      position
                      ?
                      <AiOutlineArrowLeft />
                      :
                      <AiOutlineArrowRight />
                    }
                  </Flex>
                  <Box><DrawerCloseButton border='none' /></Box>
                </Flex>
              </Flex>
            </DrawerHeader>
            <DrawerBody px={0}>
              {
                comments && comments.map((comment, index) => (
                  <Comment key={index} comment={comment} />
                ))
              }
            </DrawerBody>
        </DrawerContent>
    </Drawer>
  )
}

export default CommentsDrawer
