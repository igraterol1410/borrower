import React, { useEffect, useState } from 'react'
import SectionTitle from '@/components/dashboard/SectionTitle'
import { Box, Flex, Grid, GridItem, Image, List, ListItem, Skeleton, Text, Textarea, UnorderedList } from '@chakra-ui/react'
import Proposal from '@/assets/terms-sheet/proposal.svg'
import Security from '@/assets/terms-sheet/security.svg'
import Tenure from '@/assets/terms-sheet/tenure.svg'
import OtherSecurity from '@/assets/terms-sheet/other-security.svg'
import Covenants from '@/assets/terms-sheet/covenants.svg'
import Facilities from '@/assets/terms-sheet/facilities.svg'
import Repayments from '@/assets/terms-sheet/repayments.svg'
import Prepayments from '@/assets/terms-sheet/pre-payments.svg'
import ProcessingFee from '@/assets/terms-sheet/processing-fee.svg'
import Insurance from '@/assets/terms-sheet/insurance.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentBankingArrangments } from '@/store/slices/cim/cimSlices'
import FacilitiesTable from '@/components/termsSheet/FacilitiesTable'
import ButtonsBox from '@/components/dashboard/ButtonsBox'
import TextareaTermsSheet from '@/components/termsSheet/TextareaTermsSheet'
import { getCurrentTerms, saveCurrentTerm } from '@/store/slices/termsSheet/termsSheetSlices'
import { setUserCompanyInfo } from '@/store/slices/user/userSlices'
import { useNavigate } from 'react-router-dom'
import { getTermsSecurity, getTermsSecurity2 } from '@/services/termsSheet.services'

