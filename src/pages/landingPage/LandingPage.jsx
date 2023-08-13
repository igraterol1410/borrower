import React, { useEffect, useState } from 'react'
import Navbar from '@/components/dashboard/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllInfo, getCurrentCompanyId, getCurrentUserStatuses, setCompanyId, setUserCompanyInfo, updateUser } from '@/store/slices/user/userSlices'
import { 
    Box, 
    Flex, 
    Grid, 
    GridItem, 
    Image,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon, 
    Text,
    Spinner} from '@chakra-ui/react'
import WelcomeLAnding from '@/components/landingPage/WelcomeLanding'
import BankImage1 from '@/assets/icons/bank-image-1.svg'

import EmailIcon from '@/assets/landing/landingEmailIcon.svg'
import PhoneIcon from '@/assets/landing/landingPhoneIcon.svg'
import LandingMainSection from '@/components/landingPage/LandingMainSection'
import Plus from '@/assets/icons/plus-icon.svg'
import { useNavigate } from 'react-router-dom'
import ChatUi from '@/components/chat/ChatUi'
import { selectIndustry, selectIndustryIndex } from '@/store/slices/industry/industrySlices'
import { saveSubindustry, selectSubindustry } from '@/store/slices/subindustry/subindustrySlices'
import { getLenderActions } from '@/services/user.services'

const LandingPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, companies, userId, statuses, userLoading } = useSelector( state => state?.user )
    const [newCompanies, setNewCompanies] = useState(null)
    const [showChat, setShowChat] = useState(false)
    const [bankChat, setBankChat] = useState({})
    const [actions, setActions] = useState([])
    const nullId = import.meta.env.VITE_NULL_ID
    const savedUser = JSON.parse(localStorage.getItem('user'))
    var companiesToShow = []
    
    const faq = [
        {
            question: 'What is an ibankey - Online Debt Market Platform?',
            answer: 'We are digital debt market platform that enables the borrower to raise debt from pool of lenders like Banks, NBFCs & institutions.'
        },
        {
            question: 'Can we change the industry once entered?',
            answer: 'No you can not change the industry once entered by you. Industry once chosen by you enables the tech AI to ask relevant questions about your business. Even if you want to change your industry then you are free to do so by creating one more borrower group by clicking the + sign which is next to your company name on the borrower dashboard.'
        },
        {
            question: 'What are the charges for availing the services?',
            answer: 'Fee charged by the platform varies basis various/multiple factors. Rest assured, ibankey is highly competitive & efficient platform for the services being offered to you. Please get in touch with your Relationship Manager for further details.'
        },
        {
            question: 'Is all information secure on the platform?',
            answer: 'Yes, it is very much secure. Platform use advanced security measures to protect the information of their users, such as encryption and two-factor authentication. However, it is still important to take basic security precautions, such as using strong passwords and avoiding public Wi-Fi when accessing the platform.'
        },
        {
            question: 'Can I add more user to same compan?',
            answer: 'es, you can allocate multiple user for data inputs for the same company. Just share all user details with RM and you are good to go to use the platform with multiple users.'
        }
    ]

    const getAllCompaniesWithSameName = (company) => {
        const repeatedCompany = companies.filter((eachRepeated) => eachRepeated.companyID === company.companyID)
        let joinRepeatedCompanies = []
        repeatedCompany.forEach((repeated) => {
          joinRepeatedCompanies.push({ userCompanyId: repeated.userCompanyID, industryName: repeated.industryName, subindustryName: repeated.subindustryName })
        })
        const indexOfrepeatedCompany = companiesToShow.indexOf(company)
        companiesToShow[indexOfrepeatedCompany].companies = joinRepeatedCompanies
      }
    
      const getNewEntryId = (company) => {
        const newEntryCompany = companies.filter((eachRepeated) => eachRepeated.companyID === company.companyID && eachRepeated.industryID === nullId)

        return newEntryCompany[0].userCompanyID
      }

    useEffect(()=>{
        // console.log(companies, user, savedUser,userId)
        dispatch(getAllInfo())
    },[])
    
    useEffect(()=>{
        getLenderActions().then(({data}) => {
            setActions(data)
        })
    },[])

    useEffect(()=>{
        if(user?.userId){
            dispatch(getCurrentCompanyId({userId:user?.userId}))
        }
    },[user])

    useEffect(() => {
        if (companies) {
            companies.forEach(company => {
                let repeatValue = companiesToShow.filter((eachCompany) => eachCompany.companyID === company.companyID)
                if (repeatValue.length === 0 && company.industryID === nullId) {
                    const setCompany = {
                companyID: company.companyID,
                companyCIN: company.companyCIN,
                companyName: company.companyName,
                industryID: company.industryID,
                industryName: company.industryName,
                subIndustryID: company.subIndustryID,
                subindustryName: company.subindustryName,
                userCompanyID: getNewEntryId(company),
                userID: company.userID,
                userName: company.userName
            }
            companiesToShow.push(setCompany)
            getAllCompaniesWithSameName(setCompany)
        }
    });
          setNewCompanies(companiesToShow)
        }
      }, [companies])

      const handleNewEntry = (userId,companyId,userCompanyId,companyName) => {
          dispatch(setUserCompanyInfo(null))
            dispatch(selectIndustry(null))
            dispatch(selectIndustryIndex(null))
            dispatch(selectSubindustry(null))
            dispatch(saveSubindustry(null))
        const dataToSave = { ...savedUser, userId: userId, companyId: companyId, userCompanyId: userCompanyId, companyName: companyName }
        localStorage.setItem("user", JSON.stringify(dataToSave));
        dispatch(updateUser(dataToSave))
        localStorage.removeItem('userId')
        dispatch(setCompanyId(userCompanyId))
        navigate('/dashboard/industry')
      }
      const banks = [
        {
            status:'Approved',
            bankIcon: BankImage1,
            bankName:'HDFC bannk',
            lenderID:''
        },
        {
            status:'Pending',
            bankIcon: BankImage1,
            bankName:'ICICI bank',
            lenderID:''
        },
        {
            status:'Approved',
            bankIcon: BankImage1,
            bankName:'Union bank',
            lenderID:''
        },
        {
            status:'Declined',
            bankIcon: BankImage1,
            bankName:'State bank',
            lenderID:''
        }
    ]
  return (
    <>
    {
        userLoading &&
        <Spinner
        position='absolute'
        top='50%'
        left='50%' 
        />
    }
      <Navbar />
      <ChatUi banks={banks} showChat={showChat} setShowChat={setShowChat} bankChat={bankChat} setBankChat={setBankChat} />
      {/* <WelcomeLAnding /> */}
      <Flex mt={4} gap={4} px={4} direction={['column', 'column', 'row', 'row']}>
        {
            newCompanies && newCompanies.map((company, index) => (
                <Flex
                key={index}
                color='blue' 
                maxW={['100%','20%']} 
                fontSize={12}
                gap={1}
                justifyContent='center'
                alignContent='center'
                >
                    <Box 
                    border='2px solid blue' 
                    p={2} 
                    borderRadius={10} >
                        <Text>{company.companyName}</Text>
                    </Box>
                    <Box 
                    bg='#4C5EFE' 
                    transition='all .5s ease'
                    _hover={{background:'#290088'}}
                    display='flex'
                    justifyContent='center'
                    alignContent='center'
                    onClick={()=> handleNewEntry(company.userID, company.companyID, company.userCompanyID, company.companyName)} 
                    p={2} 
                    borderRadius={10}>
                        <Image src={Plus} alt='plus icon' />
                    </Box>
                </Flex>
            ))
        }
      </Flex>
      <Grid templateColumns={['1fr', '1fr', '3fr 1fr', '3fr 1fr']} gap={4} p={4}>
        <Accordion defaultIndex={[0,1,2,3]} allowMultiple>
            {
                companies && companies.map((company, index) => (
                    <LandingMainSection key={index} company={company} setBankChat={setBankChat} setShowChat={setShowChat} actions={actions} />
                ))
            }
        </Accordion>

        {/* ASIDE */}
        <GridItem display='grid' gap={4} maxH='300px'>
            <GridItem
            bg='#EFEFEF'
            fontSize={12}
            borderRadius={8}
            >
                <Box
                bgGradient='linear(to-b, #4C5EFE 0%, #290088 315.22%)'
                color='white'
                p={2}
                borderRadius={8}
                >Contact your case manager</Box>
                <Flex gap={4} p={2}><Image src={EmailIcon} alt=''/> +91-977736776376</Flex>
                <Flex gap={4} pb={2} px={2}><Image src={PhoneIcon} alt=''/> support@ibankey.com</Flex>
            </GridItem>
            <GridItem
            bg='#EFEFEF'
            fontSize={12}
            borderRadius={8}
            >
                <Box
                bgGradient='linear(to-b, #4C5EFE 0%, #290088 315.22%)'
                color='white'
                p={2}
                borderRadius={8}
                >Frequently asked question (FAQ)</Box>
                <Accordion defaultIndex={[0]} allowMultiple>
                    {
                        faq.map((faq, index) => (
                            <AccordionItem 
                            p={2} 
                            border='none'
                            key={index}
                            >
                                <h2>
                                <AccordionButton 
                                border='none'
                                bg='white'
                                fontSize={12}
                                fontWeight='bold'
                                mb={2}
                                >
                                    <Box as="span" flex='1' textAlign='left'>
                                    {faq.question}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel 
                                pb={4}
                                bg='white'
                                >
                                {faq.answer}
                                </AccordionPanel>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </GridItem>
        </GridItem>
      </Grid>
    </>
  )
}

export default LandingPage
