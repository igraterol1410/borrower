import React from 'react'
import { Box, Flex, Grid, Img, Spinner } from '@chakra-ui/react'
import { BsCheckCircleFill } from "react-icons/bs";
import UploadedDocumentsList from './UploadedDocumentsList';

const CheckDocs = ({ KycDocuments,kycDocLoading, data, uploadedDocuments, getUploadedAction }) => {
    const verifyDocument = (document) => {
        const selectedDocument = data.filter((eachData)=>(eachData.fileID === document.documentMappinID))
        const currentUploaded = uploadedDocuments?.filter((eachDoc) => (eachDoc.documentMappinID === document.documentMappinID))
        return (selectedDocument.length > 0) || (currentUploaded?.length > 0)
    }

  return (
    <Box>
        {
            kycDocLoading &&
            <Spinner 
            position='absolute'
            top='50%'
            left='50%' 
            />
        }
        <Grid 
        templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(3, 1fr)','repeat(3, 1fr)']}
        gap={4}
        >
            {
                KycDocuments && KycDocuments.map((doc,index)=>(
                    <Box
                    key={index}
                    opacity={verifyDocument(doc) ? '1' : '0.3'}
                    bg={verifyDocument(doc) ? '#F5F5F5' : ''}
                    p={4}
                    >
                        <Grid
                        alignItems='center'
                        justifyContent='space-between'
                        templateColumns='1fr auto'
                        gap={6}
                        fontWeight='bold'
                        >
                            {doc?.documentName}
                            <BsCheckCircleFill style={{color:'#77C293'}} />
                        </Grid>
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
    </Box>
  )
}

export default CheckDocs
