import { Flex, Heading, Switch, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const NotificationsSettings = () => {
    const users = [
        {
            template_name:'Email template 1',
            template_description:'Template description 1',
            email_template:'email template 1',
            id:1
        },
        {
            template_name:'Email template 2',
            template_description:'Template description 2',
            email_template:'email template 2',
            id:2
        },
        {
            template_name:'Email template 3',
            template_description:'Template description 3',
            email_template:'email template 3',
            id:3
        },
        {
            template_name:'Email template 4',
            template_description:'Template description 4',
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
            Notification Setting
        </Heading>
        <TableContainer>
        <Table variant='simple'>
            <Thead>
            <Tr>
                <Th textAlign='center' colSpan={4}>Email Notifications Settings</Th>
            </Tr>
            </Thead>
            <Tbody>
                {
                    users && users.map((user, index) => (
                        <Tr 
                        key={index}
                        >
                            <Td textAlign='center'>
                                {user.template_name}
                            </Td>
                            <Td textAlign='center'>
                                {user.template_description}
                            </Td>
                            <Td textAlign='center'>
                                <Switch size='lg' />
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

export default NotificationsSettings
