import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
// import WarningIcon from '@/assets/icons/warning.svg'
import { BiErrorCircle } from "react-icons/bi";

const WarningModal = ({ show, setShow, action, label, confirmButton }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    useEffect(() => {
      if (show) {
        onOpen()
      }
    }, [show])
  
    const confirmSave = () => {
      action(document)
      cancel()
    }
  
    const cancel = () => {
      setShow(false)
      onClose()
    }
  
    return (
      <>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={cancel} isCentered>
          <ModalOverlay />
          <ModalContent 
          borderRadius={12}
          color='#2D3748'>
            <ModalHeader bg='red.400' borderRadius='12px 12px 0 0'>
              <ModalCloseButton onClick={cancel} border='none' color='white' />
              <Center data-aos='fade-right' fontSize='7xl' color='white'>
                <BiErrorCircle />
              </Center>
            </ModalHeader>
            <ModalBody w='100%'>
              <Box>
                <Center w='full' mb={4}>
                  <Heading 
                  as='h3' 
                  fontSize='2xl' 
                  textAlign='center' 
                  fontWeight='bold'>Are you sure?</Heading>
                </Center>
                <Center w='full' mb={4}>
                  <Heading as='h3' fontSize='xl' textAlign='center' fontWeight='normal'>{label}</Heading>
                </Center>
              </Box>
              <Flex
                mt={4}
                gap={4}
              >
                <Button
                  variant='outline'
                  borderRadius={8}
                  py={5}
                  w='100%'
                  onClick={cancel}
                  mb={2}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  //   border='1px solid #1C397E'
                  borderRadius={8}
                  py={5}
                  w='100%'
                  border='none' 
                  // _hover={{
                  //   background:'#000072'
                  // }}
                  //   bg='primary'
                  colorScheme='red'
                  onClick={confirmSave}
                >
                  {confirmButton || 'Leave'}
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default WarningModal
