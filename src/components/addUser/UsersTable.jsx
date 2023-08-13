import { SearchIcon } from '@chakra-ui/icons';
import { Badge, Box, Button, Divider, Flex, Heading, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiFillEdit, AiFillDelete, AiOutlineMore } from "react-icons/ai";
import ButtonsBox from '../dashboard/ButtonsBox';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUsersByUsers } from '@/store/slices/user/userSlices';

const UsersTable = () => {
    const { user, companies, users: reduxUsers, userLoading } = useSelector( state => state?.user )
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getCurrentUsersByUsers({userId: user.userId}))
    // }, [])

    const [currentUsers, setCurrentUsers] = useState(null)
    const [value, setValue] = useState('')

    useEffect(() => {
        if(reduxUsers){
            setCurrentUsers(reduxUsers)
        }
    }, [reduxUsers])

    const searhUsers = () => {
        const foundedUsers = reduxUsers.filter((eachUser) => (eachUser.user_name.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
        setCurrentUsers(foundedUsers)
    }
    const handleChange = (e) => {
        setValue(e)
        if(!e){
            setCurrentUsers(reduxUsers)
        }
    }
  return (
    <>
    {
        userLoading &&
        <Spinner
        thickness='6px'
        speed='1.2s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        position='absolute'
        top='50%'
        left='50%'
        />
    }
        <InputGroup>
          <Input placeholder='search the user' 
          borderColor='gray.300'
          size='sm'
          py={0}
          bg='white'
          borderRadius={12}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
          <InputRightElement zIndex={1} w='20%' maxH='70%' mt='5px' mr='5px' mb='5px' fontSize='xs' children={<Button onClick={searhUsers} color='gray.500' w='100%' border='none' maxH='100%' m='auto'>Search</Button>} />
        </InputGroup>
        <Flex
        alignItems='center'
        gap={2}  
        p={6}      
        >
            <Heading fontSize='5xl' as='h3' color='#086CE7'>{reduxUsers.length}</Heading>
            <Text color='#aaa' fontSize='sm'>users created by you</Text>
        </Flex>
        <Divider color='#aaa' />
        <Box 
        mt={4}
        mb={2}
        fontWeight='600'
        color='#aaa'
        >
            Members
        </Box>
        <Flex 
        gap={4} 
        direction='column'
        >
            {
                currentUsers && currentUsers.map((user,index) => (
                    <Flex
                    key={index}
                    alignItems='center'
                    gap={4}
                    bg='#eee'
                    shadow='md'
                    p={4}
                    rounded='xl'
                    as={motion.div}
                    transition='all ease .5s'
                    _hover={{
                        scale:1.15
                    }} 
                    >
                        <Box
                        as={motion.div}
                        transition='all ease .5s'
                        _hover={{
                            bg:'#eff'
                        }} 
                        fontSize='xl'                        
                        borderRadius='20px'
                        >
                            <Menu>
                            <MenuButton 
                            border='none'
                            bg='transparent'
                            fontSize='xl'
                            >
                                <AiOutlineMore />
                            </MenuButton>
                            <MenuList
                            border='none'
                            shadow='xl'
                            >
                                <MenuItem
                                border='none'
                                >
                                    Edit
                                </MenuItem>
                                <MenuItem
                                border='none'
                                >
                                    Delete
                                </MenuItem>
                            </MenuList>
                            </Menu>
                        </Box>
                        <Box>
                            <Text mb={0} fontWeight='600'>{user.family_name}</Text>
                            <Text bg='#bee3f8' fontSize='sm' px={2} colorScheme='blue' fontWeight='light' borderRadius={50}>{user.email}</Text>
                        </Box>
                    </Flex>
                ))
            }
        </Flex>
    </>
  )
}

export default UsersTable
