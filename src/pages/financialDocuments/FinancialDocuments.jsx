import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ManageDocuments from '@/components/uploadDocs/ManageDocuments'
import { getCurrentKYCDocs, getUploadedFinancialDocs, uploadFinancialDocs } from '@/store/slices/kycDocs/kycDocumetsSlices'
import { Box } from '@chakra-ui/react'
import SectionTitle from '@/components/dashboard/SectionTitle'

const FinancialDocuments = () => {
  const dispatch = useDispatch()
  const { user, userCompanyInfo } = useSelector(state => state.user)
  const nullId = import.meta.env.VITE_NULL_ID
  const { KYCdocuments, kycDocLoading, uploadedFinancialDocuments } = useSelector(state => state.kycDocuments)
  const industryId = userCompanyInfo?.user?.industryID !== nullId ? userCompanyInfo?.user?.industryID : 0
  const subindustryId = userCompanyInfo?.user?.subIndutryId 

  useEffect(() => {
    if (industryId && user?.userCompanyId) {
      dispatch(getCurrentKYCDocs({ industryId: industryId, subindustryId: subindustryId || nullId, documentTypeID: 'FA5F4141-F67D-4465-9214-8EFAC56D9111' }))
    }
  }, [user?.userCompanyId, industryId])
  
  useEffect(() => {
    if(user?.userCompanyId){
    dispatch(getUploadedFinancialDocs({ userCompanyID: user?.userCompanyId }))
    }
  }, [user?.userCompanyId])

  return (
    <Box className='step-main-content'>
      <SectionTitle title='Financial Documents' text='Please Upload the Financial Documents' />
      <ManageDocuments
        referentDocuments={KYCdocuments}
        uploadedReferentDocuments={uploadedFinancialDocuments}
        kycDocLoading={kycDocLoading}
        uploadAction={uploadFinancialDocs}
        getUploadedAction={getUploadedFinancialDocs}
        documentType={'FA5F4141-F67D-4465-9214-8EFAC56D9111'}
      />
    </Box>
  )
}

export default FinancialDocuments