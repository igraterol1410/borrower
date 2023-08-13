import { SearchIcon } from '@chakra-ui/icons'
import { Box, Text, Menu, MenuButton, MenuList, MenuItem, InputGroup, InputRightElement, Input, Flex, Image, GridItem, Button, Spinner, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { excludeBank, getCurrentBanks, getCurrentBanksByName, getPrivateBank, getPublicBank, includeBank, setBanks } from '@/store/slices/banks/bankSlices'

import CircleAdd from '@/assets/icons/circleAddIcon.svg'
import CircleSelected from '@/assets/icons/circleCheckIcon.svg'
import DeleteBankIcon from '@/assets/icons/deleteBankSelected.svg'

const DropdownBank = ({action, emptyText, setItemChange}) => {
    const dispatch = useDispatch()  
    const { banks, excludedBank, includedBank, banksBackUp, bankLoading } = useSelector( state => state.banks ) 
    const [value, setValue] = useState('')
    const [showBank, setShowBank] = useState('')    
    const nullId = import.meta.env.VITE_NULL_ID
    let newExclude = []
    let newInclude = []

    useEffect(()=>{
        dispatch(getCurrentBanks())
    },[])

    const verifyId = (bankArray, bank) => {
        const testing = bankArray.filter((eachBank)=>(eachBank.bankId===bank.bankId))
        return testing.length > 0
    }

    const handleChange = (event) => {        
        setItemChange(false)
        setValue(event.target.value)
        setShowBank('')
        if(!event.target.value){
            dispatch(setBanks(banksBackUp))
        }
    }

    const selectCurrentBank = (bank) =>{        
        if(action === 'exclude'){
            if(excludedBank.length > 0){
                if(!verifyId(excludedBank, bank) && !verifyId(includedBank, bank)){
                    newExclude = [...excludedBank, bank]        
                    dispatch(excludeBank(newExclude))
                }
            }else{
            newExclude = [bank]           
            dispatch(excludeBank(newExclude))
            }
        }
        else if(action === 'include'){
            if((includedBank.length > 0)){
                if(!verifyId(excludedBank, bank) && !verifyId(includedBank, bank)){
                    newInclude = [...includedBank, bank]        
                    dispatch(includeBank(newInclude))
                }
            }else{
                newInclude = [bank]           
                dispatch(includeBank(newInclude))
            }
        }
    }

    const findBankIcon = (bank) => {
        if(action === 'exclude'){
            return verifyId(excludedBank, bank) ? CircleSelected : CircleAdd
        }
        else if(action === 'include'){
            return verifyId(includedBank, bank) ? CircleSelected : CircleAdd
        }
    }

    const deleteSelectedBank = (bank) => {
        if(action === 'exclude'){
            const unExclude = excludedBank.filter((eachBank) =>(eachBank != bank))
            dispatch(excludeBank(unExclude))
        }else{
            const unInclude = includedBank.filter((eachBank) =>(eachBank != bank))
            dispatch(includeBank(unInclude))
        }
    }

    const displayBank = (bank) => {
        return ((action === 'exclude' && (includedBank.length > 0) && verifyId(includedBank, bank)) || (action === 'include' && (excludedBank.length > 0) && verifyId(excludedBank, bank))) ? 'none' :'block'
    }
    const getData = () => {
        if(value){
            dispatch(getCurrentBanksByName(value))
        } 
        else {
            dispatch(setBanks(banksBackUp))
        }    
    }    

    const enterPressed = (event) => {
        if (value && event.code === 'Enter') {
          getData()
      }}
      
      useEffect(()=>{
        window.addEventListener("keyup", enterPressed)
    
        return () => window.removeEventListener("keyup", enterPressed)
      },[value])

  return (
    <>
        <Box
        border='1px solid #D9D9D9'
        bg='white'
        borderRadius={8}
        p={3}
        position='relative'
        display='grid'
        gridTemplateColumns={['repeat(2, 1fr)','repeat(2, 1fr)','repeat(4, 1fr)','repeat(4, 1fr)']}
        gap={3}
        >
            {
                action === 'exclude' 
                ?
                <>
                    {
                        excludedBank.length > 0
                        ? 
                        excludedBank.map((bank, index)=>(
                            <GridItem
                            bg='#CFCFFF'
                            fontSize={9}
                            fontWeight='bold'
                            borderRadius={50}
                            // display={bank.bankId === nullId ? 'none' : 'block'}
                            px={2}
                            py='2px'
                            paddingRight='2px'
                            zIndex='3'
                            key={index}>
                                {/* {console.log(bank)} */}
                                <Flex
                                justifyContent='space-between'
                                alignItems='center'
                                >
                                    <Text verticalAlign='middle' color='black'>{bank.code}</Text>
                                    <Image 
                                    src={DeleteBankIcon} 
                                    alt='delete icon'
                                    onClick={()=>{
                                        deleteSelectedBank(bank)
                                        setItemChange(false)
                                        }} />
                                </Flex>
                            </GridItem>
                        ))
                        :
                        <Text>{emptyText}</Text>

                    }
                </>
                :
                <>
                    {
                        includedBank.length > 0
                        ? 
                        includedBank.map((bank, index)=>(
                            <GridItem
                            bg='#CFCFFF'
                            fontSize={9}
                            fontWeight='bold'
                            borderRadius={50}
                            // display={bank.preferredBankID === nullId ? 'none' : 'block'}
                            px={2}
                            py='2px'
                            paddingRight='2px'
                            zIndex='3'
                            key={index}>
                                <Flex
                                justifyContent='space-between'
                                alignItems='center'
                                >
                                    <Text verticalAlign='middle' color='black'>{bank.code}</Text>
                                    <Image 
                                    src={DeleteBankIcon} 
                                    alt='delete icon'
                                    onClick={()=>{
                                        deleteSelectedBank(bank)
                                        setItemChange(false)
                                        }} />
                                </Flex>
                            </GridItem>
                        ))
                        :
                        <Text>{emptyText}</Text>
                    }
                </>
            }
            <Menu 
            closeOnSelect={false}
            preventOverflow
            offset='0,0'
            onClose={()=>{
                setShowBank('')
                dispatch(setBanks(banksBackUp))
            }}
            >
                <MenuButton
                position='absolute'
                top='0'
                right={['0','0','0','0']}
                w='100%'
                h='100%'
                bg='transparent'
                border='none'
                zIndex='1'
                />
                <MenuList
                position='absolute'
                // left={['-15px','-15px','0','0']}
                borderRadius={12}
                padding='.75rem'
                minW={['370px','370px','400px','400px']}
                zIndex='4'
                maxH='50vh'
                overflow='scroll'
                boxShadow='0px 0px 40px rgba(0, 0, 0, 0.2)'
                >
                    {
                        bankLoading &&
                        <Spinner
                        thickness='6px'
                        speed='1.2s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl' 
                        position='absolute' 
                        zIndex={2} 
                        left='50%' 
                        top='50%' />
                    }
                    <Flex
                    alignItems='center'
                    gap={4}>
                        <InputGroup>
                            <Input placeholder='Search bank' 
                            borderColor='gray.300'
                            // bg='#F3F3F3'
                            focusBorderColor='#4c5efe'
                            borderRadius={12}
                            value={value}
                            onChange={(e)=>{
                                handleChange(e)
                            }} 
                            />
                            <InputRightElement w='20%' maxH='70%' mt='5px' mr='5px' mb='5px' fontSize='xs' children={<Button onClick={() => getData()} w='100%' border='none' maxH='100%' m='auto'><SearchIcon color='gray.500' /></Button>} />
                        </InputGroup>
                        <Flex
                        gap={1}>
                            <Button
                            fontSize={12}
                            p={1}
                            border='none'
                            onClick={()=>{
                                dispatch(getPrivateBank(banksBackUp))
                                if(showBank === 'private'){
                                    dispatch(setBanks(banksBackUp))
                                    setShowBank('')
                                }else{
                                    setShowBank('private')
                                }
                            }}
                            bg={showBank === 'private' ? 'green' : 'none'}
                            >Private</Button>
                            <Button
                            fontSize={12}
                            p={1}
                            border='none'
                            onClick={()=>{
                                dispatch(getPublicBank(banksBackUp))
                                if(showBank === 'public'){
                                    dispatch(setBanks(banksBackUp))
                                    setShowBank('')
                                }else{
                                    setShowBank('public')
                                }
                            }}
                            bg={showBank === 'public' ? 'green' : 'none'}
                            >Públic</Button>
                        </Flex>
                    </Flex>
                    {
                        banks && banks.map((bank, index)=>(
                            <MenuItem 
                            border='none'
                            borderBottom='1px solid #ECECEC'
                            padding={3}
                            display={displayBank(bank)}
                            key={index}
                            onClick={()=>{
                                selectCurrentBank(bank)
                                setItemChange(false)
                            }}
                            _hover={{background:'#F8EBEB'}}
                            >
                                <Flex
                                w='100%'
                                justifyContent='space-between'
                                >
                                    {bank.code}
                                    <Image src={findBankIcon(bank)} alt='icon add or check' />
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

export default DropdownBank
