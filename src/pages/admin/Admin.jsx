import Navbar from '@/components/dashboard/Navbar'
import { ADMIN_LIST } from '@/functions/adminList'
import { getBorrowers } from '@/services/admin'
import { selectIndustry, selectIndustryIndex } from '@/store/slices/industry/industrySlices'
import { saveSubindustry, selectSubindustry } from '@/store/slices/subindustry/subindustrySlices'
import { getAllInfo, getCurrentCompanyId, getCurrentUserInfo, setCompanyId, setUserCompanyInfo, updateUser } from '@/store/slices/user/userSlices'
import { Box, Button, Flex, Grid, GridItem, Heading, Input, Select, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { GrUserAdmin } from "react-icons/gr";

const Admin = () => {
    const [borrowers, setBorrowers] = useState(null)
    const [loading, setLoading] = useState(false)    
    const [adminUserId, setAdminUserId] = useState('')
    const [adminUserEmail, setAdminUserEmail] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useToast()
    const savedUser = JSON.parse(localStorage.getItem('user'))
    const nullId = import.meta.env.VITE_NULL_ID

    useEffect(() => {
        setLoading(true)
        resetAdminUser()
        getBorrowers().then(({data}) => {
            setBorrowers(data)
        }).finally(() => {
            setLoading(false)
        })
    },[])

    useEffect(()=>{
        dispatch(getAllInfo())
    },[])

    const getCompanies = (borrower) => {
        const selectedBorrower = borrowers.filter((currentBorrower) => (currentBorrower.email === borrower))
        setAdminUserEmail(selectedBorrower[0]?.email)
        setAdminUserId(selectedBorrower[0]?.userid)
    }

    const goToBorrowerProfile = () => {
        setLoading(true)
        dispatch(getCurrentCompanyId({userId:adminUserId})).then((res) => {
            if(res?.payload?.length > 1){
              const dataToSave = { 
                ...savedUser, 
                userId: adminUserId, 
                adminUserEmail: adminUserEmail,
                companyId: res.payload[1]?.companyID, 
                userCompanyId: res.payload[1].userCompanyID 
            }
              localStorage.setItem("user", JSON.stringify(dataToSave));
              dispatch(updateUser(dataToSave))
              dispatch(setCompanyId(res.payload[1].userCompanyId))
              localStorage.removeItem('userId')
              setLoading(false)
              navigate('/landing')
            }else if(res?.payload?.length > 0 && res.payload[0]?.industryID === nullId){
              const dataToSave = { 
                ...savedUser, 
                userId: res.payload[0]?.userID, 
                companyId: res.payload[0]?.companyID, 
                adminUserEmail: adminUserEmail,
                userCompanyId: res.payload[0].userCompanyID 
            }
              localStorage.setItem("user", JSON.stringify(dataToSave));
              dispatch(updateUser(dataToSave))
              dispatch(setCompanyId(res.payload[0].userCompanyId))
              localStorage.removeItem('userId')
              setLoading(false)
              navigate('/dashboard/industry')
            }
            else{
                toast({
                    title: 'This user has not mapped against any company',
                    status: 'error',
                    duration: 9000,
                    position: 'top'
                })
                setLoading(false)
                navigate('/admin')
            }
          })
    }

    const resetAdminUser = () => {
      dispatch(setUserCompanyInfo(null))
      dispatch(selectIndustry(null))
      dispatch(selectIndustryIndex(null))
      dispatch(selectSubindustry(null))
      dispatch(saveSubindustry(null))
      dispatch(getCurrentUserInfo()).then((res) => {
      localStorage.setItem("userId", JSON.stringify({userId:res.payload}));
      dispatch(getCurrentCompanyId({userId:res.payload})).then((res) => {
        const dataToSave = { 
          ...savedUser, 
          userId: res.payload[0]?.userID, 
          companyId: res.payload[0]?.companyID, 
          userCompanyId: res.payload[0].userCompanyIDm, 
          adminUserEmail:null }
        localStorage.setItem("user", JSON.stringify(dataToSave));
        dispatch(updateUser(dataToSave))
        dispatch(setCompanyId(res.payload[0].userCompanyId))
        localStorage.removeItem('userId')        
      })
    })
    }

    const exitAdmin = () => {
        dispatch(setUserCompanyInfo(null))
        dispatch(selectIndustry(null))
        dispatch(selectIndustryIndex(null))
        dispatch(selectSubindustry(null))
        dispatch(saveSubindustry(null))
        dispatch(getCurrentUserInfo()).then((res) => {
            localStorage.setItem("userId", JSON.stringify({userId:res.payload}));
            dispatch(getCurrentCompanyId({userId:res.payload})).then((res) => {
              // console.log(res)
              if(res?.payload?.length > 1){
                const dataToSave = { 
                    ...savedUser, 
                    userId: res.payload[0]?.userID, 
                    companyId: res.payload[0]?.companyID, 
                    userCompanyId: res.payload[0].userCompanyIDm, 
                    adminUserEmail:null }
                localStorage.setItem("user", JSON.stringify(dataToSave));
                dispatch(updateUser(dataToSave))
                dispatch(setCompanyId(res.payload[0].userCompanyId))
                localStorage.removeItem('userId')
                navigate('/landing')
              }else if(res?.payload?.length > 0 && res.payload[0]?.industryID === nullId){
                const dataToSave = { 
                    ...savedUser, 
                    userId: res.payload[0]?.userID, 
                    companyId: res.payload[0]?.companyID, 
                    userCompanyId: res.payload[0].userCompanyID,
                    adminUserEmail:null }
                localStorage.setItem("user", JSON.stringify(dataToSave));
                dispatch(updateUser(dataToSave))
                dispatch(setCompanyId(res.payload[0].userCompanyId))
                localStorage.removeItem('userId')
                navigate('/dashboard/industry')
              }
              else{
                toast({
                  title: 'You have not mapped against any company please contact admin',
                  status: 'error',
                  duration: 9000,
                  position: 'top'
                })
              }
            })
          })
    }

    if(ADMIN_LIST.filter((email) => (email === savedUser?.email)).length === 0) navigate('/landing')
  return (
    <>
    <Navbar />
    <Grid
    minH='90vh'
    bg='#F8FAFB'
    alignItems='center'
    templateColumns={['1fr','1fr 1fr']}
    >
        <Grid alignItems='center' m='auto' p={6}>
            <GridItem color='#086CE7'>
                <Heading as='h1' >Choose a Borrower</Heading>
                <Text color='gray' mb={6}>Access any borrower's profile</Text>
                  <Input
                  type='search'
                  placeholder='Choose a Borrower'
                  list="borrowersList"
                  w='150%'
                  onChange={(e) => getCompanies(e.target.value)}
                  />
                    <datalist id="borrowersList" style={{color:'red'}}>
                    {
                        borrowers && borrowers.map((borrower) => (
                            <option 
                            key={borrower.email} 
                            value={borrower.email}
                            >
                                {borrower?.email}
                            </option>
                        ))
                    }
                    </datalist>
            </GridItem>
            <Flex gap={6} mt={6}>
                <Button
                type='submit'
                border='none' 
                bg='#086CE7'
                _hover={{
                  background:'#000072'
                }}
                color='#fff'        
                fontWeight='500'
                onClick={goToBorrowerProfile}
                disabled={!adminUserEmail || !adminUserId}
                isLoading={loading}
                >
                    Go to Borrower's profile
                </Button>
                <Button
                onClick={exitAdmin}
                border='1px solid gray'
                bg='#fff'      
                fontWeight='500'
                >
                    Exit admin
                </Button>
            </Flex>
        </Grid>
        <Flex alignItems='center' m='auto'  color='#086CE7' gap={4} fontSize='xl'>
            <Heading as='h2' >Admin</Heading>
        </Flex>
    </Grid>
    </>
  )
}

export default Admin
