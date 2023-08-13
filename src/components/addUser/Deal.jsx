import { getProductDataSpecific } from '@/services/cim.services'
import { Badge, Box, Checkbox, Fade, Flex, SlideFade, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import DealInfo from '../modals/DealInfo'

const Deal = ({ company, index, selectedDeals, setSelectedDeals }) => {
    const nullId = import.meta.env.VITE_NULL_ID
    const [itemCheck, setItemCheck] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [dealType, setDealType] = useState('')

    useEffect(() => {
        if(verifyDeals()){
            setItemCheck(true)
        }else{
            setItemCheck(false)
        }
    }, [selectedDeals])

    const handleDeal = (showInfo, info) => {
        if(!showInfo){
            const currentDeals = selectedDeals
            if(!verifyDeals()){
                setItemCheck(!itemCheck)
                currentDeals.push(company.userCompanyID)
                setSelectedDeals(currentDeals)            
            }else{
                const dealToDelete = selectedDeals.filter((eachDeal)=>(eachDeal === company.userCompanyID))
                const index = selectedDeals.indexOf(dealToDelete[0])
                const newArray = [...selectedDeals]
                newArray.splice(index, 1)
                setSelectedDeals(newArray)
                setItemCheck(!itemCheck)
            }
        } else {
            setDealType(info)
            setShowModal(true)
        }
    }

    const verifyDeals = () => {
        const currentSelectedDeal = selectedDeals.filter((eachDeal)=>(eachDeal === company.userCompanyID))
        return currentSelectedDeal?.length > 0
    }

  return (
    <SlideFade in={company.industryID !== nullId} offsetY={`${(index*5)+40}px`}>
        <DealInfo show={showModal} setShow={setShowModal} deal={company} dealType={dealType} />
        <Flex
        p={6}
        mb={2}
        mt={2}
        justifyContent='space-between'
        alignItems='center'
        border={itemCheck && '1px solid #086CE7'}
        borderRadius='20px'
        display={company.industryID !== nullId ? 'flex' : 'none'}
        shadow='xl'
        onClick={() => handleDeal(false)}
        >
            <Box textAlign='center'>
                <Text fontWeight={500}>{company.companyName}</Text>
                <Badge mb={0} fontWeight='light'>{company.industryName}</Badge>
            </Box>
            <Box>
                <Flex gap={4}>
                    <Badge 
                    cursor='pointer' 
                    colorScheme='blue' 
                    px={4}
                    onClick={() => {handleDeal(true, "WC")}}
                    >
                        WC
                    </Badge>
                    <Badge 
                    cursor='pointer' 
                    colorScheme='blue' 
                    px={4}
                    onClick={() => handleDeal(true, "TL")}
                    >
                        TL
                    </Badge>
                    <Badge 
                    cursor='pointer' 
                    colorScheme='blue' 
                    px={4}
                    onClick={() => handleDeal(true, "SCF")}
                    >
                        SCF
                    </Badge>
                </Flex>
            </Box>
            <Box>
                <Checkbox 
                onChange={() => handleDeal()}
                border='1px solid #eee' 
                colorScheme='blue' 
                isChecked={itemCheck} 
                />
            </Box>
        </Flex>
    </SlideFade>
  )
}

export default Deal
