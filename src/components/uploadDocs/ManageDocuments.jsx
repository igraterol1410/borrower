import CheckDocs from '@/components/uploadDocs/CheckDocs'
import UploadDocs from '@/components/uploadDocs/UploadDocs'
import { setUserCompanyInfo } from '@/store/slices/user/userSlices'
import { Box, Button, Divider, Flex, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import ButtonsBox from '../dashboard/ButtonsBox'
import WarningModal from '../modals/WarningModal'

const ManageDocuments = ({ referentDocuments, uploadedReferentDocuments, kycDocLoading, uploadAction, getUploadedAction, documentType }) => {
  const dispatch = useDispatch() 
  const navigate = useNavigate()
  const toast = useToast()
  const [data, setData] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [disabledButton, setDisabledButton] = useState(true)
  const [showWarning, setShowWarning] = useState(false)
  const { user, userCompanyInfo } = useSelector( state => state.user )

  const checkRequiredDocuments = (b) => {
    let missingDocs = []
    const docReq = referentDocuments?.filter((doc)=>doc.isRequired)
    docReq?.forEach(doc => {
      const documentSelected = data?.filter((eachData)=>(eachData.fileID === doc.documentMappinID))
      if(documentSelected.length === 0){
        missingDocs = [ ...missingDocs, `${doc.documentName}` ]
      }
    });
    if(missingDocs.length > 0){
      if(!b){
        toast({
          title: `Select a ${missingDocs[0]}`,
          status: 'error',
          duration: 3000,
          position: 'top'
        })
      }
    }
    else{
      return true
    }
  }

  const saveDocs = () => {
    setDisabledButton(true)
    if(checkRequiredDocuments()){
      data.forEach(document => {
        const formData = new FormData();
        const newDocument = new File(
          [document.file],
          `${document.fileName}`
        )
        formData.append( 'files', newDocument)
        formData.append( 'userCompanyMapID',user?.userCompanyId)
        formData.append( 'documentMappingID',document.fileID)
        formData.append( 'documentTypeID', documentType)
        dispatch(uploadAction(formData)).then(()=>{
          toast({
            title: `${document.fileName} uploaded successfully`,
            status: 'success',
            duration: 3000,
            position: 'top'
          })
          dispatch(getUploadedAction({userCompanyID:user?.userCompanyId}))
          // console.log(documentType)
          if(documentType === 'FA5F4141-F67D-4465-9214-8EFAC56D9111'){
            dispatch(setUserCompanyInfo({...userCompanyInfo,userAttachments:[{...userCompanyInfo.userAttachments[0], companyDocument:true}]}))
          }else{
            dispatch(setUserCompanyInfo({...userCompanyInfo,userAttachments:[{...userCompanyInfo.userAttachments[0], kycDocument:true}]}))
          }
          setData([])
          setDisabledButton(true)
        })
        });
    }else{
      setDisabledButton(false)
    }
    setDisabledButton(false)
  }

  const handleCancel = (link) => {
    if(!disabledButton){
      setShowWarning(true)
    }else{
      navigate(link)
    }
  }

  return (
    <>
      <WarningModal
      show={showWarning}
      setShow={setShowWarning} 
      action={() => {documentType === 'FA5F4141-F67D-4465-9214-8EFAC56D9111' ? navigate('/dashboard/terms-sheet') : navigate('/dashboard/financial-documents')}}
      label='You have unsaved changes. You can leave to discard your changes, or cancel to continue editing.'
      />
        <UploadDocs 
        KycDocuments={referentDocuments} 
        kycDocLoading={kycDocLoading} 
        uploadedDocuments={uploadedReferentDocuments}
        data={data}
        setData={setData}
        setDisabled={setDisabled}
        setDisabledButton={setDisabledButton}
        />
        <Box mt={4}>
        <h2 className='step-main-title'>Documents</h2>
        </Box>
        <Divider />
        <CheckDocs
        KycDocuments={referentDocuments} 
        kycDocLoading={kycDocLoading} 
        uploadedDocuments={uploadedReferentDocuments}
        getUploadedAction={getUploadedAction}
        data={data}
        />

      <ButtonsBox 
      position='rigth'
      primaryLabel='Save Documents'
      secundaryLabel='Next Step'
      confirmAction={saveDocs}
      disabledConditions={!checkRequiredDocuments(true) || disabledButton}
      isLoading={kycDocLoading}
      cancelAction={() => {
        documentType === 'FA5F4141-F67D-4465-9214-8EFAC56D9111' ? handleCancel('/dashboard/terms-sheet') : handleCancel('/dashboard/financial-documents')}}
      />
    </>
  )
}

export default ManageDocuments