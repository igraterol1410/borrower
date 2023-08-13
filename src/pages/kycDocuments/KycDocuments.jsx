import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ManageDocuments from '@/components/uploadDocs/ManageDocuments'
import { getCurrentKYCDocs, getCurrentPromotorKYCDocs, getUploadedKYCDocs, getUploadedPromotorDocs, uploadKYCDocs, uploadPromotorKYCDocs } from '@/store/slices/kycDocs/kycDocumetsSlices'
import { Box } from '@chakra-ui/react'
import SectionTitle from '@/components/dashboard/SectionTitle'

const KycDocuments = () => {
  const dispatch = useDispatch()
  const { user, userCompanyInfo } = useSelector( state => state.user )
  const nullId = import.meta.env.VITE_NULL_ID
  const { KYCdocuments, promotorKYCdocuments, kycDocLoading, promotorDocLoading, uploadedDocuments, uploadedPromotorDocuments }  = useSelector( state => state.kycDocuments )
  const industryId = userCompanyInfo?.user?.industryID !== nullId ? userCompanyInfo?.user?.industryID : nullId
  const subindustryId = userCompanyInfo?.user?.subIndutryID || nullId

  useEffect(()=>{
    if(industryId && user?.userCompanyId){
      dispatch(getCurrentKYCDocs({industryId:industryId, subindustryId:subindustryId || nullId, documentTypeID:'C959AC5D-96A5-4777-984A-724ADE0A8F8A'}))

      dispatch(getCurrentPromotorKYCDocs({industryId:industryId, subindustryId:subindustryId || nullId}))
        
      dispatch(getUploadedKYCDocs({userCompanyID:user?.userCompanyId}))
      dispatch(getUploadedPromotorDocs({userCompanyID:user?.userCompanyId}))
    }
  },[user?.userCompanyId, userCompanyInfo])

  return (
    <>
      <Box className='step-main-content'>
        <SectionTitle title='Company KYC Docs' text='Please upload KYC docs' />
        <ManageDocuments 
          referentDocuments={KYCdocuments} 
          uploadedReferentDocuments={uploadedDocuments} 
          kycDocLoading={kycDocLoading} 
          uploadAction={uploadKYCDocs}
          getUploadedAction={getUploadedKYCDocs}
          documentType={'C959AC5D-96A5-4777-984A-724ADE0A8F8A'}
        />

        <Box mt={6}></Box>
        <SectionTitle title='Promotor KYC Docs' text='Please select the documents here and continue the process' />
        <ManageDocuments 
          referentDocuments={promotorKYCdocuments} 
          uploadedReferentDocuments={uploadedPromotorDocuments} 
          kycDocLoading={promotorDocLoading} 
          uploadAction={uploadPromotorKYCDocs}
          getUploadedAction={getUploadedPromotorDocs}
          documentType={'A9C0EDD7-AEFB-40E3-8DB8-342E83CCA72E'}
        />
      </Box>
    </>
  )
}

export default KycDocuments