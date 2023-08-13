import { getCurrentFinancialDocs, getCurrentKYCDocs, getCurrentPromotorKYCDocs, getUploadedFinancialDocs, getUploadedKYCDocs, getUploadedPromotorDocs, uploadKYCDocs, uploadPromotorKYCDocs } from '@/store/slices/kycDocs/kycDocumetsSlices'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DocumentsUploaded from '../DocumentsUploaded'

const DocumentsModal = ({showModal,setShowModal, config}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const nullId = import.meta.env.VITE_NULL_ID
    const { KYCdocuments, promotorKYCdocuments, uploadedFinancialDocuments, financialdocuments, kycDocLoading, uploadedDocuments, uploadedPromotorDocuments }  = useSelector( state => state.kycDocuments )
    const { industryId, subindustryId, userCompanyID } = config

    const closeModal = () =>{
        setShowModal(false)
        onClose()
    }

    useEffect(()=>{
        if(showModal){
          dispatch(getCurrentKYCDocs({industryId:industryId, subindustryId:subindustryId || nullId, documentTypeID:'C959AC5D-96A5-4777-984A-724ADE0A8F8A'}))
    
          dispatch(getCurrentPromotorKYCDocs({industryId:industryId, subindustryId:subindustryId || nullId}))
          
          dispatch(getCurrentFinancialDocs({industryId:industryId, subindustryId:subindustryId || nullId}))
            
          dispatch(getUploadedKYCDocs({userCompanyID:userCompanyID}))
          dispatch(getUploadedPromotorDocs({userCompanyID:userCompanyID}))
          dispatch(getUploadedFinancialDocs({userCompanyID:userCompanyID}))
        }
      },[showModal])
  return (
    <Modal onClose={closeModal} size='full' isOpen={showModal} defaultIndex={[0,1,2,3]}allowMultiple>
      <ModalOverlay />
      <ModalContent>
          <ModalHeader>Uploaded Documents</ModalHeader>       
        {
            kycDocLoading &&
            <Spinner
            position='absolute'
            top='50%'
            left='50%' 
            />        
        }
            <>
                <ModalCloseButton borderRadius='50%' border='none' />
                <ModalBody>
                    <Accordion defaultIndex={[0,1,2,3]} allowMultiple >
                        <AccordionItem>
                            <h2>
                            <AccordionButton
                            borderRadius={8}
                            bgGradient='linear(to-b, #4C5EFE 0%, #290088 315.22%)'
                            color='white'
                            p={2}
                            fontSize={12}
                            border='none'
                            _hover={{
                                bgGradient:'linear(to-b, #4C5EFE 0%, #290088 315.22%)'
                            }}
                            >
                                <Box as="span" flex='1' textAlign='left'>
                                Company KYC Documents
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                            <DocumentsUploaded 
                            referentDocuments={KYCdocuments}
                            uploadedDocuments={uploadedDocuments}
                            documentType={'A9C0EDD7-AEFB-40E3-8DB8-342E83CCA72E'}
                            />
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                            <AccordionButton
                            borderRadius={8}
                            bgGradient='linear(to-b, #4C5EFE 0%, #290088 315.22%)'
                            color='white'
                            p={2}
                            fontSize={12}
                            border='none'
                            _hover={{
                                bgGradient:'linear(to-b, #4C5EFE 0%, #290088 315.22%)'
                            }}
                            >
                                <Box as="span" flex='1' textAlign='left'>
                                Promotor KYC Documents
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                            <DocumentsUploaded 
                            referentDocuments={promotorKYCdocuments}
                            uploadedDocuments={uploadedPromotorDocuments} 
                            documentType={'A9C0EDD7-AEFB-40E3-8DB8-342E83CCA72E'}
                            />
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <h2>
                            <AccordionButton
                            borderRadius={8}
                            bgGradient='linear(to-b, #4C5EFE 0%, #290088 315.22%)'
                            color='white'
                            p={2}
                            fontSize={12}
                            border='none'
                            _hover={{
                                bgGradient:'linear(to-b, #4C5EFE 0%, #290088 315.22%)'
                            }}
                            >
                                <Box as="span" flex='1' textAlign='left'>
                                Financial Documents
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                            <DocumentsUploaded 
                            referentDocuments={financialdocuments}
                            uploadedDocuments={uploadedFinancialDocuments} 
                            documentType={'FA5F4141-F67D-4465-9214-8EFAC56D9111'}
                            />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </ModalBody>
                <ModalFooter>
                <Button 
                bgGradient='linear(to-b, #4C5EFE 0%, #290088 315.22%)'
                color='white'
                border='none'
                onClick={closeModal}>Close</Button>
                </ModalFooter>
            </>
      </ModalContent>
    </Modal>
  )
}

export default DocumentsModal
