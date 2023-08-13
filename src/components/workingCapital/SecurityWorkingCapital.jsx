import React, { useEffect, useState } from 'react'
import { Box, Flex, Checkbox, GridItem, InputGroup, Input, InputRightAddon } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import ProductSecurity from '../companyProducts/ProductSecurity'

const SecurityWorkingCapital = ({ loanSubtypeSecurity, securityConfig, index, loanTypeID, setItemChange }) => {
    const { userCompanyInfo } = useSelector( state => state?.user )
    const [itemChecked, setIitemChecked] = useState(false)
    const [currentItem, setCurrentItem] = useState()
    let uploadedData = []
    let uploadedItem = []

    useEffect(()=>{
        if(userCompanyInfo?.companySecurity){
            uploadedData = userCompanyInfo?.companySecurity.filter((eachSecurity) => eachSecurity.loanTypeID === loanTypeID)
            uploadedItem = uploadedData?.filter((eachItem) => (eachItem.name === loanSubtypeSecurity.companySecurityName))
            if(uploadedItem.length > 0){
                changeItem(uploadedItem[0].value)
            }
        }
    },[securityConfig])

    const changeItem = (value) => {
        if(loanSubtypeSecurity?.controlType === 'checkbox'){
            if(value === 'true'){
                setIitemChecked(true)
            }
            if(value === 'false'){
                setIitemChecked(false)
            }
        }
        if(securityConfig[index]){
            securityConfig[index].itemValue = value
        }
        setCurrentItem(value)
    }

    useEffect(() => {
        if(loanSubtypeSecurity.companySecurityID && securityConfig[index]){
            securityConfig[index].companySecurityID = loanSubtypeSecurity?.companySecurityID
            if (loanSubtypeSecurity?.controlType === 'checkbox') {
                securityConfig[index].itemValue = false
            }
            else {
                securityConfig[index].itemValue = null
            }
        }
    }, [loanSubtypeSecurity.companySecurityID, securityConfig[index]])

    return (
        <GridItem
            fontSize='xs'
            h='100%'
        >
            <Flex
                h='100%'
                cursor='pointer'
                gap={2}
                justifyContent='space-arround'
                alignContent='center'
                boxShadow='0px 0px 30px rgba(0, 0, 0, 0.1)'
                px={3}
                py={1}
                borderRadius='5px'
            >
                {
                    loanSubtypeSecurity?.controlType === 'checkbox' &&
                    <Checkbox
                        fontSize='10px !important'
                        colorScheme='purple'
                        borderColor='purple'
                        isChecked={itemChecked}
                        value={loanSubtypeSecurity?.companySecurityName}
                        onChange={(e) => {
                            securityConfig[index].itemValue = !itemChecked
                            setIitemChecked(!itemChecked)
                            setItemChange(false)
                        }}
                        size='sm'>
                        {loanSubtypeSecurity?.companySecurityName}
                    </Checkbox>
                }
                {
                    loanSubtypeSecurity?.controlType === 'textbox-withpercentsign' &&
                    <InputGroup size='sm' alignItems='center'>
                        <Box>{loanSubtypeSecurity?.companySecurityName}</Box>
                        <Input
                            type='number'
                            pr={0}
                            min={0}
                            max={999}
                            placeholder='enter'
                            w='50%'
                            h='100%'
                            border='none'
                            value={currentItem}
                            textAlign='center'
                            onChange={(e) => {
                                if(e.target.value <= 999 && e.target.value >= 0){
                                    changeItem(e.target.value)
                                    setItemChange(false)
                                }else if (e.target.value >= 999) {
                                    changeItem(999)
                                    setItemChange(false)
                                }
                            }} />
                        <InputRightAddon w='10%' fontSize={10} children='%' h='100%' bg='none'
                            border='none' />
                    </InputGroup>
                }
                {
                    loanSubtypeSecurity?.controlType === 'textbox' &&
                    <InputGroup size='sm' alignItems='center'>
                        <Box>{loanSubtypeSecurity?.companySecurityName}</Box>
                        <Input
                            pr={0}
                            placeholder='enter'
                            h='100%'
                            border='none'
                            value={currentItem}
                            textAlign='center'
                            onChange={(e) => {
                                changeItem(e.target.value)
                                setItemChange(false)
                                }} />
                    </InputGroup>
                }
            </Flex>
        </GridItem>
    )
}
export default SecurityWorkingCapital
