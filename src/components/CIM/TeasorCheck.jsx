import React from 'react'
import { Box, Flex, Grid, GridItem, Table, TableContainer, Thead,Tr,Th,Tbody,Td, Image } from '@chakra-ui/react'
import SecuredIcon from '@/assets/teasor/secured.svg'
import UnsecuredIcon from '@/assets/teasor/usecured.svg'

const TeasorCheck = ({bankingArrangments}) => {
  return (
    <GridItem mt={4}>
        <Flex color='#4C5EFE' fontSize={[14]} fontWeight='bold' justifyContent='space-between' px={4}>
            <Box>CURRENT BANKING ARRANGEMENT</Box>
        </Flex>
        <TableContainer border='1px solid #D9D9D9' borderRadius={20} fontSize={[10,14]}>
            <Table size='sm'>
                <Thead bg='#F1F3FE' py={4}>
                <Tr fontSize={[10,14]}>
                    <Th py={4}>BANK</Th>
                    <Th py={4}>FACILITIES</Th>
                    <Th py={4}>LIMIT</Th>
                    <Th py={4}>TENURE</Th>
                    <Th py={4}>SECURE</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        bankingArrangments && bankingArrangments.length > 0
                        ?
                        bankingArrangments.map((item,index) => (
                            <Tr key={index}>
                                <Td py={4}>{item.bank}</Td>
                                <Td py={4}>{item.loantype}</Td>
                                <Td py={4}>{item.amount + ' ' + item.amounttype}</Td>
                                <Td py={4}>{item.tanure + ' ' + item.tanuretype}</Td>
                                <Td py={4}><Image src={item.issecured ? SecuredIcon : UnsecuredIcon} alt='icon' /></Td>
                            </Tr>
                        ))
                        :
                        <Tr >
                            <Td p={8} colSpan={5} rowSpan={4} textAlign='center'>No data available</Td>
                        </Tr>
                    }
                </Tbody>
            </Table>
        </TableContainer>
    </GridItem>
  )
}

export default TeasorCheck
