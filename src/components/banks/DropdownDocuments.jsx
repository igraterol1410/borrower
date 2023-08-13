import React from 'react'
import { useDispatch } from 'react-redux'
import { excludeDocuments } from '@/store/slices/documents/documentSlices'

import { Box, Text, Menu, MenuButton, MenuList, MenuItem, Flex, Image, GridItem, } from '@chakra-ui/react'

import CircleAdd from '@/assets/icons/circleAddIcon.svg'
import CircleSelected from '@/assets/icons/circleCheckIcon.svg'
import DeleteBankIcon from '@/assets/icons/deleteBankSelected.svg'

const DropdownDocuments = ({documents, excludedDocuments, emptyText}) => {
    const dispatch = useDispatch()
    let newExclude = []

    const selectCurrentDocument = (document) =>{
            if(excludedDocuments.length > 0){
                if(!excludedDocuments.includes(document)){
                    newExclude = [...excludedDocuments, document]        
                    dispatch(excludeDocuments(newExclude))
                }
            }else{
                newExclude = [document]           
                dispatch(excludeDocuments(newExclude))
            }
    }

    const findBankIcon = (document) => {
            return excludedDocuments.includes(document) ? CircleSelected : CircleAdd
        }

    const deleteSelectedDocument = (document) => {
        const unExclude = excludedDocuments.filter((eachBank) =>(eachBank != document))
        dispatch(excludeDocuments(unExclude))
    }

  return (
    <>
        <Box
        border='1px solid #D9D9D9'
        bg='white'
        borderRadius={8}
        p={3}
        position='relative'
        display='grid'
        gridTemplateColumns='repeat(4, 1fr)'
        gap={3}
        >
            {
                excludedDocuments.length > 0
                ? 
                excludedDocuments.map((document, index)=>(
                    <GridItem
                    bg='#CFCFFF'
                    fontSize={9}
                    fontWeight='bold'
                    borderRadius={50}
                    px={2}
                    py='2px'
                    paddingRight='2px'
                    zIndex='3'
                    key={index}>
                        <Flex
                        justifyContent='space-between'
                        alignItems='center'
                        >
                            <Text verticalAlign='middle' color='black'>{document.documentName}</Text>
                            <Image 
                            src={DeleteBankIcon} 
                            alt='delete icon'
                            onClick={()=>deleteSelectedDocument(document)} />
                        </Flex>
                    </GridItem>
                ))
                :
                <Text>{emptyText}</Text>
            }
            <Menu 
            closeOnSelect={false}
            preventOverflow
            >
                <MenuButton
                position='absolute'
                top='0'
                right='0'
                w='100%'
                h='100%'
                bg='transparent'
                border='none'
                zIndex='1'
                />
                <MenuList
                position='absolute'
                borderRadius={12}
                padding='.75rem'
                minW='400px'
                zIndex='4'
                >
                    {
                        documents && documents.map((document, index)=>(
                            <MenuItem 
                            border='none'
                            borderBottom='1px solid #ECECEC'
                            padding={3}
                            key={index}
                            onClick={()=>selectCurrentDocument(document)}
                            >
                                <Flex
                                w='100%'
                                justifyContent='space-between'
                                >
                                    {document.documentName}
                                    <Image src={findBankIcon(document)} alt='icon add or check' />
                                </Flex>
                            </MenuItem>
                        ))
                    }
                </MenuList>
            </Menu>
        </Box>
    </>
  )
}

export default DropdownDocuments