const TermsSheet = ({ modal }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, userCompanyInfo } = useSelector(state => state?.user)
    const { termsSheetInfo, termsSheetLoading } = useSelector(state => state?.termSheet)
    const [proposalInfo, setProposalInfo] = useState('')
    const [securityConditions, setSecurityConditions] = useState('')
    const [covenants, setCovenants] = useState('')
    const [insurance, setInsurance] = useState('')
    const [processingFee, setProcessingFee] = useState('')
    const [purpose, setPurpose] = useState('')
    const [prepayment, setPrepayment] = useState('')
    const [termsSecurityst, setTermsSecurityst] = useState('')
    const [termsSecuritylt, setTermsSecuritylt] = useState('')
    const [loading, setLoading] = useState(false)
    const [hasChange, setHasChange] = useState(0)
    const allLoanTypes = ['WORKING CAPITAL', 'TERM LOAN', 'SUPPLY CHAIN']

    useEffect(() => {
        if(user?.userCompanyId){
            dispatch(getCurrentTerms({userCompanyId: user?.userCompanyId}))
        }
    },[user?.userCompanyId])

    useEffect(() => {
        setHasChange(hasChange + 1)
    },[securityConditions,covenants,insurance,processingFee,purpose,prepayment])

    useEffect(() => {
        if(termsSheetInfo){
            setValues()
        }
    },[termsSheetInfo])
    
    useEffect(() => {
        setLoading(true)
        if(user?.userCompanyId){
            getTermsSecurity(user?.userCompanyId).then(({data}) => {
                const ltermLoan = data.filter((loan)=>(loan.loanType.toUpperCase() === 'LONG TERM'))
                const stermLoan = data.filter((loan)=>(loan.loanType.toUpperCase() === 'SHORT TERM'))
                setTermsSecuritylt(ltermLoan)
                setTermsSecurityst(stermLoan)
                setLoading(false)
            })
        }
    },[user?.userCompanyId])

    const setValues = () => {
        setSecurityConditions(termsSheetInfo?.otherSecurityConditions)
        setCovenants(termsSheetInfo?.covenants)
        setInsurance(termsSheetInfo?.insurance)
        setPrepayment(termsSheetInfo?.prepayment)
        setProcessingFee(termsSheetInfo?.processingFess)
        setPurpose(termsSheetInfo?.purpose)        
        setHasChange(1)
    }
    
    useEffect(() => {
        if(userCompanyInfo?.companyProducts){
            let kindofProduct = []
            allLoanTypes.forEach((loanType) => {
                const selectedProducts = userCompanyInfo?.companyProducts.filter((product) => (product.loanTypeName).toUpperCase() === loanType)
                if(selectedProducts.length > 0){
                    kindofProduct.push(selectedProducts[0].loanTypeName)
                }
            });
            setProposalInfo(kindofProduct.toString())
        }
    },[userCompanyInfo])

    const handleSave = () => {
        const data = {
          usercompanyID: user?.userCompanyId,
          purpose: purpose,
          otherSecurityConditions: securityConditions,
          prepayment: prepayment,
          covenants: covenants,
          processingFess: processingFee,
          insurance: insurance,
          createdBy: user?.userCompanyId
        }
        dispatch(saveCurrentTerm(data))
        dispatch(setUserCompanyInfo({...userCompanyInfo, userTermSheet:data}))
        navigate('/landing')
    }

  return (
    <Box px={3}>
        {
            !modal &&
                <SectionTitle title='Terms Sheet' text='Please Enter Your Terms' />
        }
      <Grid
      templateColumns={['1fr','1fr 1fr']}
      gap={[2,2]}
      py={[2,4]}
      >
        <GridItem
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        gap={6}
        >
            <Flex 
            alignItems='center'
            gap={[2,4]}>
                <Image w={['25px','35px']} src={Proposal} alt='Proposal image' />
                <Box>
                    <Text fontSize={['sm']} fontWeight='bold'>Proposal</Text>
                    <Text fontSize={['sm']} mb={0}>{proposalInfo}</Text>
                </Box>
            </Flex>
            <Flex 
            alignItems='center'
            gap={[2,4]}>
                <Image w={['25px','35px']} src={Security} alt='Proposal image' />
                <Box>
                    <Text fontSize={['sm']} fontWeight='bold'>Security</Text>
                    <Skeleton isLoaded={!loading}>
                        <Grid templateColumns='auto auto auto' gap={2}>
                            {
                                termsSecuritylt && termsSecuritylt.length > 0 &&
                                <GridItem><Text mb={0} fontWeight='bold'>LT - </Text></GridItem>
                            }
                            {
                                termsSecuritylt && termsSecuritylt.map((sec, index) => (
                                    <GridItem key={index} fontSize={['xs','sm']} borderRight='1px solid gray' pr={1}>
                                        {sec.companySecurityName}
                                    </GridItem>
                                ))
                            }
                        </Grid>
                        <Flex wrap='wrap' gap={2}>
                            {
                                termsSecurityst && termsSecurityst.length > 0 &&
                                <GridItem><Text mb={0} fontWeight='bold'>ST - </Text></GridItem>
                            }
                            {
                                termsSecurityst && termsSecurityst.map((sec, index) => (
                                    <GridItem key={index} fontSize={['xs','sm']} borderRight='1px solid gray' pr={1}>
                                        {sec.companySecurityName}
                                    </GridItem>
                                ))
                            }
                        </Flex>
                    </Skeleton>
                </Box>
            </Flex>
            <Flex 
            alignItems='center'
            gap={[2,4]}>
                <Image w={['25px','35px']} src={OtherSecurity} alt='Proposal image' />
                <Box w='100%'>
                    <Text fontSize={['sm']} fontWeight='bold'>Other Security Conditions</Text>
                    {
                        modal 
                        ?
                        <UnorderedList>
                            <ListItem>{securityConditions}</ListItem>
                        </UnorderedList>
                        :
                        <TextareaTermsSheet disable={modal ? true : false} value={securityConditions} setVariable={setSecurityConditions} />
                    }
                </Box>
            </Flex>
            <Flex 
            alignItems='center'
            gap={[2,4]}>
                <Image w={['25px','35px']} src={Covenants} alt='Proposal image' />
                <Box w='100%'>
                    <Text fontSize={['sm']} fontWeight='bold'>Covenants</Text>
                    {
                        modal
                        ?
                        <UnorderedList>
                            <ListItem>{covenants}</ListItem>
                        </UnorderedList>
                        :
                        <TextareaTermsSheet disable={modal ? true : false} value={covenants} setVariable={setCovenants} />
                    }
                </Box>
            </Flex>
        </GridItem>
        <GridItem>
            <Flex gap={4} alignItems='flex-start' direction={['column','row']}>
                <Image display={['none','block']} w={['20px','35px']} src={Facilities} alt='table' />
                <FacilitiesTable 
                bankingArrangments={userCompanyInfo?.companyProducts}
                hasChange={hasChange}
                setHasChange={setHasChange}
                />
            </Flex>
            <Grid
            m='auto'
            templateColumns={['1fr','1fr 1fr']}
            mt={4}
            gap={4}
            >
                <GridItem>
                    <Flex 
                        alignItems='center'
                        gap={[2,4]}>
                        <Image w={['25px','35px']} src={Repayments} alt='Proposal image' />
                        <Box>
                            <Text fontSize={['sm']} fontWeight='bold'>Repayments</Text>
                            <Text fontSize={['sm']} mb={0}>Quarterly installments</Text>
                        </Box>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex 
                        alignItems='center'
                        gap={[2,4]}>
                        <Image w={['25px','35px']} src={Prepayments} alt='Proposal image' />
                        <Box w='100%'>
                            <Text fontSize={['sm']} fontWeight='bold'>Pre Payments</Text>
                            {
                                modal
                                ?
                                <UnorderedList>
                                    <ListItem>{prepayment}</ListItem>
                                </UnorderedList>
                                :
                                <TextareaTermsSheet disable={modal ? true : false} value={prepayment} setVariable={setPrepayment} />
                            }
                        </Box>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex 
                        alignItems='center'
                        gap={[2,4]}>
                        <Image w={['25px','35px']} src={ProcessingFee} alt='Proposal image' />
                        <Box w='100%'>
                            <Text fontSize={['sm']} fontWeight='bold'>Processing Fee</Text>
                            {
                                modal
                                ?
                                <UnorderedList>
                                    <ListItem>{processingFee}</ListItem>
                                </UnorderedList>
                                :
                                <TextareaTermsSheet disable={modal ? true : false} value={processingFee} setVariable={setProcessingFee} />
                            }
                        </Box>
                    </Flex>
                </GridItem>
                <GridItem>
                    <Flex 
                        alignItems='center'
                        gap={[2,4]}>
                        <Image w={['25px','35px']} src={Insurance} alt='Proposal image' />
                        <Box w='100%'>
                            <Text fontSize={['sm']} fontWeight='bold'>Insurance</Text>
                            {
                                modal
                                ?
                                <UnorderedList>
                                    <ListItem>{insurance}</ListItem>
                                </UnorderedList>
                                :
                                <TextareaTermsSheet disable={modal ? true : false} value={insurance} setVariable={setInsurance} />
                            }
                        </Box>
                    </Flex>
                </GridItem>
            </Grid>
        </GridItem>
      </Grid>
        <Flex 
            alignItems='center'
            px={2}
            gap={[2,4]}>
            <Image w={['25px','35px']} src={Insurance} alt='Proposal image' />
            <Box w='100%'>
                <Text fontSize={['sm']} fontWeight='bold'>Purpose</Text>
                {
                    modal
                    ?
                    <UnorderedList>
                        <ListItem>{purpose}</ListItem>
                    </UnorderedList>
                    :
                    <TextareaTermsSheet disable={modal ? true : false} value={purpose} setVariable={setPurpose} width='95%' />
                }
            </Box>
        </Flex>
        {
            !modal &&
                <ButtonsBox
                primaryLabel='Save'
                secundaryLabel='Cancel'
                confirmAction={handleSave}
                isLoading={termsSheetLoading}
                disabledConditions={!(hasChange > 2)}
                cancelAction={setValues}
                />
        }
    </Box>
  )
}

export default TermsSheet
