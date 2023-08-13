import { excludeNotifications, getNotifications } from '@/services/notifications';
import { getCurrentNotifications } from '@/store/slices/notifications/notificationsSlices';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  Flex,
  ModalFooter,
  useDisclosure,
  Heading,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Text,
  Switch,
  FormControl,
  FormLabel,
  SimpleGrid,
  Divider
 } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineExpandAlt, AiOutlineShrink } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import NotificationCard from './NotificationCard';
import { motion } from 'framer-motion';
const Notifications = ({ showPopup, hiddePopup }) => {
const { user } = useSelector( state => state?.user )
const { notificationsInfo } = useSelector( state => state?.notification )
const { isOpen, onOpen, onClose } = useDisclosure()
const dispatch = useDispatch()
const [modalSize, setModalSize] = useState('xl')
const [modalSizeAction, setModalSizeAction] = useState(<AiOutlineExpandAlt />)
const [value, setValue] = useState('')
const [notifications, setNotifications] = useState(null)
const [payload, setPayload] = useState([])
const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    if(showPopup){
      onOpen()
    }
  }, [showPopup])

  useEffect(() => {
    if(user?.userId){
        dispatch(getCurrentNotifications({userId:user?.userId}))
    }
  }, [user])

  useEffect(() => {
    if(notificationsInfo){
        setNotifications(notificationsInfo)
        const disablesNot = notificationsInfo.filter((eachNot) => eachNot.isExcluded === true)
        if(disablesNot && disablesNot.length > 0){
            const firstPayload = []
            disablesNot.forEach(element => {
                firstPayload.push(element.notificationTemplateId)
            });
            setPayload(firstPayload)
        }
    }
  }, [notificationsInfo])

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

  const handleChange = () => {
    const foundedNot = notificationsInfo.filter((eachNotification) => (eachNotification.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
    setNotifications(foundedNot)
}

const handleChangeValue = (e) => {
    setValue(e)
    if(!e){
        setNotifications(notificationsInfo)
    }
}

const handleSave = () => {
    setIsloading(true)
    excludeNotifications(user.userId, payload).then((res) => {
        dispatch(getCurrentNotifications({userId:user?.userId}))
        setIsloading(false)
    })
}

  return (
    <Drawer
      // isCentered
      onClose={closePopup}
      isOpen={isOpen}
      size={modalSize}
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
          <DrawerHeader p={6}>
            <Flex gap={4}>
                <Box w='50%'>
                    <Heading
                    fontWeight='600'
                    fontSize='2xl'
                    >
                        Notifications Settings
                    </Heading>
                    <Box
                    fontWeight='light'
                    fontSize='sm'
                    color='#aaa'
                    >
                    Select the type of notification you get about your activities and deals
                    </Box>
                </Box>
                <InputGroup w='50%' mt={2}>
                    <Input placeholder='Search notifications' 
                    borderColor='gray.300'
                    size='lg'
                    py={0}
                    bg='white'
                    borderRadius={12}
                    value={value}
                    onChange={(e) => handleChangeValue(e.target.value)}
                    //   disabled={loadedIndustry} 
                    />
                    <InputRightElement zIndex={1} w='20%' maxH='70%' mt='5px' mr='5px' mb='5px' fontSize='xs' children={<Button onClick={handleChange} color='gray.500' w='100%' border='none' maxH='100%' m='auto'>Search</Button>} />
                </InputGroup>
            </Flex>
          </DrawerHeader>
          <Divider color='#aaa' />
          <Flex
          alignItems='center'
          justifyContent='space-between'
          gap={4}
          mt='6rem'
          px={6}
          >
            <Box
            w='50%'
            p={4}
            >
                <Text
                fontWeight='bold'
                >
                    Email Notification
                </Text>
                <Text
                fontSize='sm'
                color='#777'
                >
                    Get emails to find out about latest updates on your deals and activities.
                </Text>
            </Box>
            <Box
            w='50%'
            >
                {
                    notifications && notifications.map((notification, index) => (
                        <NotificationCard
                        key={notification.notificationTemplateId}
                        notification={notification}
                        payload={payload}
                        setPayload={setPayload}
                        />
                    ))
                }
            </Box>
          </Flex>
            <Flex mt={4} gap={4} justifyContent='flex-end'>
                <Button 
                type='submit'
                as={motion.button}
                transition='all ease .7s'
                border='none' 
                w={['50%','50%','20%','20%']}
                bg='#086CE7'
                _hover={{
                background:'#000072'
                }}
                color='#fff'        
                fontWeight='500'
                onClick={handleSave}
                // disabled={!values.firstName || !values.lastName || !values.phoneNumber || !values.email}
                isLoading={isLoading}
                >
                    Save
                </Button>
                <Button 
                transition='all ease .7s'
                onClick={closePopup}
                border='1px solid gray' 
                w={['50%','50%','20%','20%']}
                bg='#fff'      
                fontWeight='500'
                >
                    Cancel
                </Button>
            </Flex>
          </DrawerBody>
          <ModalFooter mt={4}>
          </ModalFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default Notifications