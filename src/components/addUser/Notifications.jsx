import { Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { motion } from 'framer-motion';
import React from 'react'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BsXCircle } from "react-icons/bs";

const Notifications = () => {
    const users = [
        {
            user_name:'test 1',
            email:'test1@gmail.com',
            email_template:'email template 1',
            id:1
        },
        {
            user_name:'test 2',
            email:'test2@gmail.com',
            email_template:'email template 2',
            id:2
        },
        {
            user_name:'test 3',
            email:'test3@gmail.com',
            email_template:'email template 3',
            id:3
        },
        {
            user_name:'test 4',
            email:'test4@gmail.com',
            email_template:'email template 4',
            id:4
        },
    ]
  return (
    <>
      <Heading 
        fontSize={['1.2rem','1.5rem']}
        as='h3'
        >
            Additionals notifications
        </Heading>
        <TableContainer>
        <Table variant='simple'>
            <Thead>
            <Tr>
                <Th textAlign='center'>Current User</Th>
                <Th textAlign='center'>Map User</Th>
                <Th textAlign='center'>Email Template</Th>
                <Th textAlign='center'>Actions</Th>
            </Tr>
            </Thead>
            <Tbody>
                {
                    users && users.map((user, index) => (
                        <Tr 
                        key={index}
                        >
                            <Td textAlign='center'>
                                {user.user_name}
                            </Td>
                            <Td textAlign='center'>
                                {user.email}
                            </Td>
                            <Td textAlign='center'>
                                {user.email_template}
                            </Td>
                            <Td 
                            w='10%' 
                            textAlign='center'>
                                <Flex
                                as={motion.div}
                                transition='all ease .5s'
                                gap={4}
                                fontSize={['xl']}
                                fontWeight='bold'
                                position='relative'
                                _hover={{
                                    fontSize:'26px'
                                }}
                                >
                                    <BsXCircle />
                                </Flex>
                            </Td>
                        </Tr>
                    ))
                }
            </Tbody>
        </Table>
    </TableContainer>
    </>
  )
}

export default Notifications
