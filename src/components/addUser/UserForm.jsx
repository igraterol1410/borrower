import { Badge, Box, Button, Center, Checkbox, Divider, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, Heading, Input, InputGroup, InputRightAddon, InputRightElement, Select, Switch, Table, TableContainer, Tbody, Td, Text, Tooltip, Tr, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
// import { AiFillEdit, AiFillDelete } from "react-icons/ai";
// import { BsFill1SquareFill } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
// import { BsFillSendFill } from "react-icons/bs";
// import { BsSendFill } from "react-icons/bs";

import ButtonsBox from '../dashboard/ButtonsBox';
import { motion } from 'framer-motion';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Deal from './Deal';
import { addCurrentUser } from '@/store/slices/user/userSlices';
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";


const UserForm = ({ action }) => {
    const { user, users, companies, userLoading } = useSelector( state => state?.user )
    const dispatch = useDispatch()
    const toast = useToast()
    const nullId = import.meta.env.VITE_NULL_ID
    const [mainChek, setMainChek] = useState(false)
    const [enabledNotifications, setEnabledNotifications] = useState(false)
    const [selectType, setSelectType] = useState('CC')
    const dealsOptions = [
        {
            option:'All Deals',
            description:'All the deals assigned to you will be assigned to this new user',
            borderRadius: '20px 0 0 20px',
            mappedDeals:true
        },
        {
            option:'Custom Deals',
            description:'Choose from all the available deals which you want to be assigned to this new user',
            border:true,
            borderRadius: 'none',
            mappedDeals:false
        },
        {
            option:'No Deals',
            description:'No deals will be assigned to this new user, the user can browse and choose their own deals',
            borderRadius: '0 20px 20px 0',
            mappedDeals:false
        }
    ]

    const [selectedDealOption, setSelectedDealOption] = useState(dealsOptions[2])
    const [selectedDeals, setSelectedDeals] = useState([])
    const [value, setValue] = useState('')
    const [currentUsers, setCurrentUsers] = useState(null)

    useEffect(() => {
        if(companies){
            setCurrentUsers(companies)
        }
    }, [companies])

    useEffect(() => {
        if(companies && (selectedDeals.length === (companies.length - 1))){
            setMainChek(true)
        }else{
            setMainChek(false)
        }
    }, [selectedDeals])

    const changeDealOption = (option) => {
        setSelectedDealOption(option)
    }

    const searhUsers = () => {
        const foundedUsers = companies.filter((eachUser) => (eachUser.companyName.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
        setCurrentUsers(foundedUsers)
    }
    const handleChange = (e) => {
        setValue(e)
        if(!e){
            setCurrentUsers(companies)
        }
    }

    const createUser = (values) =>{
        const payload = {
            userid: user.userId,
            email: `${values.email}@${user.email.split('@')[1]}`,
            loginType: "borrower",
            firstName: values.firstName.trimStart(),
            lastName: values.lastName.trimStart(),
            phone_number: values.phoneNumber,
            isNotificationEnabled: enabledNotifications,
            sendType: selectType,
            isMapAllDeals: selectedDealOption.mappedDeals,
            mppedDeals: selectedDeals
        }
        // console.log(payload)
        dispatch(addCurrentUser(payload)).then((res) => {
            if(!res.payload){
                toast({
                  title: res.payload?.message || 'Error creating user, please verify and try again',
                  status: 'error',
                  duration: 3000,
                  position: 'top'
                })
            }else{
                toast({
                    title: 'New user created successfully',
                    status: 'success',
                    duration: 3000,
                    position: 'top'
                })
                action()
            }
        })
    } 

    const selectAllDeals = () => {
        const currentCompanies = companies.filter((eachCompany) => (eachCompany.industryID !== nullId))
        if(mainChek){
            setSelectedDeals([])
            setMainChek(false)
        }else{
            const currentDeals = []
            currentCompanies.forEach(company => {
                currentDeals.push(company.userCompanyID)
            });
            setSelectedDeals(currentDeals)
            setMainChek(true)
        }
    }

    const getRepeatedEmail = (email) => {
        const currentCreatedUsers = users.filter((eachUser) => (eachUser.email.split('@')[0].toLocaleLowerCase() === email.toLocaleLowerCase()))
        return currentCreatedUsers.length > 0
    }
    
  return (
    <>
        <Formik
        initialValues={{
            firstName: "",
            lastName: "",
            phoneNumber:"",
            email: "",
            notifications: false
        }}
        validate={(values) => {
            const errors = {}
            const regexOnlyNumbers = /^\d+$/
            if(values.firstName && values.firstName.includes(' ')){
                if(values.firstName.split('').filter((eachChar) => eachChar !== ' ').length > 50){
                    errors.firstName = '50 characters max'                    
                } else if(values.firstName.split('').filter((eachChar) => eachChar !== ' ').length === 0){
                    errors.firstName = 'Type the first name'                    
                }
            } else if(values.firstName && values.firstName.length > 50){
                errors.firstName = '50 characters max'                    
            }

            if(values.lastName && values.lastName.includes(' ')){
                if(values.lastName.split('').filter((eachChar) => eachChar !== ' ').length > 50){
                    errors.lastName = '50 characters max'                    
                } else if(values.lastName.split('').filter((eachChar) => eachChar !== ' ').length === 0){
                    errors.lastName = 'Type the last name'                    
                }
            } else if(values.lastName && values.lastName.length > 50){
                errors.lastName = '50 characters max'                    
            }

            if(values.phoneNumber && values.phoneNumber.includes('+')){
                if(!values.phoneNumber.includes('+91')){
                    errors.phoneNumber = 'Invalid code area'
                } else if(values.phoneNumber.includes('+91-')){
                    if(!regexOnlyNumbers.test(values.phoneNumber.split('+91-')[1])){
                        errors.phoneNumber = 'Invalid character'
                    } else if(values.phoneNumber.split('+91-')[1].length > 10){
                        errors.phoneNumber = 'Long number'
                    } else if(values.phoneNumber.split('+91-')[1].length < 10){
                        errors.phoneNumber = 'Short number'
                    }
                } else if(!regexOnlyNumbers.test(values.phoneNumber.split('+91')[1])){
                    errors.phoneNumber = 'Invalid character'
                } else if(values.phoneNumber.split('+91')[1].length > 10){
                    errors.phoneNumber = 'Long number'
                } else if(values.phoneNumber.split('+91')[1].length < 10){
                    errors.phoneNumber = 'Short number'
                }
            } else if(values.phoneNumber && !regexOnlyNumbers.test(values.phoneNumber)){
                errors.phoneNumber = 'Invalid character'
            } else if(values.phoneNumber.split('0') && values.phoneNumber.split('0')[0] == 0){
                if(values.phoneNumber.split('').length > 11){
                    errors.phoneNumber = 'Long number'
                }
                if(values.phoneNumber.split('').length < 11){
                    errors.phoneNumber = 'Short number'
                }
            } else if(values.phoneNumber.length > 10){
                errors.phoneNumber = 'Long number'
            } else if(values.phoneNumber.length < 10){
                errors.phoneNumber = 'Short number'
            } else {
                errors.phoneNumber = ''
            }

            if(values.email && values.email.split('@') && values.email.split('@').length > 1){
                errors.email = 'Email address domain should be same for all users'
            } else if(values.email.length > 50) {
                errors.email= 'Long email'
            } else if(getRepeatedEmail(values.email)){
                errors.email = 'Email already used by another user'
            } else {
                errors.email = null
            }
            return errors
        }}
        onSubmit={(values) =>{createUser(values)}}
        >
            {({ values, handleSubmit, errors, touched }) => (
                <Form>
                <Box w={['80%']}>
                    <VStack spacing={4} align="flex-start">
                        <Flex w='100%' direction={['column','row']} gap={[4,12]}>
                            <FormControl>
                            <FormLabel htmlFor="firstName">First name</FormLabel>
                            <Field
                                as={Input}
                                id="firstName"
                                placeholder='First name'
                                name="firstName"
                                type="text"
                                variant="filled"
                                required
                                />
                            {
                                errors.firstName && touched.firstName && 
                                (
                                    <FormHelperText color='red'>{errors.firstName}</FormHelperText>
                                )
                            }
                            </FormControl>
                            <FormControl>
                            <FormLabel htmlFor="lastName">Last name</FormLabel>
                            <Field
                                as={Input}
                                id="lastName"
                                name="lastName"
                                placeholder='Last name'
                                type="text"
                                variant="filled"
                                required
                                />
                            {
                                errors.lastName && touched.lastName && 
                                (
                                    <FormHelperText color='red'>{errors.lastName}</FormHelperText>
                                )
                            }
                            </FormControl>
                        </Flex>
                        <FormControl>
                            <FormLabel htmlFor="email">Email Address</FormLabel>
                            <InputGroup>
                                <Field
                                    as={Input}
                                    id="email"
                                    name="email"
                                    placeholder='Email'
                                    type="text"
                                    variant="filled"
                                    required
                                    />
                                <InputRightElement w={['40%','30%']} children={`@${user.email.split('@')[1]}`} />
                                {
                                values.email && !errors.email && touched.email &&
                                <InputRightElement children={<Box color='green' fontSize='xl'><BsFillCheckCircleFill /></Box>} />
                            }
                                {
                                values.email && errors.email && touched.email &&
                                <InputRightElement children={<Box color='red' fontSize='xl'><AiFillCloseCircle /></Box>} />
                            }
                            </InputGroup>
                            {errors.email && touched.email && (
                            <FormHelperText color='red'>{errors.email}</FormHelperText>
                        )}
                        </FormControl>
                        <FormControl>
                        <FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
                        <InputGroup>
                            <Field
                                as={Input}
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder='Phone number'
                                type="tel"
                                variant="filled"
                                required
                            />
                            {
                                values.phoneNumber && !errors.phoneNumber && touched.phoneNumber &&
                                <InputRightElement children={<Box color='green' fontSize='xl'><BsFillCheckCircleFill /></Box>} />
                            }
                            {
                                values.phoneNumber && errors.phoneNumber && touched.phoneNumber &&
                                <InputRightElement children={<Box color='red' fontSize='xl'><AiFillCloseCircle /></Box>} />
                            }
                        </InputGroup>
                        {errors.phoneNumber && touched.phoneNumber && (
                            <FormHelperText color='red'>{errors.phoneNumber}</FormHelperText>
                        )}
                        </FormControl>
                    </VStack>
                </Box>
            <Divider color='#aaa' />
            <Center>
                <Box
                w='80%'
                mt={6}
                >
                    <Flex
                    display='inline-flex'
                    alignItems='center'
                    p={6}
                    gap={6}
                    border='1px solid #eee'
                    borderRadius='20px'
                    >
                        <Badge
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        fontSize='2rem'
                        h={['40px','60px']}
                        w={['40px','60px']}
                        borderRadius={['20px','30px']}
                        colorScheme='blue'
                        >
                            <AiOutlineSend />
                        </Badge>
                        <Box 
                        textAlign='left'
                        w='60%'
                        >
                            <Box fontWeight='bold'>Enable Notifications</Box>
                            <Box 
                            color='#888'
                            fontWeight='light'
                            fontSize={['.7rem','.9rem']}
                            >Choose wheater you should be notified or not for any deal updates and deal actions by this user</Box>
                            <Box>
                            <Select 
                            size='sm' 
                            mt={4} 
                            shadow='lg' 
                            placeholder='Select type' 
                            border='gray' 
                            color='gray'
                            display={enabledNotifications ? 'block' : 'none'}
                            // disabled={!enabledNotifications}
                            onChange={(e) => setSelectType(e.target.value)}
                            >
                                <option style={{color:'gray'}} value='To'>To</option>
                                <option style={{color:'gray'}} value='CC'>CC</option>
                                <option style={{color:'gray'}} value='BCC'>BCC</option>
                            </Select>
                            </Box>
                        </Box>
                        <Box>
                            <Field 
                            as={Switch}
                            size='lg'
                            name='notifications'
                            id='notifications'
                            isChecked={enabledNotifications}
                            onChange={() => setEnabledNotifications(!enabledNotifications)}
                            />
                        </Box>
                    </Flex>
                </Box>
            </Center>

            <Grid
            mt={6}
            templateColumns='1fr 1fr 1fr'
            border='1px solid #086CE7'
            borderRadius='20px'
            alignItems='center'
            >
                {
                    dealsOptions.map((dealOption, index) => (
                        <GridItem
                        key={index}
                        p={4}
                        borderRadius={dealOption.borderRadius}
                        borderRight={dealOption.border &&  '1px solid #086CE7'}
                        borderLeft={dealOption.border &&  '1px solid #086CE7'}
                        textAlign='center'
                        cursor='pointer'
                        bg={selectedDealOption.option === dealOption.option && '#086CE7'}
                        color={selectedDealOption.option === dealOption.option && 'white'}
                        onClick={() => changeDealOption(dealOption)}
                        h='100%'
                        >
                            <Box>{dealOption.option}</Box>
                            <Box 
                            color={selectedDealOption.option === dealOption.option ? 'white' : '#888'}
                            fontWeight='light'
                            fontSize={['.7rem','.9rem']}
                            >
                                {dealOption.description}
                            </Box>
                        </GridItem>
                    ))
                }
            </Grid>

            {
                selectedDealOption && selectedDealOption.option === dealsOptions[1].option &&
                    <InputGroup mt={2}>
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
            }
            {
                selectedDealOption && selectedDealOption.option === dealsOptions[1].option && companies &&
                <Flex
                p={6}
                mb={2}
                mt={2}
                justifyContent='space-between'
                alignItems='center'
                border={mainChek && '1px solid #086CE7'}
                borderRadius='20px'
                shadow='xl'
                onClick={selectAllDeals}
                >
                    <Box textAlign='center'>
                        <Text fontWeight={500}>All available deals</Text>
                    </Box>
                    <Flex gap={4}>
                        <Text fontWeight={500}>Select all</Text>
                        <Checkbox 
                        onChange={selectAllDeals}
                        border='1px solid #eee' 
                        colorScheme='blue' 
                        isChecked={mainChek}
                        />
                    </Flex>
                </Flex>
            }
            {
                selectedDealOption && selectedDealOption.option === dealsOptions[1].option && companies && currentUsers.map((company,index) => (
                    <Deal 
                    key={company.userCompanyID} 
                    company={company} 
                    index={index}
                    selectedDeals={selectedDeals}
                    setSelectedDeals={setSelectedDeals}
                    />
                ))
            }
            <Flex mt={4} gap={4} justifyContent='flex-end'>
                <Button 
                type='submit'
                transition='all ease .7s'
                border='none' 
                w={['50%','50%','20%','20%']}
                bg='#086CE7'
                _hover={{
                background:'#000072'
                }}
                color='#fff'        
                fontWeight='500'
                onClick={()=>createUser(values)}
                disabled={errors.email || errors.firstName || errors.lastName || errors.phoneNumber || !values.firstName || !values.lastName || !values.phoneNumber || !values.email}
                isLoading={userLoading}
                >
                    Save
                </Button>
                <Button 
                transition='all ease .7s'
                onClick={action}
                border='1px solid gray' 
                w={['50%','50%','20%','20%']}
                bg='#fff'      
                fontWeight='500'
                >
                    Cancel
                </Button>
            </Flex>
            </Form>
        )}
        </Formik>
    </>
  )
}

export default UserForm
