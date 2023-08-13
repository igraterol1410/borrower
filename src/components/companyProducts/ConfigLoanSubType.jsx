import React from 'react'
import { Box, GridItem, Input, InputGroup, InputLeftAddon, InputRightAddon, Select } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const ConfigLoanSubType = ({ loanSubtype, data, setItemChange }) => {
    const { userCompanyInfo } = useSelector( state => state?.user )
    const [currentData, setCurrentData] = useState(null)
    const [tenure, setTenure] = useState('')
    const [tenureType, setTenureType] = useState('Month')
    const [amount, setAmount] = useState('')
    const [amountType, setAmountType] = useState('Cr')
    let uploadedData = []

    useEffect(()=>{
        if(userCompanyInfo?.companyProducts){
            uploadedData = userCompanyInfo?.companyProducts.filter((eachProduct) => eachProduct.loanSubTypeID === loanSubtype.loanSubMenuId && eachProduct.loanSubTypeGroupID === loanSubtype.loanSubTypeGroupID)
            if(uploadedData.length > 0){
                changeTenure(uploadedData[0].tenure)
                changeAmount(uploadedData[0].amount)
                changeAmountType(uploadedData[0].amountType)
                changeTenureType(uploadedData[0].tenureType)
                if(data){
                    data.loanSubtype = uploadedData[0].loanSubTypeID
                    data.loanSubTypeGroupID = uploadedData[0].loanSubTypeGroupID
                }
            }
            setCurrentData(uploadedData)
        }
    },[data])

    const changeTenure = (value) => {
        if(data){
            data.tenure = value
        }
        setTenure(value)
    }
    const changeAmount = (value) => {
        if(data){
            data.amount = value
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
        }
        setAmountType(value)
    }
    const changeTenureType = (value) => {
        if(data){
            data.tenureType = value
        }
        setTenureType(value)
    }

  return (
    <Box
    border='1px dashed #37404D'
    borderRadius={10}
    p='1rem'
    mt={3}
    >
        <Box
        zIndex='10'
        display='grid'
        gridTemplateColumns={['1fr','1fr','1fr 1fr 1fr','1fr 1fr 1fr']}
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
                <Box>Tenure</Box>
                <InputGroup 
                size='md' 
                bg='#FAFAFA'
                border='1px solid #D9D9D9'
                >
                    <Input 
                    size='sm' 
                    bg='#FAFAFA' 
                    type='number'                                        
                    p={1} 
                    textAlign='center'
                    border='1px solid #D9D9D9'
                    // border='none'
                    borderRadius={5} 
                    placeholder='0'
                    min={0} 
                    value={tenure}
                    fontSize='1em'
                    onChange={(e) => {
                        if(e.target.value >= 0 && e.target.value <= 999){
                            changeTenure(e.target.value)
                            setItemChange(false)
                        }else if(e.target.value < 0){
                            changeTenure(0)
                        }else{
                            changeTenure(999)
                        }
                    }
                    }
                    />
                    <InputRightAddon 
                    color='gray.300' 
                    fontSize='1.2em'
                    p='0'
                    bg='#FAFAFA'
                    h='100%'
                    >
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
                <Box>Amount</Box>
                <InputGroup 
                size='md' 
                bg='#FAFAFA'
                border='1px solid #D9D9D9'
                >
                    <InputLeftAddon 
                    color='gray.300' 
                    fontSize='1.6em' 
                    children='₹' 
                    bg='#FAFAFA'
                    />
                    <Input 
                    size='sm' 
                    bg='#FAFAFA' 
                    type='number'                                        
                    p={1} 
                    textAlign='center'
                    border='1px solid #D9D9D9'
                    value={amount}
                    min={0}
                    max={9999}
                    borderRadius={5} 
                    placeholder='0.0' 
                    fontSize='1em'
                    onChange={(e) => {
                        changeAmount(e.target.value)
                        setItemChange(false)
                    }
                    }
                     />
                    <InputRightAddon 
                    color='gray.300' 
                    fontSize='1.2em'
                    p='0'
                    bg='#FAFAFA'
                    h='100%'>
                    <Select 
                    w='100%'
                    border='none'
                    value={amountType}
                    onChange={(e) => {
                        changeAmountType(e.target.value)
                        setItemChange(false)
                    }
                    }
                    >
                        <option>Cr</option>
                        <option>Lakh</option>
                    </Select>
                    </InputRightAddon>
                </InputGroup>
            </GridItem>
        </Box>
    </Box>
  )
}

export default ConfigLoanSubType
