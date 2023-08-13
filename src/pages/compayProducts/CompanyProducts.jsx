import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentLoanTypes } from '@/store/slices/loanTypes/loanTypesSlices'
import SectionTitle from '@/components/dashboard/SectionTitle'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Spinner } from '@chakra-ui/react'
import WorkingCapitalSection from '@/components/workingCapital/WorkingCapitalSection'
import TermLoanSection from '@/components/termLoan/TermLoanSection'
import SupplyChainSection from '@/components/supplyChain/SupplyChainSection'
import { getCurrentChooseSecurityItems } from '@/store/slices/companyProducts/companyProductsSilices'

const CompanyProducts = () => {
  const dispatch = useDispatch()
  const { loanTypes, loanTypesLoading } = useSelector( state => state?.loanTypes)

  useEffect(()=>{
    dispatch(getCurrentLoanTypes(1))
    dispatch(getCurrentChooseSecurityItems())
  },[])

  return (
    <Box 
    p='0 1.5rem'>
      {
        loanTypesLoading && 
        <Spinner 
        position='absolute'
        top='50%'
        left='50%' 
        />
      }
      <SectionTitle 
      title='Products required' 
      text='Please select your preferences'
      />
      <Accordion 
      w='100%' 
      allowMultiple
      defaultIndex={[0,1,2]}
      // defaultIsOpen
      // defaultIndex={10}
      >
        {
          loanTypes && loanTypes.map((loanType, index)=>(
            <AccordionItem 
            id={index}
            key={index}
            bg='transparent'          
            >
              <AccordionButton
              border='none'
              bg='transparent'
              borderBottom='1px solid #EBEBEB'>
                <Box as="span" flex='1' textAlign='left'>
                  {loanType?.description}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} >
                {
                  loanType?.loanTypeId === "d399d34a-8424-48e6-acec-6de953da8480"
                  ?
                  <WorkingCapitalSection />
                  :
                  (
                    loanType?.loanTypeId === '60bab611-07f8-4788-b5d0-890db4806d58'
                    ?
                    <TermLoanSection />
                    :
                    <SupplyChainSection />
                  )
                }
              </AccordionPanel>
            </AccordionItem>
          ))
        }
      </Accordion>
    </Box >
  )
}

export default CompanyProducts
