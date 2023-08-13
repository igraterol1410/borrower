import { Box, GridItem, Input, InputGroup, InputLeftAddon, InputRightAddon, Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ConfigSuplyChain = ({ loanSubtype, data, setItemChange }) => {    
    const { userCompanyInfo } = useSelector( state => state.user)
    const [currentData, setCurrentData] = useState(null)
    const [tenure, setTenure] = useState('')
    const [tenureType, setTenureType] = useState('Month')
    const [amount, setAmount] = useState('')
    const [amountType, setAmountType] = useState('Cr')
    const [counterParty, setCounterParty] = useState('')
    let uploadedData = []

    useEffect(()=>{
        if(userCompanyInfo?.companyProducts){
            uploadedData = userCompanyInfo?.companyProducts.filter((eachProduct) => eachProduct.loanSubTypeID === loanSubtype.loanSubMenuId)
            if(uploadedData.length > 0){
                changeTenure(uploadedData[0].tenure)
                changeAmount(uploadedData[0].amount)
                changeAmountType(uploadedData[0].amountType)
                changeTenureType(uploadedData[0].tenureType)
                changeCounterParty(uploadedData[0].counterParty)
                if(data){
                    data.loanSubtype = uploadedData[0].loanSubTypeID
                }
            }
            setCurrentData(uploadedData)
        }
    },[userCompanyInfo?.companyProducts, data])

    const changeTenure = (value) => {
        if(data){
            data.tenure = value
            // setItemChange(false)
        }
        setTenure(value)
    }
    const changeAmount = (value) => {
        if(data){
            data.amount = value
            // setItemChange(false)
        }
        if(value > 9999){
            setAmount(9999)
        }
        else{
            setAmount(value)
        }
    }
    const changeAmountType = (value) => {
        if(data){
            data.amountType = value
            // setItemChange(false)
        }
        setAmountType(value)
    }
    const changeTenureType = (value) => {
        if(data){
            data.tenureType = value
            // setItemChange(false)
        }
        setTenureType(value)
    }
    
    const changeCounterParty = (value) => {
        if(data){
            data.counterParty = value
            // setItemChange(false) 
        }
        setCounterParty(value)
    }

  return (
    <>
        <Box
        border='1px dashed #37404D'
        borderRadius={10}
        p='1rem'
        mt={3}
        >
            <Box
            zIndex='10'
            display='grid'
            gridTemplateColumns={['1fr','1fr','3fr 2fr 2fr 2fr','3fr 2fr 2fr 2fr']}
            // gridTemplateColumns='3fr 2fr 2fr 2fr'
            gap={3}
            fontSize='sm'
            >
                <GridItem>
                    <Box>Selected</Box>
                    <Box 
                    p={2}
                    bg='#FAFAFA'
                    border='1px solid #D9D9D9'
                    borderRadius={5}
                    >
                        {loanSubtype?.text}
                    </Box>
                </GridItem>
                <GridItem>
                    <Box>Amount</Box>
                    <InputGroup 
                    size='md' 
                    bg='#FAFAFA'
                    border='1px solid #D9D9D9'
                    >
                        <InputLeftAddon 
                        color='gray.300' 
                        fontSize='1.2em' 
                        children='₹' 
                        bg='#FAFAFA'
                        w='10%'
                        />
                        <Input 
                        size='sm' 
                        bg='#FAFAFA'  
                        type='number'
                        // w='50%'                                       
                        p={1} 
                        textAlign='center'
                        border='1px solid #D9D9D9'
                        value={amount}
                        min={0}
                        borderRadius={5} 
                        placeholder='0.0' 
                        fontSize='1em' 
                        onChange={(e) => {
                            changeAmount(e.target.value)
                            setItemChange(false)
                        }} 
                        />
                        <InputRightAddon 
                        color='gray.300' 
                        fontSize='1.2em'
                        p='0'
                        h='100%'
                        w='40%'
                        bg='#FAFAFA'>
                        <Select 
                        w='100%'
                        border='none'
                        value={amountType}
                        fontSize={12}
                        onChange={(e) => {
                            changeAmountType(e.target.value)
                            setItemChange(false)
                        }}
                        >
                            <option>Cr</option>
                            <option>Lakh</option>
                        </Select>
                        </InputRightAddon>
                    </InputGroup>
                </GridItem>
                <GridItem>
                    <Box>Tenure</Box>
                    <InputGroup 
                    size='md' 
                    bg='#FAFAFA'
                    border='1px solid #D9D9D9'
                    >
                        <Input 
                        size='sm' 
                        bg='#FAFAFA'                                        
                        p={1} 
                        textAlign='center'
                        border='1px solid #D9D9D9'
                        value={tenure}
                        min={0}
                        borderRadius={5} 
                        placeholder='0' 
                        fontSize='1em'
                        type='number'
                        onChange={(e) => {
                            if(e.target.value >= 0 && e.target.value <= 999){
                                changeTenure(e.target.value)
                                setItemChange(false)
                            }else if(e.target.value < 0){
                                changeTenure(0)
                            }else{
                                changeTenure(999)
                            }
                        }}
                        />
                        <InputRightAddon 
                        color='gray.300' 
                        fontSize='1.2em'
                        p='0'
                        h='100%'
                        bg='#FAFAFA'>
                        <Select 
                        w='100%'
                        border='none'
                        value={tenureType}
                        onChange={(e) => {
                            changeTenureType(e.target.value)
                            setItemChange(false)
                        }}
                        >
                            <option>Month</option>
                            <option>Year</option>
                        </Select>
                        </InputRightAddon>
                    </InputGroup>
                </GridItem>
                <GridItem>
                    <Box>Counter Party Name</Box>
                        <Input 
                        size='sm' 
                        bg='#FAFAFA'                                        
                        p={1} 
                        textAlign='center'
                        border='1px solid #D9D9D9'
                        // border='none'
                        borderRadius={5} 
                        value={counterParty}
                        placeholder='Name' 
                        fontSize='1em'
                        onChange={(e) => {
                            changeCounterParty(e.target.value)
                            setItemChange(false)
                        }}
                        />
                </GridItem>
            </Box>
        </Box>
    </>
  )
}

export default ConfigSuplyChain
