import React from 'react'
import { Box, Flex, GridItem, Table, TableContainer, Thead,Tr,Th,Tbody,Td, Image, Input } from '@chakra-ui/react'
import SecuredIcon from '@/assets/teasor/secured.svg'
import UnsecuredIcon from '@/assets/teasor/usecured.svg'
import PricingAsk from './PricingAsk'

const FacilitiesTable = ({bankingArrangments, hasChange, setHasChange}) => {
    return (
      <Box w='100%'>
          <Flex fontSize={[12]} fontWeight='bold' justifyContent='space-between' px={4}>
              <Box>Facility</Box>
          </Flex>
          <TableContainer
          borderRadius={20} 
          fontSize={[8,12]}
          bg='#F1F3FE'
          px={[2]}
        //   maxW={['90vw']}
        //   overflowX={['scroll','none']}
          >
              <Table size='sm' w='100%'  overflowX='scroll'>
                  <Thead py={4}  fontFamily='Inter'>
                  <Tr fontSize={[10,12]} fontFamily='Inter'>
                      <Th 
                      fontSize={[10,12]} 
                      fontFamily='Inter'
                      px={[2,4]}  
                      py={[2,4]}>Facilities</Th>
                      <Th 
                      fontSize={[10,12]} 
                      fontFamily='Inter'
                      px={[2,4]}  
                      py={[2,4]}>Limit</Th>
                      <Th 
                      fontSize={[10,12]} 
                      fontFamily='Inter'
                      px={[2,4]}  
                      py={[2,4]}>Tenure</Th>
                      <Th 
                      fontSize={[10,12]} 
                      fontFamily='Inter'
                      px={[2,4]}  
                      py={[2,4]}>Moratorium</Th>
                      <Th 
                      fontSize={[10,12]} 
                      fontFamily='Inter'
                      px={[2,4]}  
                      py={[2,4]}>Secure</Th>
                      <Th 
                      fontSize={[10,12]} 
                      fontFamily='Inter'
                      px={[2,4]}  
                      py={[2,4]}>% Pricing Ask</Th>
                  </Tr>
                  </Thead>
                  <Tbody>
                      {
                          bankingArrangments && bankingArrangments.length > 0
                          ?
                          bankingArrangments.map((item,index) => (
                              <Tr key={index}>
                                  <Td 
                                  fontSize={[10,12]}
                                  px={[2,4]} 
                                  py={[2,3]}>{item.loanSubTypeName}</Td>
                                  <Td 
                                  fontSize={[10,12]}
                                  px={[2,4]} 
                                  py={[2,3]}>{item.amount + ' ' + item.amountType}</Td>
                                  <Td 
                                  fontSize={[10,12]}
                                  px={[2,4]} 
                                  py={[2,3]}>{item.tenure + ' ' + item.tenureType}</Td>
                                  <Td 
                                  fontSize={[10,12]}
                                  px={[2,4]} 
                                  py={[2,3]}>{item.moratorium > 0 ? item.moratorium + ' ' : '-'} {item.moratorium > 0 ? (item.moratoriumType !== null ? item.moratoriumType : item.tenureType) : ''}</Td>
                                  <Td 
                                  fontSize={[10,12]}
                                  px={[2,4]} 
                                  py={[2,3]}><Image w={['15px','20px']} src={item.isSecured ? SecuredIcon : UnsecuredIcon} alt='icon' /></Td>
                                  <Td 
                                  fontSize={[10,12]}
                                  px={[2,4]} 
                                  py={[2,3]}
                                  textAlign='center'>
                                    <PricingAsk 
                                    item={item}
                                    hasChange={hasChange}
                                    setHasChange={setHasChange}
                                    />
                                  </Td>
                              </Tr>
                          ))
                          :
                          <Tr >
                              <Td p={8} colSpan={6} rowSpan={4} textAlign='center'>No data available</Td>
                          </Tr>
                      }
                  </Tbody>
              </Table>
          </TableContainer>
      </Box>
    )
  }

export default FacilitiesTable
