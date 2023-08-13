import React, { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from '../../components/dashboard/Navbar';
import StepProgress from '../../components/dashboard/StepProgress';
import { useDispatch, useSelector } from 'react-redux';

import './styles/dashboard.css'
import { getAllInfo, getCurrentUserCompanyInfo, logoutUser } from '../../store/slices/user/userSlices';
import { Box, Grid } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { saveSubindustry, selectSubindustry } from '@/store/slices/subindustry/subindustrySlices';

const Dashboard = () => {
    const dispatch = useDispatch()
    const { logout } = useAuth0();
    const nullId = import.meta.env.VITE_NULL_ID
    const { user, userCompanyInfo } = useSelector( state => state?.user )

    useEffect(()=>{
      if(!JSON.parse(localStorage.getItem('user'))){
        dispatch(logoutUser())
        logout()
        window.location.href = "https://ibankey.co.in/"
        // logout({ returnTo: window.location.origin })
      }
    },[])

    useEffect(()=>{
        dispatch(getAllInfo())
    },[])

    useEffect(()=>{
      if(user?.adminUserCompanyId){
        dispatch(getCurrentUserCompanyInfo({userCompanyId:user.adminUserCompanyId,userId:user.adminUserId, companyId:user.adminCompanyId}))
      }else if(user?.userCompanyId){
        dispatch(getCurrentUserCompanyInfo({userCompanyId:user.userCompanyId,userId:user.userId, companyId:user.companyId}))
      }
    },[user])

    useEffect(()=>{
      if(userCompanyInfo?.user?.industryID && userCompanyInfo?.user?.industryID !== nullId){
      dispatch(selectSubindustry({subIndustryId:userCompanyInfo?.user?.subIndutryID}))
      dispatch(saveSubindustry({subIndustryId:userCompanyInfo?.user?.subIndutryID, code:userCompanyInfo?.user?.subIndutryName}))
      }
    },[userCompanyInfo?.user?.subIndutryID])

  return (
    <>
        <Navbar />
        <Box
        minH='calc(100vh - 65px)'        
        p='2rem 1rem'
        >
          <Grid
          templateColumns={['1fr', '1fr', '1fr 3fr', '1fr 3fr']}
          minH='calc(100vh - 129px)'        
          w='100%'
          h='100%'
          m='auto'
          bg={['white','white','#F8FAFB','#F8FAFB']}
          borderRadius='20px'
          p='2rem 0'
          position='relative'
          >
            <StepProgress />
            <Outlet />
          </Grid>
        </Box>
    </>
  )
}

export default Dashboard
