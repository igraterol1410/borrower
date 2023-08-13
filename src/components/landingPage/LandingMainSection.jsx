import React, { useEffect } from 'react'
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, Flex, Grid, GridItem, Image, Spinner, Text } from '@chakra-ui/react'
import Success from '@/assets/icons/circle-check-icon.svg'
import Pending from '@/assets/icons/pending-icon.svg'
import PendingIcon from '@/assets/icons/pending-status-icon.svg'
import Declined from '@/assets/icons/declined-icon.svg'
import FilesIcon from '@/assets/icons/files-landing-icon.svg'
import EditIcon from '@/assets/icons/edit-icon.svg'
import ViewIcon from '@/assets/icons/view-icon.svg'
import BankImage1 from '@/assets/icons/bank-image-1.svg'
import { useState } from 'react'
import DocumentsModal from './modals/DocumentsModal'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserCompanyInfo, getCurrentUserStatuses, setCompanyId, setUserStatusesInfo, updateUser } from '@/store/slices/user/userSlices'
import { getCasemanagerInfo, getUserStatuses, postLendersActions } from '@/services/user.services'
import { AiOutlineMessage } from "react-icons/ai";
import { getCurrentLenderAction } from '@/store/slices/banks/bankSlices'
import { getLenderAction } from '@/services/banks.services'
import TermsSheeModal from '../termsSheet/TermsSheeModal'
import { Tooltip } from '@chakra-ui/react'

import { AiOutlineInfoCircle } from "react-icons/ai";

import '../chat/styles/chatStyles.css';
import WarningModal from '../modals/WarningModal'

