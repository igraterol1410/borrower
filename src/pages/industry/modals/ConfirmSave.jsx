import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { BiErrorCircle } from "react-icons/bi";

const ConfirmSave = ({ show, setShow, savePreferences }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (show) {
      onOpen()
    }
  }, [show])

  const confirmSave = () => {
    savePreferences()
    setShow()
    onClose()
  }

  const cancel = () => {
    setShow(false)
    onClose()
  }

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={12}>
        <ModalHeader bg='#0078FF' borderRadius='12px 12px 0 0'>
          <ModalCloseButton onClick={cancel} border='none' color='white' />
          <Center data-aos='fade-right' fontSize='7xl' color='white'>
            <BiErrorCircle />
          </Center>
        </ModalHeader>
        <ModalBody w='100%'>
          <Box>
            <Center w='full' mb={4}>
              <Heading as='h3' fontSize='xl' textAlign='center' fontWeight='normal'>Please verify the Industry/Subindustry once you move to other page, you will not be able to change it</Heading>
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
            //   bg='primary'
              colorScheme='blue'
              border='none' 
              _hover={{
                background:'#000072'
              }}
              onClick={confirmSave}
            >
              Confirm
            </Button>
          </Flex>
        </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConfirmSave