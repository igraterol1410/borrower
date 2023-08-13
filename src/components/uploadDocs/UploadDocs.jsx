import React from 'react'
import { Center, Divider, Flex, FormLabel, Grid, GridItem, Img, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import UploadIcon from '@/assets/icons/uploadIcon.svg'
import DocumentIcon from '@/assets/icons/docIcon.svg'
import TrashIcon from '@/assets/icons/trashIcon.svg'

const UploadDocs = ({ KycDocuments, kycDocLoading, data, setData, setDisabled, setDisabledButton }) => {
    const toast = useToast()
    
    let filesNames = []

    const getExtension = (str, docExtension) => {
        const extension = str.split(".");
        const allowExt = docExtension.split(",")
        const allowed = allowExt.indexOf(`.${extension[extension.length - 1].toLowerCase()}`)
        if(allowed < 0){
            toast({
                title: `Document extension invalid, select a ${docExtension}`,
                status: 'error',
                duration: 3000,
                position: 'top'
            })
        }else{
            return true
        }
      };

    const getSize = (docSize, requiredSize) => {
        if((docSize/1048576) > 10){
            toast({
                title: `the selected document size is larger than ${requiredSize}MB`,
                status: 'error',
                duration: 3000,
                position: 'top'
            })
        }else{
            return true
        }
    }

    const handleChange = (e, document) => {
        setDisabledButton(false)
        if(e.target.files.length > 1){
            let newData = []
            for (var i = 0; i < e.target.files.length; i++) {
              if(getExtension(e.target.files[i].name, document.extensions) && getSize(e.target.files[i].size, document.documentSizeInMB)){
                  newData = [ ...newData,
                    {
                        fileName:e.target.files[i].name,
                        fileID:document.documentMappinID,
                        file:e.target.files[i]
                    }
                  ]
                } 
            }
            setData([...data, ...newData])
            setDisabled(false)            
        }
        else{
            if(getExtension(e.target.files[0].name, document.extensions) && getSize(e.target.files[0].size, document.documentSizeInMB)){
                const newData = {
                    fileName:e.target.files[0].name,
                    fileID:document.documentMappinID,
                    file:e.target.files[0]
                }
                setData([...data, newData])
                setDisabled(false)
            }
        }
    }

    const verifySelecetedDocument = (document) => {
        const selectedDocument = data.filter((eachData)=>(eachData.fileID === document.documentMappinID))
        return (selectedDocument.length > 0) 
    }

    const resetFile = (document) =>{
        const dataToEdit = data.filter((eachData)=>(eachData.fileName === document.fileName))
        const index = data.indexOf(dataToEdit[0])
        const newArray = [...data]
        newArray.splice(index, 1)
        setDisabled(false)
        setData(newArray)
    }

    const showSelectedDoc = (document) => {
        const selectedCurrentDoc = data.filter((eachData)=>(eachData.fileID === document.documentMappinID))
        return selectedCurrentDoc
    }

  return (
    <Grid templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(1, 1fr)','repeat(1, 1fr)']} gap={2} alignItems='center'>
        {
            kycDocLoading &&
            <Spinner 
            position='absolute'
            top='50%'
            left='50%' 
            />
        }
        {
            KycDocuments && KycDocuments.map((document, index)=>(
                <GridItem
                key={index}                     
                fontSize="sm"
                border='2px dashed gray' 
                borderRadius='10px'
                bg='#ECECEC'
                p={2}
                py={4}
                >
                    <FormLabel
                    position='relative'
                    w='100%'
                    mb={0}
                    >
                        <Flex 
                        position='absolute' 
                        top={[0,0]}
                        right={[-1,4]}
                        gap={[0,4]}
                        maxW={['50px','20%']}
                        direction={['column-reverse','row']}
                        >
                            <Text
                            color='gray'
                            fontSize={10}
                            mt={1}
                            >
                                Max size {document.documentSizeInMB} MB {document.isRequired ? '- Required' : ''}
                            </Text>
                            <Img 
                            maxW='25px'
                            src={UploadIcon} 
                            alt='upload icon'
                            />
                        </Flex>
                    <Text
                    fontWeight='bold'
                    fontSize={12}
                    w={['80%','90%']}
                    >
                        Upload {document.documentName} 
                    </Text>
                    <Text
                    fontSize={10}
                    color='gray'
                    w='76%'>
                        {document?.isShowExtensions ? (document.extensions) : ''}
                    </Text>
                        <Input
                        type="file"
                        hidden
                        id="file"
                        data-cy={document.documentName}
                        onChange={(e)=>handleChange(e, document)}
                        value=''
                        name={document.documentName}
                        multiple={document.isSupportMultipleAttachment}
                        required={document.isRequired}
                        accept=".jpeg, .png, .jpg, .pdf, .doc, .docx, .xls, .xlsx, .csv"
                        />
                    </FormLabel>
                    {
                        verifySelecetedDocument(document) &&
                        <>
                        <Divider mt={4} mb={4} orientation='horizontal' />
                        {
                            showSelectedDoc(document) && showSelectedDoc(document).map((doc, index) => (
                            <Flex key={index} justifyContent='space-between' fontSize={10}>
                                <Flex w='50%' gap={3} alignItems='center'>
                                    <Img src={DocumentIcon} alt='document icon' />
                                    <Center>
                                        <Flex direction='column'>
                                            <Text color='#4C5EFE' fontWeight='bold'>{doc.fileName}</Text>
                                        </Flex>
                                    </Center>
                                    
                                    <Text mb={0}>added</Text>
                                </Flex>
                                <Img zIndex={10} src={TrashIcon} alt='delete selected document' onClick={(e)=>{
                                    resetFile(doc)
                                }} />
                            </Flex>
                            ))
                        }
                        </>
                    }

                </GridItem>
            ))
        }
    </Grid>
  )
}

export default UploadDocs
