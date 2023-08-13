import { Box, Flex, Image, Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import React from 'react'
import TrashIcon from '@/assets/icons/productTrashIcon.svg'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postCurrentCompanyVPO } from '@/store/slices/companyProducts/companyProductsSilices'
import { useState } from 'react'

const TermLoanPayment = ({ index, removeYear, loanSubtype, currentVPOYear, savingData, setSavingData, setItemChange }) => {
    const dispatch = useDispatch()
    const { userCompanyInfo } = useSelector( state => state.user)
    const [vpoYear, setVpoYear] = useState('')
  const ordinalIndex = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

useEffect(()=>{
    if(userCompanyInfo?.companyPaymentType){
        const currentPercentage = userCompanyInfo?.companyPaymentType.filter((eachPercentage) =>
        (eachPercentage?.loanSubTypeID === loanSubtype?.loanSubMenuId))
        if(currentVPOYear){
            const valueYear = currentPercentage.filter((year) => (parseFloat(year.paymentYear.split(' ')[0]) === index + 1))
            changeVPOYear(valueYear[0]?.paymentPercentage)
        }
    }
},[userCompanyInfo?.companyPaymentType, currentVPOYear])

const changeVPOYear = (value) => {
    if(currentVPOYear){
        currentVPOYear.paymentPercentage = value
    }
    setVpoYear(value)
}

  return (
    <Flex  
    bg='white' 
    borderRadius={5}
    p={1}
    alignContent='center'
    // maxW='30%'
    >
        <Flex p={1} gap={2} alignItems='center' fontSize={12}>
            <Box>{ordinalIndex(index + 1)}</Box>
            <InputGroup 
            h='100%'
            size='sm' 
            pr={0} 
            pl={0} 
            borderRight='1px solid gray'
            borderLeft='1px solid gray'
            >
                <Input 
                type='number'
                // w='30%'
                min={0} 
                placeholder='enter' 
                h='100%' 
                border='none'
                textAlign='center'
                pr={0}
                value={vpoYear}
                onChange={(e) => {
                    changeVPOYear(e.target.value)
                    setItemChange(false)
                }} 
                />
                <InputRightAddon 
                // w='10%' 
                fontSize={12} 
                children='%' 
                h='100%' 
                bg='none'
                border='none' 
                pl={0}
                />
            </InputGroup>
            <Image onClick={()=>removeYear(index)} h='60%' src={TrashIcon} alt='trash icon' />
        </Flex>     
    </Flex>
  )
}

export default TermLoanPayment
