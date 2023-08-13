import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Input, InputGroup, InputRightElement, Grid, GridItem, Checkbox, FormLabel, Flex, Image, Center, Box, VStack, Text, Divider, Button, Img, Spinner, Skeleton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import Icon from '@/assets/icons/gems-industry.svg'
import Icon2 from '@/assets/icons/industry-icon.svg'
import Icon3 from '@/assets/icons/radio-selected.svg'
import Check from '@/assets/icons/check.svg'

import './styles/industry.css'
import { getCurrentUserCompanyInfo, setUserCompanyInfo, updateUser } from '../../store/slices/user/userSlices';
import { useNavigate } from 'react-router-dom';
import { cancelIndustry, getCurrentIndustries, getCurrentIndustriesByName, saveCurrentIndustries, selectIndustry, selectIndustryIndex } from '@/store/slices/industry/industrySlices';
import { getCurrentSubindustries, saveSubindustry, selectSubindustry } from '@/store/slices/subindustry/subindustrySlices';
import { getCurrentSector } from '@/store/slices/companySector/companySectorSlices';
import ConfirmSave from './modals/ConfirmSave';
import SectionTitle from '@/components/dashboard/SectionTitle';


const Industry = () => {
  const dispatch = useDispatch()
  const nullId = import.meta.env.VITE_NULL_ID
  const { user, userCompanyInfo } = useSelector( state => state.user )
  const { industry, isLoading, selectedIndustry, selectedIndustryIndex } = useSelector( state => state.industry )
  const { subindustry, subisLoading, selectedSubindustry, savedSubindustry } = useSelector( state => state.subindustry )
  const { companySector, sectorLoading } = useSelector( state => state.companySector )
  const navigate = useNavigate()
  const loadedIndustry = userCompanyInfo?.user?.industryID !== nullId ? {industryId: userCompanyInfo?.user?.industryID, code:userCompanyInfo?.user?.industryName} : null
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState(30)
  const subindustryMainBox = document.getElementById('subindustryBox')
  
  const handleChange = (event) => {
    if(!loadedIndustry){
      dispatch(selectSubindustry(null))
      dispatch(saveSubindustry(null))
      dispatch(selectIndustryIndex(null))
      if(event.target.value){
        setValue(event.target.value)
      } else {
        dispatch(getCurrentIndustries())
        setValue(null)
      }
    }
  }
  
  const getData = () => {
    if(value){
      setLoading(true)
      dispatch(getCurrentIndustriesByName(value)).then(()=>{
        setLoading(false)
      }) 
    }
  }

  const enterPressed = (event) => {
    if (value && event.code === 'Enter') {
      getData()
  }}
  
  useEffect(()=>{
    window.addEventListener("keyup", enterPressed)

    return () => window.removeEventListener("keyup", enterPressed)
  },[value])

  useEffect(()=>{
    dispatch(getCurrentIndustries())
  },[])


  const getIndex = (industryId) => {
    const item = industry?.filter((eachItem) => eachItem.industryId === industryId)
    return industry.indexOf(item[0]) + 1
  }

  useEffect(()=>{
    if(userCompanyInfo?.user?.industryID && userCompanyInfo?.user?.industryID !== nullId  && industry){
      dispatch(selectIndustry({industryId:userCompanyInfo?.user?.industryID, code:userCompanyInfo?.user?.industryName}))      
      dispatch(selectIndustryIndex(getIndex(userCompanyInfo?.user?.industryID)))
      dispatch(getCurrentSubindustries({industryId:userCompanyInfo?.user?.industryID})) 
    }
  },[userCompanyInfo?.user?.industryID, industry])

  const handleIndustryClick = (industry,index) => {
    const industryToScroll = document.getElementById(`${index-1}`)
    industryToScroll?.scrollIntoView()
    subindustryMainBox?.scrollIntoView()
    if(!loadedIndustry){
      if(selectedIndustry && selectedIndustry?.industryId === industry.industryId){
        dispatch(selectIndustry(null))
        dispatch(selectSubindustry(null))
        dispatch(saveSubindustry(null))
        dispatch(selectIndustryIndex(null))
      }else{
        dispatch(selectIndustry(industry))
        dispatch(selectIndustryIndex(index))
        dispatch(getCurrentSubindustries({industryId:industry.industryId}))    
        dispatch(selectSubindustry(null))
        dispatch(saveSubindustry(null))
      }
    }
  }
 
  const handleSubIndustryClick = (subindustry) => {
    if(!loadedIndustry){
      if(selectedSubindustry && selectedSubindustry?.subIndustryId === subindustry.subIndustryId){
        dispatch(selectSubindustry(null))
        dispatch(saveSubindustry(null))
      } else{
        dispatch(selectSubindustry(subindustry))
        dispatch(saveSubindustry(subindustry))
      }
    }
  }

  const getOrder = (index) => {
    return ((index%4) === 1) 
    ? index + 3 
    : ((index%4 === 2)) 
    ? index + 2 
    : (index%4 === 3) 
    ? index + 1 
    : (index%4 === 0) 
    ? index
    : '0'
  }

  const getOrderResponsve = (index) => {
    return index
  }

  const handleCancel = () => {
    if(!loadedIndustry){
      setValue('')
      dispatch(getCurrentIndustries())
      dispatch(selectIndustry(null))
      dispatch(selectSubindustry(null))
      dispatch(saveSubindustry(null))
      dispatch(selectIndustryIndex(null))
      dispatch(cancelIndustry())
    }
  }

  const savePreferences = () => {
    if(companySector?.length > 0){
      dispatch(saveCurrentIndustries({
        userID: user.userId,
        companyID: user.companyId,
        industryID: selectedIndustry.industryId,
        subIndustryID: savedSubindustry?.subIndustryId || nullId
      })).then((res)=>{
        const userProgress = {...user, userCompanyId:res?.payload}
        localStorage.setItem("user", JSON.stringify(userProgress));
        dispatch(updateUser(userProgress))
        dispatch(setUserCompanyInfo({
          ...userCompanyInfo, 
          user:{...userCompanyInfo, industryID:selectedIndustry.industryId}
        }))
        dispatch(getCurrentUserCompanyInfo({userCompanyId:user.userCompanyId,userId:user.userId, companyId:res?.payload}))
        navigate('/dashboard/all-you-do')
      })
    }
    else{
      dispatch(saveCurrentIndustries({
        userID: user.userId,
        companyID: user.companyId,
        industryID: selectedIndustry.industryId,
        subIndustryID: savedSubindustry?.subIndustryId || nullId
      })).then((res)=>{
        // console.log('Hey 2', res?.payload)
        const userProgress = {...user, userCompanyId:res?.payload}
        localStorage.setItem("user", JSON.stringify(userProgress));
        dispatch(updateUser(userProgress))
        dispatch(setUserCompanyInfo({
          ...userCompanyInfo, 
          user:{...userCompanyInfo, industryID:selectedIndustry.industryId}
        }))
        dispatch(getCurrentUserCompanyInfo({userCompanyId:user.userCompanyId,userId:user.userId, companyId:res?.payload}))
        navigate('/dashboard/all-you-do')
      })
    }
  }

  return (
    <Box 
    px={2}
    w='95%'
    m='0 auto'
    py={4}
    pt={0}
    bg={['#fafafa','#fafafa','none','none']}
    borderRadius={10}
    border={['1px solid #4C5EFE','1px solid #4C5EFE','none','none']}
    h='100%'
    display='grid'
    gridTemplateRows='auto 1fr auto'
    >
      {
        loading &&
        <Spinner
        position='absolute'
        top='50%'
        left='50%'
        />
      }
      <ConfirmSave show={show} setShow={setShow} savePreferences={savePreferences} />
      <SectionTitle title='Which industry you are' text='Please enter operating industry' />
      {/* <hr/> */}
      <Box>
        <div>
          <InputGroup>
            <Input placeholder='search the industry or subindustry' 
            borderColor='gray.300'
            size='sm'
            py={0}
            bg='white'
            focusBorderColor='#4c5efe'
            borderRadius={12}
            value={value}
            onChange={handleChange}
            disabled={loadedIndustry} />
            <InputRightElement zIndex={1} w='20%' maxH='70%' mt='5px' mr='5px' mb='5px' fontSize='xs' children={<Button disabled={loadedIndustry} onClick={() => getData()} w='100%' border='none' maxH='100%' m='auto'><SearchIcon color='gray.500' /></Button>} />
          </InputGroup>
        </div>
        <Skeleton isLoaded={!isLoading || !subisLoading || !loading}>
          <Grid 
          // className='industry-grid'
          id='industryBox' 
          mt={4}
          gridTemplateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(4, 1fr)','repeat(4, 1fr)']} 
          gap={4}
          marginBottom={4}
          maxH='43.5vh'
          overflowY='scroll'
          p={2}
          >
            {
              industry && industry?.map((industry, index)=>(
                <GridItem 
                key={index}
                id={index} 
                order={`${index + 1}`}
                cursor='pointer	'
                className={industry?.industryId === selectedIndustry?.industryId ? 'industry-item active-item'  :'industry-item'}
                // w='100%'
                onClick={(e)=>handleIndustryClick(industry,(index + 1))}
                border={industry?.industryId === selectedIndustry?.industryId ? '1px solid #086CE7' : 'none'}
                borderRadius={10}
                h='100%'
                display={index + 1 > pagination ? 'none' : 'block'}
                >
                  <Skeleton h='100%' isLoaded={!isLoading || !subisLoading}>
                    <FormLabel 
                    w='100%' 
                    h='100%'                  
                    >
                        <Flex 
                        gap={2} 
                        w='100%' 
                        h='100%'
                        fontSize='xs'
                        // fontWeight='600'
                        justifyContent='space-between'
                        boxShadow='0px 0px 30px rgba(0, 0, 0, 0.1)'
                        alignContent='center' 
                        alignItems='center'
                        borderRadius={10}
                        px={2}>
                          <Image src={industry?.iconUrl || Icon} alt='icon' w='20px' objectFit='contain' />
                          <Text mt='auto' mb='auto' w='100%' textAlign='left'>
                            {industry?.code}
                          </Text>
                          <Image src={industry?.industryId === selectedIndustry?.industryId ? Icon3 : Icon2} alt='icon' w='20px' />
                        </Flex>
                    </FormLabel>
                  </Skeleton>
                </GridItem>
              ))
            }
            {
              selectedIndustryIndex && subindustry?.length > 0 &&
                <GridItem 
                className='subindustries-container' 
                colSpan={[1,1,4,4]} 
                order={[getOrderResponsve(selectedIndustryIndex), getOrderResponsve(selectedIndustryIndex),getOrder(selectedIndustryIndex),getOrder(selectedIndustryIndex)]}
                display='grid'
                margin='auto'
                w={['90%','90%','100%','100%']}
                gridTemplateColumns={['1fr','1fr','1fr','1fr']}
                justifyContent='center'
                alignItems='center'
                gap={['1rem','1rem','2rem','2rem']}
                fontSize='xs'
                fontWeight='bold'
                >
                  <Center textAlign='center'>
                    
                    {
                      subisLoading &&
                      <Spinner 
                      position='absolute'
                      top='50%'
                      left='50%' 
                      />
                    }
                    <Skeleton isLoaded={!subisLoading}>
                      <Center>
                        <Grid
                        gridTemplateColumns={['repeat(2, 1fr)','repeat(2, 1fr)','repeat(6, 1fr)','repeat(6, 1fr)']}
                        gap={2}
                        justifyContent='center'
                        alignContent='center'
                        id='subindustryBox'
                        >
                          {
                            subindustry && subindustry.map((subindustry,index)=>(
                              <Grid 
                              key={index}
                              templateColumns='1fr 17px'
                              cursor='pointer'
                              gap={2}
                              justifyContent='space-between'
                              alignItems='center' 
                              boxShadow='0px 0px 30px rgba(0, 0, 0, 0.1)'
                              px={2}
                              py={1}
                              border={subindustry?.subIndustryId === selectedSubindustry?.subIndustryId ? '1px solid #086CE7' : 'none'}
                              borderRadius='5px'
                              onClick={()=>handleSubIndustryClick(subindustry)}>
                                <Center>
                                  {subindustry?.code}
                                </Center>
                                {
                                subindustry?.subIndustryId != selectedSubindustry?.subIndustryId 
                                ?
                                <Box className='ckeckbox-subindustry' alignContent='center' alignItems='center'></Box>
                                :
                                <Flex className='ckeckbox-active' alignContent='center' alignItems='center'><Img src={Check} alt='check' mt='auto' mb='auto' w='13px' h='10px' /></Flex>
                                }
                              </Grid>
                            ))
                          }
                        </Grid>
                      </Center>
                    </Skeleton>
                  </Center>
                </GridItem>
            }

          </Grid>
          <Box 
          color='#086CE7' 
          textDecoration='underline' 
          fontWeight='bold' 
          onClick={()=>setPagination(pagination + 10)}
          cursor='pointer'
          display={ industry && pagination >= industry.length ? 'none' : 'block'}
          >Load more...
          </Box>
        </Skeleton>
      </Box>
      <Box>
        <Box py={2}>
          <Text fontSize='lg' fontWeight='600' mb={4}>
            Your selection
          </Text>
          {
            selectedIndustry &&
              <Text fontSize='md' fontWeight='500'>
                {selectedIndustry?.code && `${selectedIndustry?.code}`}  {savedSubindustry?.code && `> ${savedSubindustry?.code}`}
              </Text>
          }
        </Box>
        <Flex gap={4} mb={0} borderTop='1px solid #EBEBEB' pt={4}>
          <Button
          borderRadius={12} 
          border='none' 
          w={['50%','50%','20%','20%']}
          // size='md'
          bg='#086CE7'
          _hover={{
            background:'#000072'
          }}
          color='#fff'        
          fontWeight='500'
          disabled={!selectedIndustry || (subindustry?.length > 0 && !savedSubindustry) || userCompanyInfo?.user?.industryID !== nullId}
          onClick={()=>setShow(true)}
          // onClick={()=>savePreferences()}
          >Save and Continue</Button>
          <Button
          borderRadius={12} 
          border='1px solid gray' 
          w={['50%','50%','20%','20%']}
          // size='md'
          bg='#fff'      
          fontWeight='500'
          onClick={()=> loadedIndustry ? navigate('/dashboard/all-you-do') : handleCancel()}
          >{loadedIndustry ? 'Next step' : 'Cancel'}</Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default Industry
