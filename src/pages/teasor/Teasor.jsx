import Navbar from '@/components/dashboard/Navbar'
import TeasorProposal from '@/components/CIM/TeasorProposal'
import TeasorMainTable from '@/components/CIM/TeasorMainTable'
import { getAllInfo, getCurrentUserCompanyInfo } from '@/store/slices/user/userSlices'
import { Box, Flex, Grid, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TeasorCheck from '@/components/CIM/TeasorCheck'
import TeasorComparison from '@/components/CIM/TeasorComparison'
import CimSWOT from '@/components/CIM/CimSWOT'
import CimAside from '@/components/CIM/CimAside'
import CimBankingArrangement from '@/components/CIM/CimBankingArrangement'
import CimInfo from '@/components/CIM/CimInfo'
import { getCurrentBankingArrangments, getCurrentCimInfo, getCurrentComparison, getCurrentCustomerSupplier, getCurrentFinancialData, getCurrentLoanInfo, getCurrentPromotorShareholder, getCurrentRating, getCurrentSecurityByUser, getCurrentSegmentBreakup, getCurrentSwotData, getCurrenthealthCheckData } from '@/store/slices/cim/cimSlices'
import { Watermark } from '@hirohe/react-watermark';
import { getSecurityDataByUSer } from '@/services/cim.services'
import { motion } from 'framer-motion'
import CommentsOptions from '@/components/comments/CommentsOptions'
import CommentsDrawer from '@/components/comments/CommentsDrawer'
import { COMMENTS_TEST } from '@/components/comments/commentsTemplate/comments'
import FloatingComment from '@/components/comments/FloatingComment'

const Teasor = () => {
    const dispatch = useDispatch()
    const { user, userCompanyInfo } = useSelector(state => state?.user)
    const { cim, segmentBreakup, loanInfo, financialData, bankingArrangments, swot, customerSupplier, promotorShareholder, comparison, rating, securityData, healthCheckData, cimLoading } = useSelector(state => state?.cim)
    const name = 'Isaid Gerardo Graterol Perez'
    const [enableComments, setEnableComments] = useState(false)
    const [addComments, setAddComments] = useState(false)
    const [viewComments, setViewComments] = useState(false)
    const [createComments, setCreateComments] = useState(false)
    const [commentPos, setCommentPos] = useState({})

    useEffect(() => {
        var names = name.split(' '),
        initials
        
        if (names) {
            names.forEach((element) => {
              initials += element.substring(0, 1).toUpperCase();
            });
        }
    },[])

    useEffect(()=>{
        dispatch(getAllInfo())
    },[])

    useEffect(()=>{
      if(user?.userCompanyId){
        dispatch(getCurrentUserCompanyInfo({userCompanyId:user.userCompanyId,userId:user.userId, companyId:user.companyId}))
      }
    },[user])

    useEffect(() => {
      if(user?.userCompanyId){
        dispatch(getCurrentSecurityByUser({userCompanyId:user?.userCompanyId}))
        dispatch(getCurrentCimInfo({userCompanyId:user?.userCompanyId}))
        dispatch(getCurrentSegmentBreakup({userCompanyId:user?.userCompanyId}))
        dispatch(getCurrentLoanInfo({userCompanyId:user?.userCompanyId}))
        dispatch(getCurrentFinancialData({userCompanyId:user?.userCompanyId}))
        dispatch(getCurrentBankingArrangments({userCompanyId:user?.userCompanyId}))
        dispatch(getCurrentSwotData({userCompanyId:user?.userCompanyId}))
        dispatch(getCurrentCustomerSupplier({userCompanyId:user?.userCompanyId}))
        dispatch(getCurrentPromotorShareholder({userCompanyId:user?.userCompanyId}))
        dispatch(getCurrentComparison({userCompanyId:user?.userCompanyId}))
        dispatch(getCurrentRating({userCompanyId:user?.userCompanyId}))
        dispatch(getCurrenthealthCheckData({userCompanyId:user?.userCompanyId}))
      }
    },[user])

    const handleComment = (e) => {
      if(addComments){
        setCommentPos({top:e.screenY, left:e.screenX})
        setCreateComments(true)
        setAddComments(false)
      }
    }

  return (
    <Watermark text="IBANKEY" textColor='gray' gutter='100' lineHeight='4rem'>
      <CommentsDrawer show={viewComments} setShow={setViewComments} comments={COMMENTS_TEST} />
      {
        createComments &&
        <FloatingComment position={commentPos} comment={null} closeAction={() =>setCreateComments(false)} />
      }
      {
        enableComments && COMMENTS_TEST.map((comment) => (
          <FloatingComment key={comment.id} position={{top: comment.top, left:comment.left}} comment={comment} />
        ))
      }
      {
        cimLoading &&
        <Spinner
        thickness='6px'
        speed='1.2s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        position='absolute'
        top='20%'
        left='50%' 
        />
      }
      <Navbar />
      <Box
      px={6}
      position='relative'
      cursor={addComments ? 'crosshair' : ''}
      onClick={(e) => handleComment(e)}
      // maxW='2048px'
      >
        <CommentsOptions 
        enableComments={enableComments} 
        setEnableComments={setEnableComments}
        addComments={addComments}
        setAddComments={setAddComments}
        viewComments={viewComments}
        setViewComments={setViewComments}
        />
        <CimInfo cim={cim} rating={rating} healthCheckData={healthCheckData} />
        <Flex direction={['column','row']} gap={4} overflowX={['scroll','initial']}>
          <CimAside segmentBreakup={segmentBreakup} cim={cim} customerSupplier={customerSupplier} promotorShareholder={promotorShareholder} />
          <TeasorMainTable financialData={financialData} />
        </Flex>
        <TeasorProposal 
        loanInfo={loanInfo} 
        bankingArrangments={bankingArrangments}
        securityData={securityData}
        cim={cim} />
        <Grid templateColumns={['1fr', '1fr 1fr']} gap={4} p={[2,4]} overflowX={['scroll','initial']}>
          <CimSWOT swot={swot} />
          <TeasorComparison comparison={comparison} bankingArrangments={bankingArrangments} />
        </Grid>
      </Box>
    </Watermark>
  )
}

export default Teasor
