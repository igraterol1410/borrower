import Notifications from '@/components/addUser/Notifications'
import NotificationsSettings from '@/components/addUser/NotificationsSettings'
import UserForm from '@/components/addUser/UserForm'
import UsersTable from '@/components/addUser/UsersTable'
import Navbar from '@/components/dashboard/Navbar'
import { getCurrentCompanyId, getCurrentUsersByUsers } from '@/store/slices/user/userSlices'
import { 
  Box, 
  Button, 
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  Flex,
  ModalFooter,
  Tab, 
  TabList, 
  TabPanel, 
  TabPanels, 
  Tabs, 
  useDisclosure
 } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineExpandAlt, AiOutlineShrink } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux'
const Adduser = ({ showPopup, hiddePopup }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useSelector( state => state?.user )
  const [modalSize, setModalSize] = useState('xl')
  const [modalSizeAction, setModalSizeAction] = useState(<AiOutlineExpandAlt />)
  const dispatch = useDispatch()

  useEffect(() => {
    if(showPopup){
      onOpen()
      dispatch(getCurrentCompanyId({userId:user.userId}))
      dispatch(getCurrentUsersByUsers({userId: user.userId}))
    }
  }, [showPopup])

  const closePopup = () => {
    hiddePopup()
    onClose()
  }

  const changeSize = () => {
    if(modalSize === 'full'){
      setModalSize('xl')
      setModalSizeAction(<AiOutlineExpandAlt />)
    }else{
      setModalSize('full')
      setModalSizeAction(<AiOutlineShrink />)
    }
  }

  return (
    <Drawer
      // isCentered
      onClose={closePopup}
      isOpen={isOpen}
      size={modalSize}
      scrollBehavior='inside'
      placement='right'
    >
      <DrawerOverlay 
      bg='blackAlpha.500'
      backdropFilter='blur(5px) hue-rotate(15deg)'
      />
      <DrawerContent
      position='relative'
      >
        <Flex>
          <Flex 
          alignItems='center'
          justifyContent='center'
          position='absolute'
          h='30px'
          w='30px' 
          top='10px' 
          right='60px' 
          zIndex={4} 
          onClick={() => changeSize()}
          borderRadius='50%'
          _hover={{
            background:'gray.100'
          }}
          >
            {modalSizeAction}
          </Flex>
          <DrawerCloseButton zIndex={4} border='none' borderRadius='50%' />
        </Flex>
          <DrawerBody
          mt='2rem'
          css={{
            '&::-webkit-scrollbar': {
              width: '4px'
            },
            '&::-webkit-scrollbar-track': {
              width: '6px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray',
              borderRadius: '24px'
            }
          }}
          >
          <DrawerHeader>
          </DrawerHeader>
            <Tabs>
              <TabList
              bg='white'
              borderRadius='20px 20px 0 0'
              position='absolute'
              top='0'
              left='0'
              w='100%'
              px='1rem'
              pt='1rem'
              zIndex={3}
              borderBottom='none'
              shadow='md'
              >
                <Tab
                borderLeft='none'
                borderTop='none'
                borderRight='none'>Add user</Tab>
                <Tab
                borderLeft='none'
                borderTop='none'
                borderRight='none'>All users</Tab>
              </TabList>
              <TabPanels position='relative'>
                <TabPanel>
                  <UserForm action={closePopup} />
                  {/* <Notifications />
                  <NotificationsSettings /> */}
                </TabPanel>
                <TabPanel>
                  <UsersTable />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
          <ModalFooter mt={4}></ModalFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default Adduser
