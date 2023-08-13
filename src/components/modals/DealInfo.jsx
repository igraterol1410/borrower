import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Center, Flex, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Skeleton, Text, useDisclosure } from '@chakra-ui/react'
import { getProductDataSpecific } from '@/services/cim.services';

const DealInfo = ({ show, setShow, deal, dealType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [dealData, setDealData] = useState(null) 
  const [loading, setLoading] = useState(false) 

  const types = {
    WC: 'WC',
    SCF: 'SCF',
    TL: 'TL'
  }
  const dealTypes = {
    WC: 'WORKING CAPITAL',
    SCF: 'SUPPLY CHAIN FINANCE',
    TL: 'TERM LOAN'
  }

  useEffect(() => {
      if (show) {
        setLoading(true)
        onOpen()
        getProductDataSpecific(deal.userCompanyID, deal.userID, deal.companyID).then(({data}) => {
          if(dealType === types.WC){
              setDealData(data[0].shortTerm)
          } else if(dealType === types.SCF) {
              const currentData = data[0].longTerm.filter((eachData) => (eachData.code === dealTypes.SCF))
              setDealData(currentData)
          } else if(dealType === types.TL) {
              const currentData = data[0].longTerm.filter((eachData) => (eachData.code === dealTypes.TL))
              setDealData(currentData)
          }
        })
        setLoading(false)
    }
  }, [show])

  const cancel = () => {
    setShow(false)
    onClose()
  }

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={cancel} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={12}>
        <ModalHeader borderRadius='12px 12px 0 0'>
          <ModalCloseButton onClick={cancel} border='none' />
        </ModalHeader>
          <ModalBody w='100%'>
            <Box>
              <Center w='full' mb={4}>
                <Heading as='h3' fontSize='xl' textAlign='center'>Deal information</Heading>
              </Center>
            </Box>
            <Skeleton isLoaded={!loading}>
                <Flex mt={4} wrap='wrap' gap={4}>
                    {
                        dealData
                        ? dealData.map((data, index) => (
                            <Flex 
                            key={index}
                            gap={4}
                            p={'.75rem 1rem'}
                            borderRadius={20}
                            border='1px solid #eee'
                            textAlign='center'
                            >
                                <Text textAlign='center'>
                                    {data.loanCategory}
                                </Text>
                                <Text textAlign='center'>
                                    {data.amount}
                                </Text>
                            </Flex>
                        ))
                        :
                        <Center p={'.75rem 1rem'} textAlign='center'>
                            There is not data availabe
                        </Center>
                    }
                </Flex>
            </Skeleton>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DealInfo