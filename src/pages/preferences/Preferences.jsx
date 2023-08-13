import DropdownBank from '@/components/banks/DropdownBank'
import DropdownDocuments from '@/components/banks/DropdownDocuments'
import PreferencesSecundaryTitle from '@/components/banks/PreferencesSecundaryTitle'
import { getCurrentDocuments } from '@/store/slices/documents/documentSlices'
import { getCurrentUserCompanyInfo, updateUser } from '@/store/slices/user/userSlices'
import { Grid, Textarea, Input, Flex, GridItem, Button, InputGroup, InputLeftElement, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePercentage } from "react-icons/ai";
import { excludeBank, includeBank, postCurrentBanks } from '@/store/slices/banks/bankSlices'
import SectionTitle from '@/components/dashboard/SectionTitle'
import ButtonsBox from '@/components/dashboard/ButtonsBox'
import WarningModal from '@/components/modals/WarningModal'

const Preferences = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()    
  const nullId = import.meta.env.VITE_NULL_ID
  const { user, userCompanyInfo } = useSelector(state => state.user)
  const { documents, excludedDocuments } = useSelector(state => state.documents)
  const { excludedBank, includedBank } = useSelector(state => state.banks)
  const [value, setValue] = useState()
  const [textAreaValue, setTextAreaValue] = useState('')
  const [itemChange, setItemChange] = useState(true)
  const [showWarning, setShowWarning] = useState(false)
  let currentExcluded = []
  let currentPrefered = []

  const handleChange = (event) => {
    if (event.target.value > 80) {
      setValue(80)
    } else if (event.target.value < 0) {
      setValue(0)
    } else {
      setValue(event.target.value)
    }
  }
  const handleInputChange = (event) => {
    setTextAreaValue(event.target.value)
    setItemChange(false)
  }

  // useEffect(() => {
  //   dispatch(getCurrentDocuments())
  // }, [])

  useEffect(() => {
    if (userCompanyInfo?.companyPreferences) {
      setValue(userCompanyInfo?.companyPreferences[0]?.priceAskPercent)
      let excludedRepeated = []
      let preferedRepeated = []
      userCompanyInfo.companyPreferences.forEach((preference) => {
        const verify = excludedRepeated.filter((eachRepeated) => (eachRepeated.excludedBankID === preference.excludedBankID))
        if (verify.length === 0) {
          if(preference.excludedBankID !== nullId){
            excludedRepeated.push(preference)
          }
        }
      })
      userCompanyInfo.companyPreferences.forEach((preference) => {
        const verify = preferedRepeated.filter((eachRepeated) => (eachRepeated.preferredBankID === preference.preferredBankID))
        if (verify.length === 0) {
          if(preference.preferredBankID !== nullId){
            preferedRepeated.push(preference)
          }
        }
      })
      currentExcluded = excludedRepeated.map((eachPreference) => ({
        bankId: eachPreference.excludedBankID,
        code: eachPreference.excludedBanks
      }))
      currentPrefered = preferedRepeated.map((eachPreference) => ({
        bankId: eachPreference.preferredBankID,
        code: eachPreference.preferredBanks
      }))
      dispatch(excludeBank(currentExcluded))
      dispatch(includeBank(currentPrefered))
    }
  }, [userCompanyInfo?.companyPreferences])

  const getStringFromArray = (array) => {
    let newArray = []
    array.forEach(element => {
      newArray.push(element.bankId)
    });
    return newArray.toString()
  }

  const savePreferences = () => {
    const data = {
      excludedBanks: getStringFromArray(excludedBank),
      preferredBanks: getStringFromArray(includedBank),
      remarks: textAreaValue,
      priceAskPercent: value || 0,
      userCompanyID: user?.userCompanyId,
      isActive: true,
      createdOn: "2022-12-29T04:00:23.186Z",
      createdBy: "string",
      modifiedOn: "2022-12-29T04:00:23.186Z",
      modifiedBy: "string"
    }
    dispatch(postCurrentBanks(data)).then((res) => {
      dispatch(getCurrentUserCompanyInfo({userCompanyId:user.userCompanyId,userId:user.userId, companyId:user.companyId}))
      setItemChange(true)
      navigate('/dashboard/kyc-documents')
    })
  }

  const handleCancel = () => {
    if(!itemChange){
      setShowWarning(true)
    }else{
      navigate('/dashboard/kyc-documents')
    }
  }

  return (
    <section className='step-main-content'>
      <WarningModal 
      show={showWarning}
      setShow={setShowWarning} 
      action={() => navigate('/dashboard/kyc-documents')}
      label='You have unsaved changes. You can leave to discard your changes, or cancel to continue editing.'
      />
      <SectionTitle title='Preferences' text='Please enter you industry here and continue the process' />
      <PreferencesSecundaryTitle title='Preferred Lender' />
      {/* <PreferencesSecundaryTitle title='Excluded Bank' /> */}
      <DropdownBank
        action='include'
        emptyText='Select Bank'
        setItemChange={setItemChange}
        />
      {/* <PreferencesSecundaryTitle title='Prefered Bank' /> */}
      <PreferencesSecundaryTitle title='Excluded Lender' />
      <Grid
        gridTemplateColumns={['1fr', '1fr', '1fr', '1fr']}
        gap={2}
      >
        <GridItem>
          <DropdownBank
            action='exclude'
            emptyText='Select Bank'
            setItemChange={setItemChange}
            />
        </GridItem>
        {/* <GridItem>
          <InputGroup h='auto'>
            <InputLeftElement
              pointerEvents='none'
              children={<AiOutlinePercentage color='gray.300' />}
            />
            <Input
              type='number'
              borderColor='#D9D9D9'
              bg='white'
              focusBorderColor='#4c5efe'
              placeholder='Pricing Ask'
              min={0}
              value={value}
              onChange={(e) => {
                handleChange(e)
                setItemChange(false)
              }}
            />
          </InputGroup> */}
          {/* <Input 
            placeholder='PRICING ASK %' 
            borderColor='gray.300'
            focusBorderColor='#4c5efe'
            borderRadius={8}
            bg='white'
            type='number'
            p={1}
            paddingRight={0}
            value={value}
            onChange={handleChange} /> */}
        {/* </GridItem> */}
      </Grid>
      <PreferencesSecundaryTitle title='Any other extra comments' />
      {/* <DropdownDocuments 
        documents={documents} 
        excludedDocuments={excludedDocuments}
        emptyText='Select Documents' />
        <PreferencesSecundaryTitle title='Other comments (max 250 characters) ' /> */}
      <Textarea
        onChange={handleInputChange}
        defaultValue={userCompanyInfo?.companyPreferences ? userCompanyInfo?.companyPreferences[0]?.remarks : ''}
        focusBorderColor='#4c5efe'
        borderColor='#D9D9D9'
        bg='white'
        maxLength={250}
        placeholder='Comments'
        resize='none'
        size='sm'
        w='94%'
      />
        <ButtonsBox
        primaryLabel='Save and Continue'
        secundaryLabel='Next step'
        disabledConditions={itemChange}
        confirmAction={() => savePreferences()}
        cancelAction={() => handleCancel()}
        />
      {/* <Flex mt={4} gap={4}>
        <Button
          border='none'
          borderRadius={12}
          w={['50%','50%','20%','20%']}
          bg='#086CE7'
          color='#fff'
          fontWeight='500'
          // disabled={!textAreaValue || !value || excludedBank.length === 0 || includedBank.length === 0 || excludedBank.length === 0}
          onClick={() => savePreferences()}
        >
          Save and Continue
        </Button>
        <Button
          border='1px solid gray'
          borderRadius={12}
          w={['50%','50%','20%','20%']}
          bg='#fff'
          fontWeight='500'
          onClick={() => navigate('/dashboard/kyc-documents')}
        >
          Next step
        </Button>
      </Flex> */}
    </section>
  )
}

export default Preferences
