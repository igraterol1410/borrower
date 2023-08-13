import { Box, Button, Center, Divider, Flex, Grid, GridItem, Image, Img, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import './styles/all-you-do.css'
import SectorImage from '../../assets/icons/industry-sector.svg'
import SectorImage1 from '../../assets/icons/Manufacturing.svg'
import SectorImage2 from '../../assets/icons/Trading.svg'
import SectorImage3 from '../../assets/icons/Export.svg'
import SectorImage4 from '../../assets/icons/Import.svg'
import SectorImage5 from '../../assets/icons/EPC.svg'
import SectorImage6 from '../../assets/icons/servicesSector.svg'
import SectorImage7 from '../../assets/icons/Others.svg'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCurrentSector, getCurrentSector, saveCurrentSector, selectSector } from '@/store/slices/companySector/companySectorSlices'

import Check from '@/assets/icons/check.svg'
import { getCurrentUserCompanyInfo } from '@/store/slices/user/userSlices'
import { useNavigate } from 'react-router-dom'
import SectionTitle from '@/components/dashboard/SectionTitle'
import ButtonsBox from '@/components/dashboard/ButtonsBox'
import WarningModal from '@/components/modals/WarningModal'

const AllYouDo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, userCompanyInfo } = useSelector( state => state?.user )
  const { companySector, sectorLoading, selectedSector } = useSelector( state => state?.companySector)
  const [showWarning, setShowWarning] = useState(false)  
  const [itemChange, setItemChange] = useState(true)

  useEffect(()=>{
    dispatch(getCurrentSector())
  },[])
 
  useEffect(()=>{
    if(userCompanyInfo?.companySector){
      const currentSectors = userCompanyInfo.companySector.map((eachSector) => ({
        companySectorID: eachSector.companySectorID,
        sectorName: eachSector.sectorName, 
        sectorDescription: ""
      }))
      dispatch(selectSector(currentSectors))
    }else{
      dispatch(selectSector([]))
    }
  },[userCompanyInfo?.companySector])

  const handleSectorClick = (sector) => {
    // console.log(sector.companySectorID)
    setItemChange(false)
    if(!verifySector(sector.companySectorID)){
      dispatch(selectSector([...selectedSector, sector]))
    }else{
      const sectorToDelete = selectedSector.filter((eachSector)=>(eachSector.companySectorID === sector.companySectorID))
      if(userCompanyInfo?.companySector){
        // console.log(sector.companySectorID)
        const currentSectorToDelete = userCompanyInfo?.companySector.filter((eachSector)=>(eachSector.companySectorID === sector.companySectorID))
        // console.log(currentSectorToDelete)
        // if(currentSectorToDelete.length > 0){
        //   console.log('eleting')
        //   dispatch(deleteCurrentSector({id:sector.companySectorID}))
        // }
      }
        const index = selectedSector.indexOf(sectorToDelete[0])
        const newArray = [...selectedSector]
        newArray.splice(index, 1)
        dispatch(selectSector(newArray))
    }
  }
  
  const savePreferences = (sector) => {
    // dispatch(selectSector(sector))
    const dataToSave = selectedSector.map((eachSector) => ({
      userCompanyID: user?.userCompanyId,
      companySectorID: eachSector.companySectorID,
      isActive: eachSector.isActive,
      createdOn: null,
      createdBy: null,
      modifiedOn: null,
      modifiedBy: null,
      itemID: eachSector.itemID
    }))
    dispatch(saveCurrentSector(dataToSave)).then((res) => {
      dispatch(getCurrentUserCompanyInfo({userCompanyId:user.userCompanyId,userId:user.userId, companyId:user.companyId}))
      setItemChange(true)
      navigate('/dashboard/company-products')
    })
  }
  
  const handleCancel = () => {
    // dispatch(selectSector(null))
    if(!itemChange){
      setShowWarning(true)
    }else{
      navigate('/dashboard/company-products')
    }
  }

  const verifySector = (sectorId) => {
    const currentSelectedSector = selectedSector.filter((eachSector)=>(eachSector.companySectorID === sectorId))
    return currentSelectedSector?.length > 0
  }

  const getImages = {
    TRADER:SectorImage2,
    Trader:SectorImage2,
    trader:SectorImage2,
    EPC:SectorImage5,
    Epc:SectorImage5,
    epc:SectorImage5,
    IMPORT:SectorImage4,
    Import:SectorImage4,
    import:SectorImage4,
    EXPORT:SectorImage3,
    Export:SectorImage3,
    export:SectorImage3,
    MANUFACTURING:SectorImage1,
    Manufacturing:SectorImage1,
    manufacturing:SectorImage1,
    SERVICES:SectorImage6,
    Services:SectorImage6,
    services:SectorImage6,
    OTHERS:SectorImage7,
    Others:SectorImage7,
    others:SectorImage7
  }

  return (
    <section className='step-main-content'>
      <WarningModal 
      show={showWarning}
      setShow={setShowWarning} 
      action={() => navigate('/dashboard/company-products')}
      label='You have unsaved changes. You can leave to discard your changes, or cancel to continue editing.'
      />
      <Box
      h='100%'
      display='grid'
      gridTemplateRows='auto 1fr auto'
      >
      <SectionTitle title='Nature of operations' text='' />
      <Box>
        <Grid
        gridTemplateColumns={['repeat(2, 1fr)','repeat(2, 1fr)','repeat(5, 1fr)','repeat(5, 1fr)']}
        gap={4}
        mt={6}
        >
          {
            sectorLoading ?
            <Spinner 
              position='absolute'
              top='50%'
              left='50%' 
              />
            :
            companySector && companySector.map((sector, index)=>(
              <GridItem key={index} className={verifySector(sector.companySectorID) ? 'sector-item checked-item' : 'sector-item'} onClick={()=>handleSectorClick(sector)}>              
                {
                verifySector(sector.companySectorID)
                ?
                <Box className='ckeckbox ckeckbox-active'><Img src={Check} alt='check' /></Box>
                :
                <Box className='ckeckbox'></Box>
                }
                {/* <Box className='ckeckbox'></Box> */}
                <Center>
                  <Image src={getImages[sector.sectorName] || SectorImage6} alt='' />
                </Center>
                <Center>
                  {sector.sectorName}
                </Center>
              </GridItem>
            ))
          }
        </Grid>
      </Box>
        <Box py={2} mt={4}>
          <Text fontSize='lg' fontWeight='600' mb={4}>
            Your selection
          </Text>
          {
            selectedSector && selectedSector.map((sector, index)=>(
              <Text key={index} fontSize='md' fontWeight='500'>
                - {sector.sectorName}
              </Text>
            ))
          }
        </Box>
        <ButtonsBox
        primaryLabel='Save and Continue'
        secundaryLabel='Next step'
        disabledConditions={itemChange}
        confirmAction={() => savePreferences(selectedSector)}
        cancelAction={handleCancel}
        />
        {/* <Flex gap={4}>
          <Button 
          border='none' 
          borderRadius={12}
          w={['50%','50%','20%','20%']}
          bg='#086CE7'
          color='#fff'        
          fontWeight='500'
          disabled={!(selectedSector)}
          onClick={()=>savePreferences(selectedSector)}
          >Save and Continue</Button>
          <Button 
          border='1px solid gray'
          borderRadius={12} 
          w={['50%','50%','20%','20%']}
          bg='#fff'      
          fontWeight='500'
          onClick={()=>handleCancel()}
          >Next step</Button>
        </Flex> */}
      </Box>
    </section>
  )
}

export default AllYouDo
