import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentTermLoanSubtypes, getCurrentTermLoanSubtypeSecurity, setSelectedTermLoanSubtypes } from '@/store/slices/termLoanSubtypes/termLoanSubtypesSlices'
import DropDownConfig from '../companyProducts/DropDownConfig'
import ConfigTermLoan from '../companyProducts/ConfigTermLoan'
import { postCurrentCompanyProduct, postCurrentCompanySecurity } from '@/store/slices/companyProducts/companyProductsSilices'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUserCompanyInfo } from '@/store/slices/user/userSlices'
import ButtonsBox from '../dashboard/ButtonsBox'
import WarningModal from '../modals/WarningModal'

const TermLoanSection = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const nullId = import.meta.env.VITE_NULL_ID
    const { user, userCompanyInfo } = useSelector( state => state.user )
    const { termLoanSubtypes, fundedTermLoanSubtypes, nonFundedTermLoanSubtypes, selectedTermLoanSubtypes, termLoanSubtypesLoading, termLoanSubtypeSecurity } = useSelector( state => state?.termLoansubtypes )
    const { companyProducts,companyProductsLoading } = useSelector( state => state?.companyProducts )
    const [data, setData] = useState([])
    const [securityConfig, setSecurityConfig] = useState([])
    const [security, setSecurity] = useState(false)
    const [correctPercentage, setCorrectPercentage] = useState(false)
    const [itemChange, setItemChange] = useState(true)
    const [showWarning, setShowWarning] = useState(false)
    const [savingData, setSavingData] = useState(false)
    const [loading, setLoading] = useState(false)
    const [securityData, setSecurityData] = useState(null)
    let currentLoanArray = []
    let currentLoanSecurityArray = []

    useEffect(()=>{
      setLoading(true)
      dispatch(getCurrentTermLoanSubtypes({loanTypeId:'60bab611-07f8-4788-b5d0-890db4806d58'}))
      dispatch(getCurrentTermLoanSubtypeSecurity({loanTypeId:'60bab611-07f8-4788-b5d0-890db4806d58', userCompanyId: user?.userCompanyId}))
      setLoading(false)
    },[])

    useEffect(()=>{
      setLoading(true)
      if(userCompanyInfo?.companyProducts){
        const termLoan = userCompanyInfo?.companyProducts.filter((product) => (product.loanTypeID === '60bab611-07f8-4788-b5d0-890db4806d58'))  
        const filtertl = termLoan?.map((eachItem) => ({
          text:eachItem.loanSubTypeName, 
          loanSubMenuId:eachItem.loanSubTypeID,
          userCompanyProductID: eachItem.userCompanyProductID,
          parentId:nullId
        }))
        dispatch(setSelectedTermLoanSubtypes(filtertl))
        setLoading(false)
      }else{
        dispatch(setSelectedTermLoanSubtypes([]))        
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
      data.forEach((element, index) => {
        if(!element.amount || element.amount <= 0 || !element.tenure || element.tenure <= 0 || element.principalFrequencyTypeID === "None" ||element.principalpaymentFrequencyID === "None"){
          error.push(index)
          toast({
            title: 'Amount, Tenure, Principal payment frequency and Payment type are required',
            status: 'error',
            duration: 3000,
            position: 'top'
        })
        }
      });
      return error.length > 0
    }
    
    const saveData = () => {
      if(!handleSave()){
        setLoading(true)
        const securityToSave = securityData?.map((data) => (
          {
            userCompanyID: user?.userCompanyId,
            companySecurityID: data.titleId,
            loanTypeID: '60bab611-07f8-4788-b5d0-890db4806d58',
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
            setLoading(false)
          }else{
            toast({
              title: 'Product saved successfully',
              status: 'success',
              duration: 3000,
              position: 'top'
            })
            setItemChange(true)
            setLoading(false)
          }
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
          })
        }        
        dispatch(getCurrentUserCompanyInfo({userCompanyId:user.userCompanyId,userId:user.userId, companyId:user.companyId}))
      }
    }

    useEffect(()=>{
      setLoading(true)
      selectedTermLoanSubtypes.forEach(eachSelectedLoanSubtypes => {
        currentLoanArray.push({
          companyUserID:user?.userCompanyId,
          loanTypeID:'60bab611-07f8-4788-b5d0-890db4806d58',
          loanSubtype:eachSelectedLoanSubtypes?.parentId !== nullId ? eachSelectedLoanSubtypes?.parentId: eachSelectedLoanSubtypes?.loanSubMenuId,
          loanSubTypeGroupID:nullId,
          tenure:0,
          tenureType:'Month',
          amount:0,
          amountType:'Cr',
          currency:'rupee', 
          isSecured: security,
          counterParty: null,
          moratorium: 0,
          moratoriumType: 'Month',
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
  },[selectedTermLoanSubtypes])

  useEffect(()=>{
    setLoading(true)
    termLoanSubtypeSecurity?.forEach(eachLoanSubtypeSecurity => {
          currentLoanSecurityArray.push({
              userCompanyID: user?.userCompanyId,
              companySecurityID: null,
              loanTypeID: '60bab611-07f8-4788-b5d0-890db4806d58',
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
  },[termLoanSubtypeSecurity])

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
    selectedLoanSubtypes={selectedTermLoanSubtypes}
    fundedLoanSubtypes={fundedTermLoanSubtypes}
    nonFundedLoanSubtypes={nonFundedTermLoanSubtypes}
    loanSubtypeSecurity={termLoanSubtypeSecurity}
    // loanSubtypeSecurity={userCompanyInfo?.companySecurity?.filter((eachData) => eachData.loanTypeID === '60bab611-07f8-4788-b5d0-890db4806d58') || []}
    loanSubtypes={termLoanSubtypes}
    setSelectedAction={setSelectedTermLoanSubtypes}
    mainTitle='Term Loan'
    dropDownText='-- Select Term Loan --'
    securityConfig={securityConfig}
    security={security}
    setSecurity={() => changeSecurity()}
    loanTypeID={'60bab611-07f8-4788-b5d0-890db4806d58'}
    setItemChange={setItemChange}
    securityData={securityData}
    setSecurityData={setSecurityData}
    />

    {
        selectedTermLoanSubtypes.length > 0 && selectedTermLoanSubtypes.map((loanSubtype, index)=>(
            <ConfigTermLoan 
            loanSubtype={loanSubtype} 
            key={index} 
            data={data[index]}
            setCorrectPercentage={setCorrectPercentage}
            savingData={savingData}
            setSavingData={setSavingData} 
            saveData={saveData}
            setItemChange={setItemChange}
            />
        ))
    }
    <ButtonsBox 
      position='rigth'
      primaryLabel='Save'
      secundaryLabel='Next step'
      confirmAction={() => setSavingData(true)}
      disabledConditions={data.length === 0 || itemChange || loading}
      isLoading={loading}
      cancelAction={()=> handleCancel()}
      />
    </>
  )
}

export default TermLoanSection