const LandingMainSection = ({company, setBankChat, setShowChat,actions}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const nullId = import.meta.env.VITE_NULL_ID
    const { user, companies, userId: reduxUserID, statuses } = useSelector(state => state?.user)
    const { lenders } = useSelector(state => state?.banks)
    const { companyName, industryName, subindustryName, userCompanyId } = company
    const [showModal, setShowModal] = useState(false)
    const [showTerms, setShowTerms] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showAction, setShowAction] = useState({})
    const [config, setConfig] = useState({})
    const [companyStatus, setCompanyStatus] = useState(null)
    const [companyLenders, setCompanyLenders] = useState([])
    const [approvedLenders, setApprovedLenders] = useState([])
    const [casemanager, setCasemanager] = useState(null)
    const savedUser = JSON.parse(localStorage.getItem('user'))
    const userId = JSON.parse(localStorage.getItem('userId'))

    useEffect(() =>{
        if(company.userCompanyID){
            getUserStatuses(company.userCompanyID).then(({data}) =>{
                setCompanyStatus(data)
            })
            getCasemanagerInfo(company.userCompanyID).then(({data}) =>{
                setCasemanager(data[0])
            })
        }
    },[company.userCompanyID])
    useEffect(() =>{
        if(company.userCompanyID){
            setLoading(true)
            getLenderAction(company.userCompanyID).then(res => {
                setCompanyLenders(res)
                setLoading(false)
            })
        }
    },[company.userCompanyID, refresh])

    const handleModal = () => {
        setConfig({
            industryId:company.industryID, 
            subindustryId:company.subIndustryID || nullId,
            userCompanyID:company.userCompanyID
        })
        setShowModal(true)
    }
    
    const handleModalTerms = () => {
        setConfig({
            industryId:company.industryID, 
            subindustryId:company.subIndustryID || nullId,
            userCompanyID:company.userCompanyID
        })
        dispatch(getCurrentUserCompanyInfo({userCompanyId:company.userCompanyID,userId:user.userId, companyId:user.companyId}))
        setShowTerms(true)
    }
    
    
    const saveUSer = (userId,companyId,userCompanyId) => {
        const dataToSave = { ...savedUser, userId: userId, companyId: companyId, userCompanyId: userCompanyId, companyName:companyName }
        localStorage.setItem("user", JSON.stringify(dataToSave));
        dispatch(updateUser(dataToSave))
        localStorage.removeItem('userId')
        dispatch(setCompanyId(userCompanyId))
    }
 
    const redirectCimCompany = () => {
        saveUSer(company.userID, company.companyID, company.userCompanyID)
        navigate('/teasor')
    }

    const redirectOnboardingCompany = (item) => {
        if(userId){
            // console.log(userId)
            saveUSer(userId,company,value)
            navigate('/dashboard/industry')
        }
        else{
            saveUSer(company.userID, company.companyID, company.userCompanyID)
            navigate('/dashboard/industry')
        }
    }

    const editDocs = (link) => {
        saveUSer(company.userID, company.companyID, company.userCompanyID)
        navigate(link)
    }
    
    const handleChat = (bank) => {
        setBankChat({
            bankIcon:bank.bank || '',
            bankName:bank.actorName,
            bank:bank.bank,
            userCompanyId: company.userCompanyID,
            lenderId: bank.actorId
        })
        setShowChat(true)
    }

    const steps = [
        {
            title: `Onboarding is ${companyStatus && companyStatus[0]?.itemvalue === 'INPROGRESS' || 'PENDING' ? 'In progress' :'completed'}`,
            step: '1',
            link: 'Onboarding link',
            timeStamp: '27.01.2023   11.45 APM'
        },
        {
            step: '2',
            text:'Case manager allocated the dedicated contact domain expert'
        },
        {
            step: '3',
            text:'CIM prepared, Its a story about you the way you want to tell the world'
        },
        {
            step: '4',
            text:'Interest received, Many accepted, many more is going to accepting '
        },
        {
            step: '5',
            text:'Sanctioned'
        },
    ]

    const getApprovedBank = (actorId) => {
        const currentApproved = approvedLenders.filter((eachApproved) => eachApproved === actorId)
        return currentApproved.length > 0
    }

    const handleReject = (action, bank) => {
        setShowAction({show:true, bank:bank, action:action})
    }

    const handleAction = (action, bank) => {
        setLoading(true)
        const currentAction = actions.filter((eachAction) => (eachAction.actionName === action))
        postLendersActions(company.userCompanyID, currentAction[0].actionId).then((res) => {
            if (action === "Approved"){
                setApprovedLenders([...approvedLenders, bank.actorId])
            }
            setRefresh(!refresh)
            setLoading(false)
        })
    }

  return (
    <AccordionItem display={industryName ? 'block' : 'none'} mb={2}>
        <DocumentsModal showModal={showModal} setShowModal={setShowModal} config={config} />
        <TermsSheeModal showModal={showTerms} setShowModal={setShowTerms} config={config} />
        <WarningModal show={showAction.show} setShow={() => setShowAction(false)} action={() =>handleAction(showAction.action)} label={`Do you want to reject ${showAction.bank}`} confirmButton='Reject' />
        {
            loading &&
            <Spinner
            position='absolute'
            left='50%'
            top='50%'
            zIndex={10}
            />
        }
        <AccordionButton 
        borderRadius={8}
        p={0}
        border='none'>
            <Flex
            borderRadius={8}
            w='100%'
            h='100%'
            bgGradient='linear(to-b, #4C5EFE 0%, #290088 315.22%)'
            color='white'
            p={2}
            fontSize={12}
            justifyContent='space-between'
            >
                <Box>
                    <Text fontWeight='bold' display={['block','inline']} mr={2}>
                    {companyName}
                    </Text> 
                    <Text 
                    display={['block','inline']} 
                    fontSize={10}> 
                        {industryName} - {subindustryName}
                    </Text>
                </Box>
                <Flex>
                    <Box mr={2}>
                        {company.companyCIN}
                    </Box>
                    <AccordionIcon />
                </Flex>
            </Flex>    
        </AccordionButton>
        <AccordionPanel bg='#F1F3FE' p={0} border='none'>            
            <Grid
            h='100%'
            w='100%'
            templateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr']}
            gap={4}
            bg='#F1F3FE'
            p={4}
            >
                <GridItem
                bg='white'
                fontSize={12}
                p={4}
                pl={8}
                borderRadius={10}
                gap={4}
                >
                    <Box display='inline-block' bg='white' borderRadius='15px'>
                        <Text fontSize='xl' fontWeight='bold' color='#aaa'>
                            Case Manager
                        </Text>
                        <Text fontSize='sm' color='#aaa'>
                            <b>Name:</b> {casemanager?.name}
                        </Text>
                        <Text fontSize='sm' color='#aaa'>
                            <b>Email:</b> {casemanager?.email}
                        </Text>
                        <Text fontSize='sm' color='#aaa'>
                            <b>Phone number:</b> {casemanager?.phone}
                        </Text>
                    </Box>
                    <Flex>
                        <Box>
                            {
                                steps.map((step, index) => (
                                    <Box key={index}
                                    p={2}
                                    mb={0}
                                    pl={6}
                                    // borderLeft='4px solid rgba(0, 0, 255, .6)'
                                    className={index === 0 ? 'status-border first-border' : index === 4 ? 'status-border last-border' : 'status-border'}
                                    position='relative'
                                    >
                                        <Box 
                                        h='30px' 
                                        w='30px' 
                                        borderRadius='50%' 
                                        bg={companyStatus && companyStatus[index]?.itemvalue === 'Completed' ? '#22D665' : 'white'}
                                        border={companyStatus && companyStatus[0]?.itemvalue === 'Completed' ? '4px solid blue' : '2px solid blue'} 
                                        m='0'
                                        display='flex'
                                        justifyContent='center'
                                        position='absolute'
                                        left='-17px'
                                        top='25%'>
                                            {
                                                companyStatus && companyStatus[0]?.itemvalue === 'Completed' 
                                                ?
                                                <Image src={Success} alt='success icon' w='50%' />
                                                :
                                                companyStatus && companyStatus[0]?.itemvalue === 'INPROGRESS' || 'PENDING'
                                                ?
                                                <Image src={PendingIcon} alt='success icon' w='50%' />
                                                :
                                                <></>
                                            }
                                        </Box>
                                    <Box>Step {step.step}</Box>
                                    {step.title 
                                    ? 
                                    <Box>{step.title}</Box>
                                    : ''
                                    }
                                    {step.link 
                                    ? 
                                    <Box cursor='pointer' textDecoration='underline' onClick={() => redirectOnboardingCompany(company)}>{step.link}</Box>
                                    : ''
                                    }
                                    {step.timeStamp  
                                    ? 
                                    <a>{step.timeStamp}</a>
                                    : ''
                                    }
                                    {step.text 
                                    ? 
                                    <a>{step.text}</a>
                                    : ''
                                    }
                                    </Box>
                                ))
                            }
                        </Box>
                    </Flex>
                </GridItem>
                <GridItem
                display='grid'
                gridTemplateRows='1fr 3fr'
                gap={4}
                >
                    <Grid                
                    bg='white'
                    borderRadius={5}
                    // p={3}
                    templateColumns='50px 1fr'
                    >
                        <Box
                        bg='#3D35CB'
                        borderRadius={4}
                        display='grid'
                        alignItems='center'
                        justifyItems='center'
                        >
                            <Image src={FilesIcon} alt='files icon' />
                        </Box>
                        <Grid p={4} alignContent='center' fontSize={12}>
                            <Grid
                            templateColumns='1fr 1fr'
                            gap={2}
                            >
                                <Box fontWeight='bold' >CIM</Box>
                                <Grid templateColumns='1fr' gap={2} justifyContent='center'>
                                    <Flex 
                                    border='2px solid blue' 
                                    borderRadius={4} 
                                    justifyContent='center'
                                    gap={2}
                                    p={['.5rem','2px']}
                                    cursor='pointer'
                                    onClick={() => redirectCimCompany(company)}
                                    >
                                        <Image w={['15px','20px']} src={ViewIcon} alt='icon' /><Text mb={0} display={['none','block']}>View</Text>
                                    </Flex>
                                </Grid>
                            </Grid>    
                            <Grid
                            templateColumns='1fr 1fr'
                            mt={2}
                            gap={2}
                            >
                                <Box fontWeight='bold' fontSize={12}>Uploaded Documents</Box>
                                <Grid templateColumns='1fr 1fr' gap={2}>
                                    <Flex 
                                    border='2px solid blue' 
                                    borderRadius={4}   
                                    justifyContent='center'
                                    gap={2}
                                    p='2px'
                                    cursor='pointer'
                                    onClick={handleModal}
                                    ><Image w={['15px','20px']} src={ViewIcon} alt='icon' /> <Text mb={0} display={['none','block']}>View</Text></Flex>
                                    <Flex 
                                    border='2px solid blue' 
                                    borderRadius={4} 
                                    textAlign='center'                                    
                                    justifyContent='center'
                                    gap={2}
                                    p='2px'
                                    cursor='pointer'
                                    onClick={() => editDocs('/dashboard/kyc-documents')}
                                    ><Image w={['15px','15px']} src={EditIcon} alt='icon' /><Text mb={0} display={['none','block']}>Edit</Text></Flex>
                                </Grid>
                            </Grid>    
                            <Grid
                            templateColumns='1fr 1fr'
                            mt={2}
                            gap={2}
                            >
                                <Box fontWeight='bold' fontSize={12}>Terms Sheet</Box>
                                <Grid templateColumns='1fr 1fr' gap={2}>
                                    <Flex 
                                    border='2px solid blue' 
                                    borderRadius={4}   
                                    justifyContent='center'
                                    gap={2}
                                    p='2px'
                                    cursor='pointer'
                                    onClick={handleModalTerms}
                                    ><Image w={['15px','20px']} src={ViewIcon} alt='icon' /> <Text mb={0} display={['none','block']}>View</Text></Flex>
                                    <Flex 
                                    border='2px solid blue' 
                                    borderRadius={4} 
                                    textAlign='center'                                    
                                    justifyContent='center'
                                    gap={2}
                                    p='2px'
                                    cursor='pointer'
                                    onClick={() => editDocs('/dashboard/terms-sheet')}
                                    ><Image w={['15px','15px']} src={EditIcon} alt='icon' /><Text mb={0} display={['none','block']}>Edit</Text></Flex>
                                </Grid>
                            </Grid>    
                        </Grid>                    
                    </Grid>
                    <Box
                    bg='white'
                    borderRadius={5}
                    p={4}
                    fontWeight='bold' 
                    fontSize={12}
                    position='relative'
                    >
                        <Box mb={4}>Intrest shown by Investers</Box>
                        <Grid>
                            {
                                companyLenders && companyLenders.map((bank, index) => (
                                    <Flex 
                                    key={index}
                                    zIndex='2'
                                    border='1px solid #D9D9D9'
                                    boxShadow='0px 2px 4px rgba(0, 0, 0, 0.1)'
                                    borderRadius={10}
                                    p={1}
                                    px={2}
                                    justifyContent='space-between'
                                    alignItems='center'
                                    mb={3}>
                                        <Flex p={1} bgGradient='linear(to-b, #4C5EFE 0%, #290088 315.22%)' color='white' borderRadius={5}>
                                            {bank.bank || bank.actorId}
                                        </Flex>
                                        <Flex
                                        alignContent='center'
                                        alignItems='center'
                                        gap={4}>
                                            {/* {
                                                bank.actionName === 'Approved' || getApprovedBank(bank.actorId) &&
                                                <AiOutlineMessage onClick={() => handleChat(bank)} style={{fontSize:'20px', color:'#4C5EFE'}} />
                                            } */}
                                            <Box
                                            display={bank.actionName === 'Approved' || getApprovedBank(bank.actorId) ? 'block' : 'none'}
                                            >
                                                <AiOutlineMessage onClick={() => handleChat(bank)} style={{fontSize:'20px', color:'#4C5EFE'}} />
                                            </Box>
                                            {/* <Text mr={2} ml={2} color={bank.actionName === 'Approved' ? '#22D665' : bank.actionName === 'Pending' ? '#EAB93B' : '#F00020'}>{bank.actionName}</Text> */}
                                            {
                                                bank.actionName !== 'Approved' && !getApprovedBank(bank.actorId) &&
                                                <Flex gap={2}>
                                                    <Flex 
                                                    p={1} 
                                                    px={2}
                                                    bg='red' 
                                                    color='white' 
                                                    borderRadius={5}
                                                    transition='all ease .5s'
                                                    onClick={() => handleReject("Reject", bank.bank)}
                                                    _hover={{
                                                        background:'red.400'
                                                    }}
                                                    cursor='pointer'
                                                    >
                                                    Reject
                                                    </Flex>
                                                    <Flex 
                                                    p={1} 
                                                    bg='green' 
                                                    color='white' 
                                                    borderRadius={5}
                                                    px={2}
                                                    transition='all ease .5s'
                                                    onClick={() => handleAction("Approved", bank)}
                                                    _hover={{
                                                        background:'green.400'
                                                    }}
                                                    cursor='pointer'
                                                    >
                                                    Approve
                                                    </Flex>
                                                </Flex>
                                            }
                                            <Tooltip hasArrow label='Approve or Reject this lender' bg='gray.300' color='black'>
                                                <Flex
                                                alignItems='center'
                                                fontSize='xl'
                                                display={(bank.actionName !== 'Approved' && !getApprovedBank(bank.actorId)) ? 'flex' : 'none'}
                                                >
                                                    <AiOutlineInfoCircle />
                                                </Flex>
                                            </Tooltip>
                                        </Flex>
                                    </Flex>                                    
                                ))
                            }
                        </Grid>
                    </Box>
                </GridItem>
            </Grid>  
        </AccordionPanel>
    </AccordionItem>
  )
}

export default LandingMainSection
