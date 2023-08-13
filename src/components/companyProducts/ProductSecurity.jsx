import { Box, Flex, Grid, GridItem, Input, InputGroup, Menu, MenuButton, MenuItem, MenuList, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProductSecurityType from './ProductSecurityType'
import { RxTextAlignCenter } from "react-icons/rx";
import { getSecurityItems } from '@/services/security';
import { useSelector } from 'react-redux';

const ProductSecurity = ({ loanSubtypeSecurity, setItemChange, setSecurityData, securityData, loanTypeID }) => {
    const [securityHeaders, setSecurityHeaders] = useState(null)
    const { securityItems } = useSelector( state => state?.companyProducts )
    const [itemChecked, setIitemChecked] = useState(false)
    const securityItemType = {
        checkbox: 'checkbox',
        select: 'select',
        range: 'range',
        radio: 'radio',
        number: 'number',
        textBox: 'text'
    }

    const headersIds = {
        mortgage: '1c5a8baa-99be-42e5-9cd6-9b64e1a8c284'
    }

    const values = (headerId) => {
        if(headerId === headersIds.mortgage){
            return [
                {
                    id:'',
                    itemLabel: '',
                    value:'',
                    type: ''
                },
                {
                    id:'',
                    itemLabel: '',
                    value:'',
                    type: ''
                },
                {
                    id:'',
                    itemLabel: '',
                    value:'',
                    type: ''
                }
            ]
        }
        else {
            return [
                {
                    id:'',
                    itemLabel: '',
                    value:''
                }
            ]
        }
    }

    // const getTemplate = () => {
    //     const postTemplate = securityItems.map((header) => (
    //         {
    //             titleId: header.headerId,
    //             title: header.companySecurityName,
    //             value: values(header)
    //         }
    //     ))
    //     setSecurityData(postTemplate)
    // }

    useEffect(() => {
        // if(securityItems){
        //     setSecurityHeaders(securityItems)
        //     getTemplate()
        // }
        getSecurityItems().then(({ data }) => {
            setSecurityHeaders(data)
            const postTemplate = data.map((header) => (
                {
                    titleId: header.headerId,
                    title: header.companySecurityName,
                    value: values(header)
                }
            ))
            setSecurityData(postTemplate)
        })
    },[])

    const findIndex = (item) => {
        if(securityData){
            const currentSecurityItem = securityData.filter((eachDataItem) => (eachDataItem.titleId === item.headerId))
            return securityData.indexOf(currentSecurityItem[0])
        }
    }
    const findLoanIndex = (item) => {
        if(loanSubtypeSecurity){
            const currentSecurityItem = loanSubtypeSecurity.filter((eachDataItem) => (eachDataItem.companySecurityName === item.companySecurityName))
            return loanSubtypeSecurity.indexOf(currentSecurityItem[0])
        }
    }
  return (
    <Box>
      <Flex
    //   flexFlow='row wrap'
      wrap='wrap'
      >
        {
            securityData && securityHeaders && securityHeaders.map((header, index) => (
                <Menu 
                key={index}
                closeOnSelect={false}
                >
                     {({ isOpen }) => (
                         <>
                            <MenuButton
                            display={header.hasMenu ? 'block' : 'none'}
                            p={['1rem 1.2rem']}
                            minW='15%'
                            flexGrow='1'
                            bg='#F6F6F6'
                            border='none'
                            borderRight='1px solid #DEDEDE'
                            >
                                <Flex
                                justifyContent='space-around'
                                alignItems='center'
                                >
                                    <Box>
                                        {header.companySecurityName}
                                    </Box>
                                    <Flex 
                                    color={isOpen && 'blue'}
                                    fontSize={['md']}
                                    alignItems='center'
                                    >
                                        <RxTextAlignCenter />
                                    </Flex>
                                </Flex>
                            </MenuButton>
                            <MenuList
                            boxShadow='0px 0px 30px rgba(0, 0, 0, 0.1)'
                            px={2}
                            >
                                {
                                    header.securityDetails && header.securityDetails.map((item,index) => (
                                        <Box 
                                        key={index}
                                        >
                                            <Box
                                            border='none'
                                            position='relative'
                                            mb={1}
                                            >
                                                <ProductSecurityType 
                                                item={item} 
                                                itemId={item.detailId} 
                                                securityData={securityData[findIndex(header)]} 
                                                loanSubtypeSecurityItem={loanSubtypeSecurity && loanSubtypeSecurity[findLoanIndex(header)]}
                                                header={header}
                                                setItemChange={setItemChange}
                                                allSecurityData={securityData}
                                                itemChecked={itemChecked}
                                                setIitemChecked={() => setIitemChecked(!itemChecked)}
                                                />
                                            </Box>
                                        </Box>
                                    ))
                                }
                            </MenuList>
                        </>
                     )}
                </Menu>
            ))
        }
      </Flex>
      <Flex
      mt={4}
      gap={4}
      wrap='wrap'
      >
        {
            securityData && securityHeaders && securityHeaders.map((header, index) => (
                <Box 
                key={index}
                border='1px solid #D9D9D9' 
                p={4} 
                borderRadius={8}
                display={header.type === securityItemType.radio ? 'block' : 'none'}
                >
                    <ProductSecurityType 
                    item={header} 
                    securityData={securityData[findIndex(header)]}
                    loanSubtypeSecurityItem={loanSubtypeSecurity && loanSubtypeSecurity[findLoanIndex(header)]}
                    setItemChange={setItemChange}
                    allSecurityData={securityData}
                    itemChecked={itemChecked}
                    setIitemChecked={() => setIitemChecked(!itemChecked)}
                     />
                </Box>
            ))
        }
      </Flex>
      <Grid
      mt={4}
      templateColumns={['1fr','repeat(3, 1fr)']}
      gap={4}
      >
        {
            securityData && securityHeaders && securityHeaders.map((header, index) => (
                <GridItem
                key={index}
                display={(header.type === securityItemType.textBox || header.type === securityItemType.number) ? 'block' : 'none'}
                >
                    <Box
                    fontSize={['sm']}
                    fontWeight='600'
                    >
                        {header.companySecurityName}
                    </Box>
                    <ProductSecurityType 
                    item={header} 
                    securityData={securityData[findIndex(header)]}
                    loanSubtypeSecurityItem={loanSubtypeSecurity && loanSubtypeSecurity[findLoanIndex(header)] || null}
                    setItemChange={setItemChange}
                    allSecurityData={securityData}
                    itemChecked={itemChecked}
                    setIitemChecked={() => setIitemChecked(!itemChecked)}
                     />
                </GridItem>
            ))
        }
      </Grid>
    </Box>
  )
}

export default ProductSecurity
