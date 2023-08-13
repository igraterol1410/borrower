import React, { useEffect } from 'react'
import { Box, Button, Flex, Grid, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
// import SectionTitle from '../dashboard/SectionTitle'
// import TextareaTermsSheet from './TextareaTermsSheet'

// import Proposal from '@/assets/terms-sheet/proposal.svg'
// import Security from '@/assets/terms-sheet/security.svg'
// import Tenure from '@/assets/terms-sheet/tenure.svg'
// import OtherSecurity from '@/assets/terms-sheet/other-security.svg'
// import Covenants from '@/assets/terms-sheet/covenants.svg'
// import Facilities from '@/assets/terms-sheet/facilities.svg'
// import Repayments from '@/assets/terms-sheet/repayments.svg'
// import Prepayments from '@/assets/terms-sheet/pre-payments.svg'
// import ProcessingFee from '@/assets/terms-sheet/processing-fee.svg'
// import Insurance from '@/assets/terms-sheet/insurance.svg'
import TermsSheet from '@/pages/termsSheet/TermsSheet'

const TermsSheeModal = ({showModal,setShowModal, config}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const closeModal = () =>{
        setShowModal(false)
        onClose()
    }

    useEffect(()=>{
        if(showModal){
            onOpen()
        }
      },[showModal])

  return (
    <Modal onClose={closeModal} size='full' isOpen={showModal} >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Terms Sheet</ModalHeader> 
            <ModalCloseButton borderRadius='50%' border='none' />
            <ModalBody>
            {/* <Box px={3}>
                <SectionTitle title='Terms Sheet' text='Please Enter Your Terms' />
                <Grid
                templateColumns={['1fr','1fr 1fr']}
                gap={[2,2]}
                py={[2,4]}
                >
                    <GridItem
                    display='flex'
                    flexDirection='column'
                    justifyContent='space-between'
                    gap={6}
                    >
                        <Flex 
                        alignItems='center'
                        gap={[2,4]}>
                            <Image w={['25px','35px']} src={Proposal} alt='Proposal image' />
                            <Box>
                                <Text fontSize={['sm']} fontWeight='bold'>Proposal</Text>
                                <Text fontSize={['sm']} mb={0}>{proposalInfo}</Text>
                            </Box>
                        </Flex>
                        <Flex 
                        alignItems='center'
                        gap={[2,4]}>
                            <Image w={['25px','35px']} src={Security} alt='Proposal image' />
                            <Box>
                                <Text fontSize={['sm']} fontWeight='bold'>Security</Text>
                                <Text fontSize={['sm']} mb={0}>Mock Data</Text>
                            </Box>
                        </Flex>
                        <Flex 
                        alignItems='center'
                        gap={[2,4]}>
                            <Image w={['25px','35px']} src={OtherSecurity} alt='Proposal image' />
                            <Box w='100%'>
                                <Text fontSize={['sm']} fontWeight='bold'>Other Security Conditions</Text>
                                <TextareaTermsSheet value={securityConditions} setVariable={setSecurityConditions} />
                            </Box>
                        </Flex>
                        <Flex 
                        alignItems='center'
                        gap={[2,4]}>
                            <Image w={['25px','35px']} src={Covenants} alt='Proposal image' />
                            <Box w='100%'>
                                <Text fontSize={['sm']} fontWeight='bold'>Covenants</Text>
                                <TextareaTermsSheet value={covenants} setVariable={setCovenants} />
                            </Box>
                        </Flex>
                    </GridItem>
                    <GridItem>
                        <Flex gap={4} alignItems='flex-start' direction={['column','row']}>
                            <Image display={['none','block']} w={['20px','35px']} src={Facilities} alt='table' />
                            <FacilitiesTable bankingArrangments={userCompanyInfo?.companyProducts} />
                        </Flex>
                        <Grid
                        m='auto'
                        templateColumns={['1fr','1fr 1fr']}
                        mt={4}
                        gap={4}
                        >
                            <GridItem>
                                <Flex 
                                    alignItems='center'
                                    gap={[2,4]}>
                                    <Image w={['25px','35px']} src={Repayments} alt='Proposal image' />
                                    <Box>
                                        <Text fontSize={['sm']} fontWeight='bold'>Repayments</Text>
                                        <Text fontSize={['sm']} mb={0}>Quarterly installments</Text>
                                    </Box>
                                </Flex>
                            </GridItem>
                            <GridItem>
                                <Flex 
                                    alignItems='center'
                                    gap={[2,4]}>
                                    <Image w={['25px','35px']} src={Prepayments} alt='Proposal image' />
                                    <Box w='100%'>
                                        <Text fontSize={['sm']} fontWeight='bold'>Pre Payments</Text>
                                        <TextareaTermsSheet value={prepayment} setVariable={setPrepayment} />
                                    </Box>
                                </Flex>
                            </GridItem>
                            <GridItem>
                                <Flex 
                                    alignItems='center'
                                    gap={[2,4]}>
                                    <Image w={['25px','35px']} src={ProcessingFee} alt='Proposal image' />
                                    <Box w='100%'>
                                        <Text fontSize={['sm']} fontWeight='bold'>Processing Fee</Text>
                                        <TextareaTermsSheet value={processingFee} setVariable={setProcessingFee} />
                                    </Box>
                                </Flex>
                            </GridItem>
                            <GridItem>
                                <Flex 
                                    alignItems='center'
                                    gap={[2,4]}>
                                    <Image w={['25px','35px']} src={Insurance} alt='Proposal image' />
                                    <Box w='100%'>
                                        <Text fontSize={['sm']} fontWeight='bold'>Insurance</Text>
                                        <TextareaTermsSheet value={insurance} setVariable={setInsurance} />
                                    </Box>
                                </Flex>
                            </GridItem>
                        </Grid>
                    </GridItem>
                </Grid>
                    <Flex 
                        alignItems='center'
                        px={2}
                        gap={[2,4]}>
                        <Image w={['25px','35px']} src={Insurance} alt='Proposal image' />
                        <Box w='100%'>
                            <Text fontSize={['sm']} fontWeight='bold'>Purpose</Text>
                            <TextareaTermsSheet value={purpose} setVariable={setPurpose} width='95%' />
                        </Box>
                    </Flex>
                </Box> */}
                <TermsSheet modal={true} />
            </ModalBody>
            <ModalFooter>
            <Button 
            bgGradient='linear(to-b, #4C5EFE 0%, #290088 315.22%)'
            color='white'
            border='none'
            onClick={closeModal}
            >
                Close
            </Button>
            </ModalFooter>
        </ModalContent>      
    </Modal>
  )
}

export default TermsSheeModal
