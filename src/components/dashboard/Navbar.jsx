import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import './styles/navbar.css'

// Images
import Logo from '../../assets/icons/ibankey-logo-2.svg'
import { Box, Center, Divider, Flex, Image, Text } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from '@chakra-ui/react'
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'
import { logoutUser } from '../../store/slices/user/userSlices';
import Welcome from './Welcome';
import { RxGear } from "react-icons/rx";
import { FiLogOut, FiUserPlus } from "react-icons/fi";
import { BsBell } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { ADMIN_LIST } from '@/functions/adminList';
import Adduser from '@/pages/AddUser/Adduser';
import Notifications from '../notifications/Notifications';

const Navbar = () => {
  const dispatch = useDispatch()
  const { logout } = useAuth0();
  const { user } = useSelector( state => state?.user )
  const navigate = useNavigate()
  const [showAddUser, setShowAddUser] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLogOut = () => {
    localStorage.removeItem('user')
    dispatch(logoutUser())
    logout()
    // window.location.href = "https://ibankey.co.in/"
  }
  return (
    <Flex 
    py={3} 
    px={1} 
    alignItems='center' 
    gap={2} 
    justifyContent='space-between'
    boxShadow={['0px 4px 4px rgba(0, 0, 0, 0.1)','0px 4px 4px rgba(0, 0, 0, 0.1)','0px 4px 4px rgba(0, 0, 0, 0.1)','0px 4px 4px rgba(0, 0, 0, 0.1)']}
    zIndex={1000}
    borderBottom='1px solid #F0F1F5'
    position='relative'
    bg='white'
    >
      {
        user?.adminUserEmail && user?.adminUserEmail !== null &&
        <>
          <Flex
          position='absolute'
          h={0}
          w={0}
          transform='rotate(180deg)'
          borderLeft='64px solid #086CE7'
          borderTop = '64px solid transparent'
          borderRight='64px solid transparent'
          top={0}
          right={0}
          color='white'
          alignItems='center'
          justifyContent='center'
          />
          <Box 
          color='white'
          position='absolute'
          top='0'
          right='10px'
          fontSize='32px'
          >*</Box>
        </>
      }
      <Flex alignItems='center' gap={5} pl={[4,6]}>
        <Link style={{textDecoration:'none'}} to='/landing'>
          <Image src={Logo} alt="Logo IBankey" w={['40%','50%']} h='80%' />
        </Link>
      </Flex>
      {
        user?.adminUserEmail && user?.adminUserEmail !== null &&
        <Flex color='red' fontSize='sm'><Text fontWeight='bold'>Impersonated: </Text> {` ${user.adminUserEmail}`}</Flex>
      }
      <Flex>
          <Flex gap={4} alignItems='center'>
            <Welcome />
            <Image src={user?.picture} w='40px' h='40px' borderRadius={50} display={['none','none','block','block']} />
            <Menu zIndex={100}>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<ChevronDownIcon />}
                bg='transparent'
                border='none'
                padding={0}
                display={['none','none', 'initial','initial']}
              />
              <MenuList zIndex={100} boxShadow='1px 1px 4px rgba(0, 0, 0, 0.25)' borderRadius='13px' >
                <MenuItem 
                border='none'>
                  <Flex alignItems='center' gap={4}>
                    <Box color='#086CE7' fontSize='1.2rem'><AiOutlineUser /></Box>
                    Profile</Flex>
                </MenuItem>
                <MenuItem 
                border='none'
                onClick={() => setShowNotifications(true)}>
                  <Flex alignItems='center' gap={4}>
                    <Box color='#086CE7' fontSize='1.2rem'><BsBell /></Box>
                    Notifications</Flex>
                </MenuItem>
                <MenuItem 
                border='none'
                onClick={() => setShowAddUser(true)}
                // onClick={() => navigate('/add-user')}
                >
                  <Flex alignItems='center' gap={4}>
                    <Box color='#086CE7' fontSize='1.2rem'><FiUserPlus /></Box>
                    Add Users</Flex>
                </MenuItem>
                <MenuItem 
                border='none'>
                  <Flex alignItems='center' gap={4}>
                    <Box color='#086CE7' fontSize='1.2rem' fontWeight='bold'><RxGear /></Box>
                    Settings</Flex>
                </MenuItem>
                <MenuItem 
                border='none'
                borderTop='1px solid #D7D7D7' 
                onClick={() => handleLogOut()}>
                  <Flex 
                  alignItems='center' 
                  color='#2855E1'
                  gap={4}>
                    <Box color='red' fontSize='1.2rem'><FiLogOut /></Box>
                    Logout</Flex>
                </MenuItem>
                {
                  ADMIN_LIST.filter((email) => (email === user?.email)).length !== 0 &&
                  <MenuItem 
                  border='none'
                  borderTop='1px solid #D7D7D7'
                  onClick={() => navigate('/admin')}>
                    <Flex 
                    alignItems='center'
                    gap={4}
                    color='#086CE7'
                    >
                      <Box fontSize='1.2rem'><GrUserAdmin /></Box>
                      Admin</Flex>
                  </MenuItem>
                }
                <Divider color='#eee' />
                <Center
                fontSize='.9rem'
                color='#999'
                >
                  {user?.email}
                </Center>
              </MenuList>
            </Menu>
            <Menu zIndex={100}>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                bg='transparent'
                border='none'
                padding={0}
                display={['initial','initial', 'none','none']}
              />
              <MenuList zIndex={100} boxShadow='1px 1px 4px rgba(0, 0, 0, 0.25)' borderRadius='13px' >
                <MenuItem 
                border='none'>
                  <Flex alignItems='center' gap={4}>
                    <Box color='#086CE7' fontSize='1.2rem'><AiOutlineUser /></Box>
                    Profile</Flex>
                </MenuItem>
                <MenuItem 
                border='none'
                onClick={() => setShowNotifications(true)}>
                  <Flex alignItems='center' gap={4}>
                    <Box color='#086CE7' fontSize='1.2rem'><BsBell /></Box>
                    Notifications</Flex>
                </MenuItem>
                <MenuItem 
                border='none'
                onClick={() => setShowAddUser(true)}
                // onClick={() => navigate('/add-user')}
                >
                  <Flex alignItems='center' gap={4}>
                    <Box color='#086CE7' fontSize='1.2rem'><FiUserPlus /></Box>
                    Add Users</Flex>
                </MenuItem>
                <MenuItem 
                border='none'>
                  <Flex alignItems='center' gap={4}>
                    <Box color='#086CE7' fontSize='1.2rem' fontWeight='bold'><RxGear /></Box>
                    Settings</Flex>
                </MenuItem>
                <MenuItem 
                border='none'
                borderTop='1px solid #D7D7D7' 
                onClick={() => handleLogOut()}>
                  <Flex 
                  alignItems='center' 
                  color='#2855E1'
                  gap={4}>
                    <Box color='red' fontSize='1.2rem'><FiLogOut /></Box>
                    Logout</Flex>
                </MenuItem>
                {
                  ADMIN_LIST.filter((email) => (email === user?.email)).length !== 0 &&
                  <MenuItem 
                  border='none'
                  borderTop='1px solid #D7D7D7'
                  onClick={() => navigate('/admin')}>
                    <Flex 
                    alignItems='center'
                    gap={4}
                    color='#086CE7'
                    >
                      <Box fontSize='1.2rem'><GrUserAdmin /></Box>
                      Admin</Flex>
                  </MenuItem>
                }
                <Divider color='#eee' />
                <Center
                fontSize='.9rem'
                color='#999'
                >
                  {user?.email}
                </Center>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        <Adduser showPopup={showAddUser} hiddePopup={setShowAddUser} />
        <Notifications showPopup={showNotifications} hiddePopup={setShowNotifications} />
    </Flex>
  )
}

export default Navbar
