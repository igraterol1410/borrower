import React, { useEffect } from 'react'
import {  useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentLoanSubtypes, getCurrentLoanSubtypeSecurity, setSelectedLoanSubtypes } from '@/store/slices/loanSubtypes/loanSubtypesSlices'
import DropDownConfig from '../companyProducts/DropDownConfig'
import ConfigLoanSubType from '../companyProducts/ConfigLoanSubType'
import { useState } from 'react'
import { postCurrentCompanyProduct, postCurrentCompanySecurity } from '@/store/slices/companyProducts/companyProductsSilices'
import { useNavigate } from 'react-router-dom'
import { getCurrentUserCompanyInfo } from '@/store/slices/user/userSlices'
import ButtonsBox from '../dashboard/ButtonsBox'
import WarningModal from '../modals/WarningModal'

const WorkingCapitalSection = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const nullId = import.meta.env.VITE_NULL_ID
    const { user, userCompanyInfo } = useSelector( state => state.user )
    const { loanSubtypes, fundedLoanSubtypes, nonFundedLoanSubtypes, selectedLoanSubtypes, loanSubtypeSecurity } = useSelector( state => state?.loansubtypes )
    const { companyProducts,companyProductsLoading } = useSelector( state => state?.companyProducts )
    const [data, setData] = useState([])
    const [securityConfig, setSecurityConfig] = useState([])
    const [security, setSecurity] = useState(false)
    const [itemChange, setItemChange] = useState(true)
    const [showWarning, setShowWarning] = useState(false)
    const [loading, setLoading] = useState(false)
    const [securityData, setSecurityData] = useState(null)
    let currentLoanArray = []
    let currentLoanSecurityArray = []
    const toast = useToast()

    useEffect(()=>{
      setLoading(true)
      dispatch(getCurrentLoanSubtypes({loanTypeId:'d399d34a-8424-48e6-acec-6de953da8480'}))
      dispatch(getCurrentLoanSubtypeSecurity({loanTypeId:'d399d34a-8424-48e6-acec-6de953da8480', userCompanyId: user?.userCompanyId}))
      setLoading(false)
    },[])

    useEffect(()=>{
      if(userCompanyInfo?.companyProducts){ 
        setLoading(true)
        const workingCapital = userCompanyInfo?.companyProducts.filter((product) => (product.loanTypeID === 'd399d34a-8424-48e6-acec-6de953da8480'))  
        const filterwc = workingCapital?.map((eachItem) => ({
          text:eachItem.loanSubTypeName,
          loanSubMenuId:eachItem.loanSubTypeID,
          loanSubTypeGroupID: eachItem.loanSubTypeGroupID,
          userCompanyProductID: eachItem.userCompanyProductID
        })) 
        dispatch(setSelectedLoanSubtypes(filterwc))
        setLoading(false)
      }else{
        setLoading(false)
        dispatch(setSelectedLoanSubtypes([]))
      }
    },[userCompanyInfo?.companyProducts])

    useEffect(()=>{
        if(data.length === 0){
          setSecurity(false)
        }
    },[data])

    const changeSecurity = (value) => {
      if(data.length > 0){
        data.map((product) => (product.isSecured = value))
        setSecurity(value)
      }
    }

    const handleSave = () => {
      const error = []
        data.forEach(element => {
          if(!element.amount || element.amount <= 0 || !element.tenure || element.tenure <= 0){
            toast({
              title: 'Amount and Tenure are required',
              status: 'error',
              duration: 3000,
              position: 'top'
          })
          error.push(element)
          }
        });  
        if(error.length === 0){
          saveData()
        }else if(userCompanyInfo?.companyProducts && security){
          dispatch(postCurrentCompanySecurity(securityConfig))
        }
      }
    
    const saveData = () => {
      setLoading(true)
      const securityToSave = securityData?.map((data) => (
        {
          userCompanyID: user?.userCompanyId,
          companySecurityID: data.titleId,
          loanTypeID: 'd399d34a-8424-48e6-acec-6de953da8480',
          itemValue: JSON.stringify(data),
          isActive: true,
          createdOn: null,
          modifiedOn: null,
          createdBy: null,
          modifiedBy: null
        }
      ))
      // console.log(securityToSave)
      dispatch(postCurrentCompanyProduct(data)).then((res) => {
        if(res.payload?.error){
          toast({
            title: res.payload?.message,
            status: 'error',
            duration: 3000,
            position: 'top'
          })
        }else{
          data.forEach((product) => {
            toast({
              title: 'Product saved successfully',
              status: 'success',
              duration: 3000,
              position: 'top'
            })
          })
          setItemChange(true)
          if(!security){
            dispatch(getCurrentUserCompanyInfo({userCompanyId:user.userCompanyId,userId:user.userId, companyId:user.companyId}))
          }
        }
        setLoading(false)
      })
      if(security){
        dispatch(postCurrentCompanySecurity(securityToSave)).then((res) => {
          if(res.payload?.error){
            toast({
              title: res.payload?.message,
              status: 'error',
              duration: 3000,
              position: 'top'
            })
          }
          dispatch(getCurrentUserCompanyInfo({userCompanyId:user.userCompanyId,userId:user.userId, companyId:user.companyId}))
        })
      }      
    }

    useEffect(()=>{
      setLoading(true)
        selectedLoanSubtypes.forEach(eachSelectedLoanSubtypes => {
            currentLoanArray.push({
                companyUserID:user?.userCompanyId,
                loanTypeID:'d399d34a-8424-48e6-acec-6de953da8480',
                loanSubtype:(eachSelectedLoanSubtypes?.parentId !== nullId) ? eachSelectedLoanSubtypes?.parentId : eachSelectedLoanSubtypes?.loanSubMenuId,
                loanSubTypeGroupID: (eachSelectedLoanSubtypes?.parentId !== nullId) ? eachSelectedLoanSubtypes?.loanSubMenuId : nullId,
                tenure:0,
                tenureType:'Month',
                amount:0,
                amountType:'Cr',
                currency:'rupee', 
                isSecured: security,
                counterParty: null,
                principalFrequencyTypeID: "None",
                principalpaymentFrequencyID: "None",
                isActive: true,
                createdOn: null,
                modifiedOn: null,
                createdBy: null,
                modifiedBy: null
            })
        });
        setData(currentLoanArray)
        setLoading(false)
    },[selectedLoanSubtypes])

    useEffect(()=>{
      setLoading(true)
        loanSubtypeSecurity?.forEach(eachLoanSubtypeSecurity => {
            currentLoanSecurityArray.push({
                userCompanyID: user?.userCompanyId,
                companySecurityID: null,
                loanTypeID: 'd399d34a-8424-48e6-acec-6de953da8480',
                itemValue: false,
                isActive: true,
                createdOn: null,
                modifiedOn: null,
                createdBy: null,
                modifiedBy: null
              })            
        });
          setSecurityConfig(currentLoanSecurityArray)
          setLoading(false)
    },[loanSubtypeSecurity])

    const handleCancel = () => {
      if(!itemChange){
        setShowWarning(true)
      }else{
        navigate('/dashboard/preferences')
      }
    }

  return (
    <>
      <WarningModal 
      show={showWarning}
      setShow={setShowWarning} 
      action={() => navigate('/dashboard/preferences')}
      label='You have unsaved changes. You can leave to discard your changes, or cancel to continue editing.'
      />
    <DropDownConfig
    selectedLoanSubtypes={selectedLoanSubtypes}
    fundedLoanSubtypes={fundedLoanSubtypes}
    nonFundedLoanSubtypes={nonFundedLoanSubtypes}
    loanSubtypeSecurity={loanSubtypeSecurity}
    // loanSubtypeSecurity={userCompanyInfo && userCompanyInfo.companySecurity?.filter((eachData) => eachData.loanTypeID === 'd399d34a-8424-48e6-acec-6de953da8480') || []}
    loanSubtypes={loanSubtypes}
    setSelectedAction={setSelectedLoanSubtypes}
    mainTitle='Working Capital'
    dropDownText='-- Select Working Capital --'
    securityConfig={securityConfig}
    security={security}
    setSecurity={changeSecurity}
    loanTypeID={'d399d34a-8424-48e6-acec-6de953da8480'}
    setItemChange={setItemChange}
    securityData={securityData}
    setSecurityData={setSecurityData}
    />

      {
        selectedLoanSubtypes.length > 0 && selectedLoanSubtypes.map((loanSubtype, index)=>(
            <ConfigLoanSubType 
            loanSubtype={loanSubtype} 
            key={index} 
            data={data[index]} 
            setItemChange={setItemChange} />
        ))
      }

      <ButtonsBox 
      position='rigth'
      primaryLabel='Save'
      secundaryLabel='Next step'
      confirmAction={handleSave}
      disabledConditions={data.length === 0 || itemChange}
      isLoading={loading}
      cancelAction={()=> handleCancel()}
      />
      {/* <Flex gap={4} mt={3} justifyContent='flex-end'>
          <Button 
          border='none' 
          borderRadius={12}
          w={['50%','50%','15%','15%']}
          bg='#086CE7'
          color='#fff'        
          fontWeight='500'
          isLoading={companyProductsLoading}
          disabled={data.length === 0}
          // type='submit'
          onClick={handleSave}
          >Save</Button>
          <Button 
          border='1px solid gray' 
          borderRadius={12}
          w={['50%','50%','15%','15%']}
          bg='#fff'      
          fontWeight='500'
          onClick={()=> navigate('/dashboard/preferences')}
          >Next step</Button>
      </Flex> */}
    </>
  )
}

export default WorkingCapitalSection
