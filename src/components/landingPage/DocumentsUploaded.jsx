import { Box, Flex, Grid } from '@chakra-ui/react'
import React from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import UploadedDocumentsList from '../uploadDocs/UploadedDocumentsList'

const DocumentsUploaded = ({referentDocuments, kycDocLoading, uploadAction, uploadedDocuments, getUploadedAction, documentType}) => {
    const verifyDocument = (document) => {
        const currentUploaded = referentDocuments?.filter((eachDoc) => (eachDoc.documentMappinID === document.documentMappinID))
        // console.log(currentUploaded)
        return currentUploaded?.length > 0
    }
  return (
    <Grid 
    templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(3, 1fr)','repeat(3, 1fr)']}
    gap={4}
    >
        {
            referentDocuments && referentDocuments.map((doc,index)=>(
                <Box
                key={index}
                opacity={verifyDocument(doc) ? '1' : '0'}
                bg={verifyDocument(doc) ? '#F5F5F5' : ''}
                p={4}
                fontSize={12}
                >
                    <Flex
                    alignItems='center'
                    justifyContent='space-between'
                    gap={6}
                    fontWeight='bold'
                    >
                        {doc?.documentName}
                        <BsCheckCircleFill style={{color:'#77C293'}} />
                    </Flex>
                    {
                        verifyDocument(doc) &&
                        <UploadedDocumentsList 
                        document={doc} 
                        uploadedDocuments={uploadedDocuments} 
                        getUploadedAction={getUploadedAction}
                        />
                    }
                </Box>
            ))
        }
    </Grid>    
  )
}

export default DocumentsUploaded
