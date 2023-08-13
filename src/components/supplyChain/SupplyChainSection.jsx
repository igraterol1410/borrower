import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DropDownConfig from '../companyProducts/DropDownConfig'
import { getCurrentSupplyChainSubtypes, getCurrentSupplyChainSubtypeSecurity, setSelectedSupplyChainSubtypes } from '@/store/slices/supplyChain/supplyChainSlices'
import ConfigSuplyChain from '../companyProducts/ConfigSuplyChain'
import { useToast } from '@chakra-ui/react'
import { postCurrentCompanyProduct, postCurrentCompanySecurity } from '@/store/slices/companyProducts/companyProductsSilices'
import { useNavigate } from 'react-router-dom'
import { getCurrentUserCompanyInfo } from '@/store/slices/user/userSlices'
import ButtonsBox from '../dashboard/ButtonsBox'
import WarningModal from '../modals/WarningModal'

const SupplyChainSection = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const nullId = import.meta.env.VITE_NULL_ID
    const { user, userCompanyInfo } = useSelector( state => state.user )
    const { supplyChainsubtypes, fundedSupplyChainSubtypes, nonFundedSupplyChainSubtypes, selectedSupplyChainSubtypes, supplyChainSubtypesLoading, supplyChainSubtypeSecurity } = useSelector( state => state?.supplyChainsubtypes )
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

    useEffect(()=>{
      setLoading(true)
      dispatch(getCurrentSupplyChainSubtypes({loanTypeId:'13043b21-ba6d-4f6f-b65e-51fce978249b'}))
      dispatch(getCurrentSupplyChainSubtypeSecurity({loanTypeId:'13043b21-ba6d-4f6f-b65e-51fce978249b', userCompanyId: user?.userCompanyId}))
      setLoading(false)
    },[])

    useEffect(()=>{
      if(userCompanyInfo?.companyProducts){
        setLoading(true)
        const supplyChainFinance = userCompanyInfo?.companyProducts.filter((product) => (product.loanTypeID === '13043b21-ba6d-4f6f-b65e-51fce978249b'))  
        const filtersc = supplyChainFinance?.map((eachItem) => ({
          text:eachItem.loanSubTypeName, 
          loanSubMenuId:eachItem.loanSubTypeID,
          parentId:nullId,
          userCompanyProductID: eachItem.userCompanyProductID
        })) 
        // dispatch(setSelectedLoanSubtypes(filterwc))
        // dispatch(setSelectedTermLoanSubtypes(filtertl))
        dispatch(setSelectedSupplyChainSubtypes(filtersc))  
        setLoading(false)      
      }else{
        dispatch(setSelectedSupplyChainSubtypes([]))        
        setLoading(false)      
      }
    },[userCompanyInfo?.companyProducts])

    useEffect(()=>{
        if(data.length === 0){
          setSecurity(false)
        }
    },[data])

    const changeSecurity = () => {
      if(data.length > 0){
        data.map((product) => (product.isSecured = !security))
        setSecurity(!security)
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
        }
      }

    const saveData = () => {
      setLoading(true)
      const securityToSave = securityData?.map((data) => (
        {
          userCompanyID: user?.userCompanyId,
          companySecurityID: data.titleId,
          loanTypeID: '13043b21-ba6d-4f6f-b65e-51fce978249b',
          itemValue: JSON.stringify(data),
          isActive: true,
          createdOn: null,
          modifiedOn: null,
          createdBy: null,
          modifiedBy: null
        }
      ))
      dispatch(postCurrentCompanyProduct(data)).then((res) => {
        if(res.payload?.error){
          toast({
            title: res.payload?.message,
            status: 'error',
            duration: 3000,
            position: 'top'
          })
        }else{
          toast({
            title: 'Product saved successfully',
            status: 'success',
            duration: 3000,
            position: 'top'
          })
          setItemChange(true)
        }
        setLoading(false)
      })
      if(security){
        setLoading(true)
        dispatch(postCurrentCompanySecurity(securityToSave)).then((res) => {
          if(res.payload?.error){
            toast({
              title: res.payload?.message,
              status: 'error',
              duration: 3000,
              position: 'top'
            })
          }
          setLoading(false)
        })
      }      
      dispatch(getCurrentUserCompanyInfo({
        userCompanyId:user.userCompanyId,
        userId:user.userId, 
        companyId:user.companyId
      }))
    }

    useEffect(()=>{
      setLoading(true)
      selectedSupplyChainSubtypes.forEach(eachSelectedLoanSubtypes => {
        currentLoanArray.push({
          companyUserID:user?.userCompanyId,
          loanTypeID:'13043b21-ba6d-4f6f-b65e-51fce978249b',
          loanSubtype:eachSelectedLoanSubtypes?.parentId !== nullId ? eachSelectedLoanSubtypes?.parentId: eachSelectedLoanSubtypes?.loanSubMenuId,
          loanSubTypeGroupID:eachSelectedLoanSubtypes?.parentId !== nullId ? eachSelectedLoanSubtypes?.loanSubMenuId : nullId,
          tenure:0,
          tenureType:'Month',
          amount:0,
          amountType:'Cr',
          currency:'rupee', 
          isSecured: security,
          counterParty: "string",
          principalFrequencyTypeID: "None",
          principalpaymentFrequencyID: "None",
          isActive: true,
          createdOn: null,
          modifiedOn: null,
          createdBy: null,
          modifiedBy: null
        })
      });
      if(currentLoanArray.length === 0){
        setSecurity(false)
      }
      setData(currentLoanArray)
      setLoading(false)
  },[selectedSupplyChainSubtypes])

  useEffect(()=>{
    setLoading(true)
    supplyChainSubtypeSecurity?.forEach(eachLoanSubtypeSecurity => {
          currentLoanSecurityArray.push({
              userCompanyID: user?.userCompanyId,
              companySecurityID: null,
              loanTypeID: '13043b21-ba6d-4f6f-b65e-51fce978249b',
              itemValue: null,
              isActive: true,
              createdOn: null,
              modifiedOn: null,
              createdBy: "string",
              modifiedBy: "string"
            })            
      });
      setSecurityConfig(currentLoanSecurityArray)
      setLoading(false)
  },[supplyChainSubtypeSecurity])

  const handleCancel = () => {
    if(!itemChange){
      setShowWarning(true)
    }else{
      navigate('/dashboard/preferences')
    }
  }

  return (
    <>
    {/* {console.log(state)} */}
      <WarningModal 
      show={showWarning}
      setShow={setShowWarning} 
      action={() => navigate('/dashboard/preferences')}
      label='You have unsaved changes. You can leave to discard your changes, or cancel to continue editing.'
      />
    <DropDownConfig
    selectedLoanSubtypes={selectedSupplyChainSubtypes}
    fundedLoanSubtypes={fundedSupplyChainSubtypes}
    nonFundedLoanSubtypes={nonFundedSupplyChainSubtypes}
    loanSubtypeSecurity={supplyChainSubtypeSecurity}
    // loanSubtypeSecurity={userCompanyInfo?.companySecurity?.filter((eachData) => eachData.loanTypeID === '13043b21-ba6d-4f6f-b65e-51fce978249b') || []}
    getCurrentAction={getCurrentSupplyChainSubtypes}
    getCurrentActionSecurity={getCurrentSupplyChainSubtypeSecurity}
    loanSubtypes={supplyChainsubtypes}
    setSelectedAction={setSelectedSupplyChainSubtypes}
    mainTitle='Supply Chain Financing'
    dropDownText='-- Select Supply Chain Finance --'
    securityConfig={securityConfig}
    security={security}
    setSecurity={() => changeSecurity()}
    loanTypeID={'13043b21-ba6d-4f6f-b65e-51fce978249b'}
    setItemChange={setItemChange}
    securityData={securityData}
    setSecurityData={setSecurityData}
    />

    {
      selectedSupplyChainSubtypes.length > 0 && selectedSupplyChainSubtypes.map((loanSubtype, index)=>(
        <ConfigSuplyChain 
        loanSubtype={loanSubtype} 
        key={index} 
        data={data[index]}
        setItemChange={setItemChange}
         />
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
    </>
  )
}

export default SupplyChainSection
