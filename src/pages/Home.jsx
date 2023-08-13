import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, GridItem, Button, useToast, Flex, Spinner, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentCompanyId, getCurrentUserInfo, login, setCompanyId, updateUser } from '../store/slices/user/userSlices';
import SelectCompanyModal from '@/components/home/SelectCompanyModal';
 
const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()  
  const nullId = import.meta.env.VITE_NULL_ID
  const { user:reduxUser, userId, userLoading } = useSelector( state => state?.user )
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, getIdTokenClaims } = useAuth0()
  const { logout } = useAuth0();
  const [selectCompany, setSelectCompany] = useState(false)
  const toast = useToast()
  const savedUser = JSON.parse(localStorage.getItem('user'))
  const savedUserId = JSON.parse(localStorage.getItem('userId'))
  let authUser
  let authToken 

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = import.meta.env.VITE_AUTH0_DOMAIN ;
  
      try {
        const accessToken = await getIdTokenClaims();
        if(isAuthenticated){
          localStorage.setItem("user", JSON.stringify({...user, accessToken:accessToken?.__raw}));
          dispatch(login({
            user:{...user, accessToken:accessToken?.__raw}
          }))
          authUser=user
          authToken=accessToken?.__raw
          dispatch(getCurrentUserInfo()).then((res) => {
            localStorage.setItem("userId", JSON.stringify({userId:res.payload}));
            dispatch(getCurrentCompanyId({userId:res.payload})).then((res) => {
              // console.log(res)
              if(res?.payload?.length > 1){
                const dataToSave = { ...user, accessToken:authToken, userId: res.payload[0]?.userID, companyId: res.payload[0]?.companyID, userCompanyId: res.payload[0].userCompanyID }
                localStorage.setItem("user", JSON.stringify(dataToSave));
                dispatch(updateUser(dataToSave))
                dispatch(setCompanyId(res.payload[0].userCompanyId))
                localStorage.removeItem('userId')
                navigate('/landing')
              }else if(res?.payload?.length > 0 && res.payload[0]?.industryID === nullId){
                const dataToSave = { ...user, accessToken:authToken, userId: res.payload[0]?.userID, companyId: res.payload[0]?.companyID, userCompanyId: res.payload[0].userCompanyID }
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
                localStorage.removeItem('user')
                setTimeout(() => {
                  logout()                  
                }, 3000);
              }
            })
          })
        }else if(!isAuthenticated && !isLoading){
          loginWithRedirect()
        }
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  }, [isAuthenticated, isLoading]);
  
  return (
    <Grid
    justifyContent='center'
    alignItems='center' 
    minHeight='100vh'
    >
      <SelectCompanyModal show={selectCompany} setShow={setSelectCompany} />
      <GridItem>
      {
        userLoading &&
        <Flex>
          <Spinner /> 
          <Text>Loading Companies...</Text>
        </Flex>
      }
        
        {/* {
          isAuthenticated 
          ?
          (<>
          {
            userLoading ?
            <Flex>
              <Spinner /> 
              <Text>Loading Companies...</Text>
            </Flex>
            :
            <Button onClick={() => logout()}>Logout</Button>
          }
          </>)
          :
          <Button onClick={() => loginWithRedirect()}>Login or Sign Up</Button>
        } */}
      </GridItem>
    </Grid>
  )
}

export default Home
