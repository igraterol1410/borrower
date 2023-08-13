import { Box, Flex, Grid, GridItem, Table, TableContainer, Thead,Tr,Th,Tbody,Td, Image, Text, Divider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import SecuredIcon from '@/assets/teasor/secured.svg'
import UnsecuredIcon from '@/assets/teasor/usecured.svg'
import industrySlices from '@/store/slices/industry/industrySlices'
import { useSelector } from 'react-redux'
import TeasorCheck from './TeasorCheck'

const TeasorProposal = ({bankingArrangments, securityData, cim}) => {
    const { userCompanyInfo } = useSelector(state => state?.user)
    const [shortTerm, setShortTerm] = useState(null)
    const [longTerm, setLongTerm] = useState(null)
    const [shortTermSec, setShortTermSec] = useState(null)
    const [longTermSec, setLongTermSec] = useState(null)
    const [bankingArrangmentsInfo, setBankingArrangmentsInfo] = useState(null)
    const [cimInfo, setCimInfo] = useState(null)
    
    useEffect(() => {
        if(userCompanyInfo && userCompanyInfo.companyProducts && userCompanyInfo.companySecurity){
            const st = userCompanyInfo.companyProducts.filter((product) => product.loanTypeID === 'd399d34a-8424-48e6-acec-6de953da8480')
            const lt = userCompanyInfo.companyProducts.filter((product) => product.loanTypeID !== 'd399d34a-8424-48e6-acec-6de953da8480')
            setShortTerm(st)
            setLongTerm(lt)
        }
    },[userCompanyInfo])
    useEffect(() => {
        if(securityData){
            const stSec = securityData.filter((security) => security.loanType === "Short Term")
            const ltSec = securityData.filter((security) => security.loanType !== "Short Term")
            setShortTermSec(stSec)
            setLongTermSec(ltSec)
        }
    },[securityData])
    useEffect(() => {
        if(cim){
            setCimInfo(cim[0])
        }
    },[cim])

    useEffect(() => {
        if(bankingArrangments){
            setBankingArrangmentsInfo(bankingArrangments)
        }
    },[bankingArrangments])
    const security = {
        ppChargeOnCa:{
            name:'PP Charge on CA',
            value:'true'
        },
        ppChargeOnFa:{
            name:'PP Charge on FA',
            value:'true'
        },
        pg:{
            name:'PG',
            value:'this is for test'
        }
    }
    const data = [
        {
            facilities: ' Term Loan',
            bank: 'HDFC',
            limit: 100,
            tenure: '15 years',
            nature: 'Long term',
            nr: 'R',
            secure: true,
            security:[

            ]
        },
        {
            facilities: ' Term Loan',
            bank: 'ICICI',
            limit: 100,
            tenure: '15 years',
            nature: 'Long term',
            nr: 'R',
            secure: true,
            security:[

            ]
        },
        {
            facilities: ' Term Loan',
            bank: 'AXIS',
            limit: 100,
            tenure: '15 years',
            nature: 'Long term',
            nr: 'R',
            secure: false,
            security:[

            ]
        },
        {
            facilities: ' Term Loan',
            bank: 'BOA',
            limit: 100,
            tenure: '15 years',
            nature: 'Long term',
            nr: 'R',
            secure: true,
            security:[

            ]
        },
        {
            facilities: ' Term Loan',
            bank: 'IDFC',
            limit: 100,
            tenure: '15 years',
            nature: 'Long term',
            nr: 'R',
            secure: false,
            security:[

            ]
        },
        {
            facilities: ' Term Loan',
            bank: 'SBI',
            limit: 100,
            tenure: '15 years',
            nature: 'Long term',
            nr: 'R',
            secure: true,
            security:[

            ]
        }
    ]

    const getValue = (value) => {
        const jsonValue = JSON.parse(value)
        if(jsonValue.value.length > 1){
            const values = []
            jsonValue.value.forEach((value) => values.push(value.value))
            return values.toString()
        } else {
            return `${jsonValue.value[0].value}`
        }
    }

  return (
    <Grid 
    templateAreas={[`"shortTerm"
                    "stSec"
                    "stSec"
                    "longTerm"
                    "ltSec"
                    "fundingDet"`,
                    `"shortTerm longTerm"
                    "stSec ltSec"
                    "stSec fundingDet"`]}
    templateRows='3fr auto auto'
    templateColumns={['1fr', '1fr 1fr']}
    gap={4}
    overflowX={['scroll','initial']}
    mt={2}
    mb={2}>
        <GridItem area={'shortTerm'} >
            <Flex color='#4C5EFE' fontSize={14} fontWeight='bold' justifyContent='space-between' px={4}>
                <Box>SHORT TERM PROPOSAL</Box>
            </Flex>
            <TableContainer border='1px solid #D9D9D9' borderRadius={20}>
                <Table size='sm'>
                    <Thead bg='#F1F3FE'>
                    <Tr>
                        <Th py={2}>SHORT TERM</Th>
                        <Th py={2}></Th>
                        <Th py={2}></Th>
                        <Th py={2}></Th>
                    </Tr>
                    <Tr>
                        <Th pb={4}>FB</Th>
                        <Th pb={4}>AMOUNT</Th>
                        <Th pb={4}>TENURE</Th>
                        <Th pb={4}>SECURE</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {
                            shortTerm 
                            ? shortTerm.map((item,index) => (
                                <Tr key={index}>
                                    <Td py={4}>{item.loanTypeName}</Td>
                                    <Td py={4}>{item.amount + ' ' + item.amountType}</Td>
                                    <Td py={4}>{item.tenure + ' ' + item.tenureType}</Td>
                                    <Td py={4}><Image src={item.isSecured ? SecuredIcon : UnsecuredIcon} alt='icon' /></Td>
                                </Tr>
                            ))
                            :
                            <Tr>
                                <Td  p={8} colSpan={4} textAlign='center'>No data is available</Td>
                            </Tr>
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </GridItem>
        <GridItem area={'stSec'} h='100%'>
            <TableContainer border='1px solid #D9D9D9' borderRadius={20} mt={4} h='100%'>
                    <Table size='sm'>
                    <Thead bg='#F1F3FE'>
                    <Tr>
                        <Th py={2}>SECURITY DETAILS</Th>
                        <Th py={2}></Th>
                    </Tr>
                    <Tr>
                        <Th pb={4}>SECURITY</Th>
                        <Th textAlign='center' pb={4}>SELECTED VALUE</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {
                            shortTermSec
                            ?
                            shortTermSec.map((item,index) => (
                                <Tr key={index} display={item.itemValue && item.itemValue !== 'false' ? '' :'none'}>
                                    <Td py={4} >{item.companySecurityName}</Td>
                                    <Td py={4} textAlign='center'>{getValue(item.itemValue) || 'N/A'}</Td>
                                </Tr>
                            ))
                            :
                            <Tr>
                                <Td  p={8} colSpan={4} rowSpan={4} textAlign='center'>No data available</Td>
                            </Tr>
                        }
                    </Tbody>
                    </Table>
            </TableContainer>
        </GridItem>
        <GridItem area={'longTerm'}>
            <Flex color='#4C5EFE' fontSize={14} fontWeight='bold' justifyContent='space-between' px={4}>
                        <Box>LONG TERM PROPOSAL</Box>
                    </Flex>
                    <TableContainer border='1px solid #D9D9D9' borderRadius={20}>
                        <Table size='sm'>
                            <Thead bg='#F1F3FE' py={4}>
                            <Tr>
                                <Th py={2} colSpan={5}>LONG TERM</Th>
                            </Tr>
                            <Tr>
                                {/* <Th pb={4}>BANK</Th> */}
                                <Th pb={4}>FACILITIES</Th>
                                <Th pb={4}>LIMIT</Th>
                                <Th pb={4}>TENURE</Th>
                                <Th pb={4}>SECURE</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    longTerm 
                                    ? 
                                    longTerm.map((item,index) => (
                                        <Tr key={index}>
                                            {/* <Td>{item.bank}</Td> */}
                                            <Td py={4}>{item.loanTypeName}</Td>
                                            <Td py={4}>{item.amount + ' ' + item.amountType}</Td>
                                            <Td py={4}>{item.tenure + ' ' + item.tenureType}</Td>
                                            <Td py={4}><Image src={item.isSecured ? SecuredIcon : UnsecuredIcon} alt='icon' /></Td>
                                        </Tr>
                                    ))
                                    :
                                        <Tr>
                                            <Td  p={8} colSpan={5} textAlign='center'>No data is available</Td>
                                        </Tr>
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                {/* <TeasorCheck bankingArrangments={bankingArrangments} /> */}
        </GridItem>
        <GridItem area={'ltSec'}>
            <TableContainer border='1px solid #D9D9D9' borderRadius={20} mt={4}>
                    <Table size='sm'>
                        <Thead bg='#F1F3FE'>
                        <Tr>
                            <Th py={2}>SECURITY DETAILS</Th>
                            <Th py={2}></Th>
                        </Tr>
                        <Tr>
                            <Th pb={4}>SECURITY</Th>
                            <Th pb={4}>SELECTED VALUE</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {
                                longTermSec && longTermSec.length > 0
                                ?
                                longTermSec.map((item,index) => (
                                    <Tr key={index} display={item.value && item.value !== 'false' ? '' :'none'}>
                                        <Td py={4}>{item.name}</Td>
                                        <Td py={4}>{item.value || 'N/A'}</Td>
                                    </Tr>
                                ))
                                :
                                <Tr>
                                    <Td  p={8} colSpan={4} rowSpan={4} textAlign='center'>No data available</Td>
                                </Tr>
                            }
                        </Tbody>
                    </Table>
            </TableContainer>            
        </GridItem>
        <GridItem area={'fundingDet'}>
            <Box color='#4C5EFE' fontSize={14} fontWeight='bold'>
                FUNDING DETAILS
            </Box>
            <Divider />
            {
                cimInfo &&
            <Box fontSize={14}>{cimInfo.fundingDetails}</Box>         
            }
        </GridItem>
    </Grid>
  )
}

export default TeasorProposal
