import { postCurrentCompanyVPO } from '@/store/slices/companyProducts/companyProductsSilices'
import { getCurrentUserCompanyInfo } from '@/store/slices/user/userSlices'
import { Box, Button, Flex, Grid, GridItem, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, useToast } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TermLoanPayment from './TermLoanPayment'

const ConfigTermLoan = ({ loanSubtype, data, savingData, setSavingData, setCorrectPercentage, saveData, setItemChange }) => {
    const dispatch = useDispatch()
    const toast = useToast()
    const [paymentType, setPaymentType] = useState(0)
    const [paymentFrequency, setPaymentFrequency] = useState(0)
    const [currentYear, setCurrentYear] = useState([])
    const { user, userCompanyInfo } = useSelector( state => state.user)
    const [currentData, setCurrentData] = useState({})
    const [tenure, setTenure] = useState('')
    const [tenureType, setTenureType] = useState('Month')
    const [amount, setAmount] = useState('')
    const [amountType, setAmountType] = useState('Cr')
    const [moratorium, setMoratorium] = useState('')
    const [moratoriumType, setMoratoriumType] = useState('Month')
    let uploadedData = []
    let currentLoanVPO = []

    useEffect(()=>{
        if(userCompanyInfo?.companyProducts){
            uploadedData = userCompanyInfo?.companyProducts.filter((eachProduct) => eachProduct.loanSubTypeID === loanSubtype.loanSubMenuId)
            if(uploadedData.length > 0){
                changeTenure(uploadedData[0].tenure)
                changeAmount(uploadedData[0].amount)
                changeAmountType(uploadedData[0].amountType)
                changeTenureType(uploadedData[0].tenureType)
                changeMoratorium(uploadedData[0].moratorium)
                changeMoratoriumType(uploadedData[0].moratoriumType)
                changePaymentFrequency(uploadedData[0].principalpaymentFrequencyID)
                changePaymentType(uploadedData[0].principalFrequencyTypeID)
                if(data){
                    data.loanSubtype = uploadedData[0].loanSubTypeID
                    showVPO()
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
    
    const changeMoratorium = (value) => {
        if(data){
            data.moratorium = value
        }
        setMoratorium(value)
    }
    const changeMoratoriumType = (value) => {
        if(data){
            data.moratoriumType = value
        }
        setMoratoriumType(value)
    }
    const changePaymentFrequency = (value) => {
        if(data){
            data.principalpaymentFrequencyID = value
        }
        setPaymentFrequency(value)
    }
    const changePaymentType = (value) => {
        if(data){
            data.principalFrequencyTypeID = value
        }
        setPaymentType(value)
    }
    const getResultPercentage = () => {
        let error = 0
        currentYear.forEach((element, index) => {
            error = error + parseFloat(element.paymentPercentage)
        });
        return error != 100
    }
    const verifyPercentage = () => {
        if(getResultPercentage()){
            toast({
                title: 'Percentage should be 100%',
                status: 'error',
                duration: 3000,
                position: 'top'
            })
            setSavingData(false)
        }else{
            setCorrectPercentage(true)
            return true
        }
      }

    useEffect(()=>{
        if(savingData && paymentType === 'VariableOptions' && verifyPercentage()){
            dispatch(postCurrentCompanyVPO(currentYear)).then((res)=>{
                if(res.payload?.error){
                  toast({
                    title: res.payload?.message,
                    status: 'error',
                    duration: 3000,
                    position: 'top'
                  })
                }else{
                  saveData()
                  setSavingData(false)
                }
            })
        }else if(savingData){
            saveData()
            setSavingData(false)
        }
    },[savingData])

    const createArrayTemplate = (array) => {
        array.forEach((element, index) => {
            currentLoanVPO.push({
                userCompanyID: user?.userCompanyId,
                loanSubtypeID: loanSubtype.loanSubMenuId,
                paymentYear: `${index + 1} year`,
                paymentPercentage: 0,
                isActive: true,
                createdOn: null,
                createdBy: "string",
                modifiedOn: null,
                modifiedBy: "string"
              })
        })
        setCurrentYear(currentLoanVPO)
    }

    const showVPO = () => {
        if((data.tenure - data.moratorium > 0) && data.tenureType === 'Year' && data.moratoriumType === 'Year' ){
            const variableOptionsArray = []
            for(let i=0; i < (data.tenure - data.moratorium); i++){
                variableOptionsArray.push(i)
            }
            createArrayTemplate(variableOptionsArray)
        }
        else if((data.tenure - data.moratorium > 0) && data.tenureType === 'Month' && data.moratoriumType === 'Month'){
            const variableOptionsArray = []
            for(let i=0; i < Math.ceil((data.tenure - data.moratorium)/12); i++){
                variableOptionsArray.push(i)
            }
            createArrayTemplate(variableOptionsArray)
        }
        else if(data.tenureType === 'Year' && data.moratoriumType === 'Month'){
            const variableOptionsArray = []
            for(let i=0; i < Math.ceil(data.tenure - (data.moratorium/12)); i++){
                variableOptionsArray.push(i)
            }
            createArrayTemplate(variableOptionsArray)
        }
        else{
            setCurrentYear(null)
        }
    }

    const removeYear = (index) =>{
        const newArray = [...currentYear]
        newArray.splice(index, 1)
        setCurrentYear(newArray)
    }
    
    const addYear = () =>{
        const newArray = [...currentYear]
        newArray.push('1')
        setCurrentYear(newArray)
    }

    const verifyVPO = () => {
        if(paymentType === 'VariableOptions'){
            showVPO()
        }
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
                        w='20%'
                        />
                        <Input 
                        w='50%'
                        size='sm' 
                        bg='#FAFAFA'
                        type='number'                                        
                        p={1} 
                        textAlign='center'
                        border='1px solid #D9D9D9'
                        min={0}
                        // border='none'
                        value={amount}
                        max={9999}
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
                        type='number'                                        
                        p={1} 
                        textAlign='center'
                        border='1px solid #D9D9D9'
                        // border='none'
                        value={tenure}
                        borderRadius={5} 
                        placeholder='0' 
                        fontSize='1em'
                        min={0}
                        onChange={(e) => { 
                            if(e.target.value >= 0 && e.target.value <= 999){
                                changeTenure(e.target.value)
                                verifyVPO()
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
                            verifyVPO()
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
                    <Box>Moratorium</Box>
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
                        value={moratorium}
                        placeholder='0' 
                        fontSize='1em'
                        min={0}
                        onChange={(e) => { 
                            if(e.target.value >= 0 && e.target.value <= 999){
                                changeMoratorium(e.target.value)
                                verifyVPO()
                                setItemChange(false)
                            }else if(e.target.value < 0){
                                changeMoratorium(0)
                            }else{
                                changeMoratorium(999)
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
                        value={moratoriumType}
                        onChange={(e) => {
                            changeMoratoriumType(e.target.value)
                            verifyVPO()
                            setItemChange(false)
                        }}
                        >
                            <option>Month</option>
                            <option>Year</option>
                        </Select>
                        </InputRightAddon>
                    </InputGroup>
                </GridItem>
            </Box>
            <Grid
            gridTemplateColumns='1fr 1fr'
            gap={3}
            mt={3}
            fontSize='sm'
            alignContent='flex-end'
            alignItems='flex-end'
            >
                <GridItem>
                    Principal payment frequency
                    <Select value={paymentFrequency} borderColor='#D9D9D9' onChange={(e)=>{                        
                        changePaymentFrequency(e.target.value)
                        setItemChange(false)
                        }} placeholder='Select principal payment frequency'>
                        <option value='Monthly'>Monthly</option>
                        <option value='Quaterly '>Quaterly </option>
                        <option value='HalfYearly'>HalfYearly</option>
                        <option value='Yearly'>Yearly</option>
                        <option value='Bullet'>Bullet</option>
                    </Select>
                </GridItem>
                <GridItem>
                    Payment type
                    <Select value={paymentType} borderColor='#D9D9D9' onChange={(e)=>{
                        changePaymentType(e.target.value)
                        setItemChange(false)
                    }} placeholder='Select payment type'>
                        <option value='EquatedAmount'>Equated Amount (EMI)</option>
                        <option value='VariableOptions'>Variable Payment Options</option>
                    </Select>
                </GridItem>
            </Grid>
            {
                paymentType === 'VariableOptions' && currentYear &&
                <Grid 
                bg='#D9D9D9'
                padding={2}
                // display='inline-block'
                mt={2}
                borderRadius={5}
                templateColumns={['repeat(2, 1fr)','repeat(2, 1fr)','repeat(4, 1fr)','repeat(4, 1fr)']}
                gap={2}
                w='auto'
                >
                    {
                        currentYear && currentYear.length > 0 && currentYear.map((year, index)=>(
                            <TermLoanPayment 
                            key={index} 
                            index={index} 
                            removeYear={removeYear} 
                            loanSubtype={loanSubtype} 
                            currentVPOYear={currentYear[index]} 
                            savingData={savingData}
                            setSavingData={setSavingData}
                            setItemChange={setItemChange}
                            />
                        ))
                    }
                    <Button 
                    color='#4C5EFE'
                    border='none'
                    bg='transparent'
                    onClick={()=>addYear()}
                    >Add year</Button>
                </Grid>
            }
        </Box>
    </>
  )
}

export default ConfigTermLoan
