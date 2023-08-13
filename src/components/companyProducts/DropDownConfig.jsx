import React, { useRef, useEffect, useState } from 'react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, FormControl, FormLabel, Grid, GridItem, Image, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Select, Switch, Text, useDimensions } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import DeleteBankIcon from '@/assets/icons/deleteBankSelected.svg'

import { BsDot, BsChevronRight } from "react-icons/bs";
import SecurityWorkingCapital from '../workingCapital/SecurityWorkingCapital';
import DeleteItem from '../modals/DeleteItem';
import ProductSecurity from './ProductSecurity';

const DropDownConfig = ({ selectedLoanSubtypes, fundedLoanSubtypes, nonFundedLoanSubtypes, loanSubtypeSecurity, loanSubtypes, setSelectedAction, mainTitle, dropDownText, securityConfig, security, setSecurity, loanTypeID, setItemChange, setSecurityData, securityData }) => {
    
    const { user, userCompanyInfo } = useSelector( state => state?.user )
    const nullId = import.meta.env.VITE_NULL_ID
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [securityProduct, setSecurityProduct] = useState(false)
    const [securitySwitch, setSecuritySwitch] = useState(false)
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(false)
    let newSelectedLoan = []

    useEffect(() => {
        if(userCompanyInfo?.companySecurity && securityConfig){
            if(getLoanSecurity(loanTypeID)){
                if(!security){
                    setSecurity(true)
                }
            }
        }
    }, [userCompanyInfo?.companySecurity, securityConfig])

    const displayLoansubtype = (parentId) => {
        return parentId !== nullId ? 'none' : 'block'
    }
    
    const hasChildren = (parentId) => {
        return loanSubtypes?.some(elem => elem?.parentId === parentId)
    }
    
    const getChildren = (parentId) => {
        const children = loanSubtypes.filter((eachLoan)=>(eachLoan?.parentId === parentId))
        return children
    }

    const selectCurrentLoan = (loan) => {
        // console.log(loan)
        setItemChange(false)
        const loanSubtypeToAdd = {
            text: loan.text,
            isFunded: loan.isFunded,
            isParanet: loan.isParanet,
            loanSubMenuId: loan.loanSubMenuId,
            parentId: loan.parentId,
        }
        if(loan.parentId !== nullId){
            const parent = loanSubtypes.filter((eachLoanSubtype) => eachLoanSubtype.loanSubMenuId === loan.parentId)
            loanSubtypeToAdd.parentText = parent[0].text
        }
        if(selectedLoanSubtypes.length > 0){
            if(!selectedLoanSubtypes.some((element)=>(element.text === loan.text))){
                newSelectedLoan = [...selectedLoanSubtypes, loanSubtypeToAdd]        
                dispatch(setSelectedAction(newSelectedLoan))
            }
        }else{
        newSelectedLoan = [loanSubtypeToAdd]           
        dispatch(setSelectedAction(newSelectedLoan))
        }
    }

    const getLoanSecurity = (loanTypeID) => {
        const loanSecured = userCompanyInfo?.companySecurity?.filter((eachItem) => (eachItem.loanTypeID === loanTypeID))
        // console.log(loanSecured)
        return loanSecured && loanSecured.length > 0
    }

    const deleteSelectedLoan = (loan) => {
        const newArray = selectedLoanSubtypes.filter((eachLoan) =>(eachLoan != loan))
        dispatch(setSelectedAction(newArray))
        if(securityProduct){
            setSecurity(false)
            setSecurityProduct(false)
        }
    }

    const showDeleteSelectedLoan = (loan) => {
        setItem(loan)
        if(selectedLoanSubtypes.length === 1 && getLoanSecurity(loanTypeID)){
            setSecurityProduct(true)
            setSecuritySwitch(false)
        }else{
            setSecurityProduct(false)
            setSecuritySwitch(false)
        }
        setShowModal(true)
    }

    const changeSecurity = () => {
        if(getLoanSecurity(loanTypeID) && security){
            setSecurityProduct(true)
            setSecuritySwitch(true)
            setShowModal(true)
        }else{
            setItemChange(false)
            if(security){
                setSecurity(false)
            }else{
                setSecurity(true)
            }
        }
    }
    
    const cancelAction = () => {
        setSecurityProduct(false)
        setSecuritySwitch(false)
        setShowModal(false)
    }

  return (
    <Box
    border='1px dashed #37404D'
    borderRadius={10}
    p='1rem'
    bg='white'
    mt={3}
    >
        <DeleteItem 
        show={showModal} 
        setShow={cancelAction} 
        action={deleteSelectedLoan} 
        item={item} 
        security={securityProduct} 
        loanTypeID={loanTypeID} 
        switchAction={securitySwitch}
        setSecurity={setSecurity}
        setLoading={setLoading}
        />

        <Text fontSize='sm' mb={2}>
            {mainTitle}
        </Text>
      <Grid
        border='1px solid #D9D9D9'
        borderRadius={8}
        bg='#FAFAFA'
        p={3}
        position='relative'
        gridTemplateColumns={['repeat(2, 1fr)','repeat(2, 1fr)','repeat(4, 1fr)','repeat(4, 1fr)']}
        gap={3}
        >
            {
                selectedLoanSubtypes.length > 0 
                ?
                selectedLoanSubtypes.map((loanSubtype, index)=>(
                <GridItem
                bg='#CFCFFF'
                fontSize='xs'
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
                        <Text verticalAlign='middle' color='black'>
                            {loanSubtype.parentText ? `${loanSubtype.parentText} > ${loanSubtype.text}` : `${loanSubtype.text}`}
                        </Text>
                        <Image 
                        src={DeleteBankIcon} 
                        alt='delete icon'
                        onClick={()=>showDeleteSelectedLoan(loanSubtype)} />
                    </Flex>
                </GridItem>
                ))
                :
                <GridItem fontSize='xs' textAlign='center' colSpan={4}>
                    {dropDownText}
                </GridItem>
            }
            <Menu 
            closeOnSelect={false}
            strategy='fixed'
                >
                <MenuButton
                position='absolute'
                w='100%'
                h='100%'
                bg='transparent'
                border='none'
                zIndex='1'
                />
                <MenuList
                overflowY='scroll'
                // position='relative'
                borderRadius={12}
                padding='.75rem'
                maxH='40vh'
                minW='400px'
                zIndex='20'
                boxShadow='0px 0px 40px rgba(0, 0, 0, 0.2)'
                >
                <MenuGroup title={mainTitle === 'Working Capital' ? 'Fund Based' : ''} color='#355ADA'>
                    {
                        fundedLoanSubtypes && fundedLoanSubtypes.map((eachSubtype, index)=>(
                            <MenuItem 
                            border='none'
                            borderBottom='1px solid #ECECEC'
                            padding={3}
                            display={displayLoansubtype(eachSubtype?.parentId)}
                            key={index}
                            fontSize='xs'
                            onClick={()=>selectCurrentLoan(eachSubtype)}
                            >
                                <Box
                                w='100%'
                                >
                                   {hasChildren(eachSubtype?.loanSubMenuId) ? <BsChevronRight /> : <BsDot />} {eachSubtype?.text}
                                </Box>
                            </MenuItem>
                        ))
                    }
                </MenuGroup>
                <MenuGroup title={mainTitle === 'Working Capital' ? 'Non Fund Based' : ''} color='#355ADA'>
                    {
                        nonFundedLoanSubtypes && nonFundedLoanSubtypes.map((eachSubtype, index)=>(
                            <Box                            
                            key={index}
                            >
                                {
                                    hasChildren(eachSubtype?.loanSubMenuId) 
                                    ?
                                    (
                                    <MenuItem
                                    border='none'
                                    _hover={{background:'none'}}
                                    pl={0}
                                    // borderBottom='1px solid #ECECEC'
                                    >
                                        <Accordion w='100%' allowToggle>
                                            <AccordionItem>
                                                <AccordionButton border='none'
                                                bg='transparent'
                                                fontSize='xs'
                                                borderBottom='1px solid #ECECEC'
                                                // p={3}
                                                >
                                                <AccordionIcon />
                                                    <Box>
                                                    {eachSubtype?.text}
                                                    </Box>
                                                </AccordionButton>
                                                <AccordionPanel pl={0} pb={4}>
                                                    <Box>
                                                        {
                                                            getChildren(eachSubtype?.loanSubMenuId).map((eachChild, index)=>(
                                                                <Box 
                                                                key={index}
                                                                border='none'
                                                                borderBottom='1px solid #ECECEC'
                                                                padding={3}
                                                                px={5}
                                                                fontSize='xs'
                                                                _hover={{background:'#ECECEC'}}
                                                                onClick={()=>{
                                                                    selectCurrentLoan(eachChild)
                                                                }}
                                                                > 
                                                                <BsDot />
                                                                {eachChild?.text}
                                                                </Box>
                                                            ))
                                                        }
                                                    </Box>
                                                </AccordionPanel>
                                            </AccordionItem>
                                        </Accordion>
                                    </MenuItem>
                                    )
                                    :
                                   <MenuItem 
                                   border='none'
                                   borderBottom='1px solid #ECECEC'
                                   padding={3}
                                   display={displayLoansubtype(eachSubtype?.parentId)}
                                   fontSize='xs'
                                   // onClick={()=>selectCurrentBank(bank)}
                                   >
                                    {hasChildren(eachSubtype?.loanSubMenuId) ? '' : <BsDot />}
                                    {eachSubtype?.text} 
                                   </MenuItem>
                                }
                            </Box>
                        ))
                    }
                </MenuGroup>
                </MenuList>
            </Menu>
        </Grid>
        <FormControl m={0} mt={2} p={0} display='flex' alignItems='center'>
            <FormLabel p={0} htmlFor='security' mb='0'>
                Choose security
            </FormLabel>
            <Switch colorScheme='purple' isChecked={security} isFocusable={false} p={0} disabled={selectedLoanSubtypes.length === 0 || loading} onChange={changeSecurity} id='security' mr={2} />
            {security ? 'Secured' : 'Unsecured'}
        </FormControl>
        {
            security &&
            <Box
            borderRadius={10}
            mt={4}
            >
                <ProductSecurity
                loanSubtypeSecurity={loanSubtypeSecurity} 
                securityConfig={securityConfig}
                loanTypeID={loanTypeID} 
                setItemChange={setItemChange}
                securityData={securityData}
                setSecurityData={setSecurityData}
                />
                {/* <Grid
                templateColumns={['1fr', '1fr','1fr 1fr 1fr 1fr','1fr 1fr 1fr 1fr']}
                mt={2}
                gap={3}
                alignItems='center'
                justifyContent='center'
                >
                    {
                        loanSubtypeSecurity && loanSubtypeSecurity.map((security, index)=>(
                        <SecurityWorkingCapital 
                        loanSubtypeSecurity={security} 
                        key={index} 
                        securityConfig={securityConfig} 
                        index={index} 
                        loanTypeID={loanTypeID} 
                        setItemChange={setItemChange}
                         />
                        ))
                    }
                </Grid> */}
            </Box>
        }
    </Box>
  )
}

export default DropDownConfig
