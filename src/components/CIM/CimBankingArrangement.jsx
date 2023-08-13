import React, { useEffect, useState } from 'react'
import { Box, Flex, Grid, GridItem, Table, TableContainer, Thead,Tr,Th,Tbody,Td, Image } from '@chakra-ui/react'
import SecuredIcon from '@/assets/teasor/secured.svg'
import UnsecuredIcon from '@/assets/teasor/usecured.svg'

const CimBankingArrangement = ({loanInfo}) => {
    const data = [
        {
            facilities: ' Term Loan',
            bank: 'HDFC',
            limit: 100,
            tenure: '15 years',
            nature: 'Long term',
            nr: 'R',
            secure: true
        },
        {
            facilities: ' Term Loan',
            bank: 'ICICI',
            limit: 100,
            tenure: '15 years',
            nature: 'Long term',
            nr: 'R',
            secure: true
        },
        {
            facilities: ' Term Loan',
            bank: 'AXIS',
            limit: 100,
            tenure: '15 years',
            nature: 'Long term',
            nr: 'R',
            secure: false
        },
        {
            facilities: ' Term Loan',
            bank: 'BOA',
            limit: 100,
            tenure: '15 years',
            nature: 'Long term',
            nr: 'R',
            secure: true
        },
        {
            facilities: ' Term Loan',
            bank: 'IDFC',
            limit: 100,
            tenure: '15 years',
            nature: 'Long term',
            nr: 'R',
            secure: false
        },
        {
            facilities: ' Term Loan',
            bank: 'SBI',
            limit: 100,
            tenure: '15 years',
            nature: 'Long term',
            nr: 'R',
            secure: true
        }
    ]
  return (
    <GridItem>
        <Flex color='#4C5EFE' fontSize={14} fontWeight='bold' justifyContent='space-between' px={4}>
            <Box>CURRENT BANKING ARRANGEMENT</Box>
        </Flex>
        <TableContainer border='1px solid #D9D9D9' borderRadius={20}>
            <Table size='sm'>
                <Thead bg='#F1F3FE' py={4}>
                <Tr>
                    <Th py={4}>BANK</Th>
                    <Th py={4}>FACILITIES</Th>
                    <Th py={4}>LIMIT</Th>
                    <Th py={4}>TENURE</Th>
                    <Th py={4}>SECURE</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((item,index) => (
                            <Tr key={index}>
                                <Td>{item.bank}</Td>
                                <Td>{item.facilities}</Td>
                                <Td>{item.limit}</Td>
                                <Td>{item.tenure}</Td>
                                <Td><Image src={item.secure ? SecuredIcon : UnsecuredIcon} alt='icon' /></Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    </GridItem>
  )
}

export default CimBankingArrangement
