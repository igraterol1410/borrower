import React, { useEffect } from 'react'
import { Box, Button, Center, Flex, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import WarningIcon from '@/assets/icons/warning.svg'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCurrentCompanyPaymentFrequency, deleteCurrentCompanyProduct, deleteCurrentCompanySecurity } from '@/store/slices/companyProducts/companyProductsSilices'
import { getCurrentUserCompanyInfo, setUserCompanyInfo } from '@/store/slices/user/userSlices'
import { BiErrorCircle } from "react-icons/bi";

const DeleteItem = ({ show, setShow, action, item, security, loanTypeID, switchAction, setSecurity,setLoading }) => {
  const dispatch = useDispatch()
  const { user, userCompanyInfo } = useSelector( state => state?.user )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { companyProductsLoading } = useSelector( state => state?.companyProducts )
  const toast = useToast()

  useEffect(() => {
    if (show) {
      onOpen()
    }
  }, [show])

  const deteleItemAction = () => {
    dispatch(deleteCurrentCompanyProduct(item?.userCompanyProductID)).then((res) => {
      if(res.payload?.error){
        toast({
          title: res.payload?.message,
          status: 'error',
          duration: 3000,
          position: 'top'
        })
      }else{
        if(loanTypeID===2){
          dispatch(deleteCurrentCompanyPaymentFrequency({
            loansubtypeid:item?.loanSubMenuId, 
            userCompanyId:user.userCompanyId
          })).then(() => {
            const newPaymentTypes = userCompanyInfo.companyPaymentType.filter((eachItem) => (eachItem.loanSubTypeID !== item?.loanSubMenuId))
            dispatch(setUserCompanyInfo({
              ...userCompanyInfo, 
              companyPaymentType:newPaymentTypes
            }))
          })
        }
        action(item)
      }
    })
  }
  
  const confirmSave = () => {
    setLoading(true)
    if(item?.userCompanyProductID && !security && !switchAction){
      deteleItemAction()
      cancel()
    } else if(item?.userCompanyProductID && security && !switchAction){
      deteleItemAction()
      dispatch(deleteCurrentCompanySecurity({
        loanTypeId:loanTypeID, 
        userCompanyId:user.userCompanyId
      })).then(() => {
        dispatch(getCurrentUserCompanyInfo({
        userCompanyId:user.userCompanyId,
        userId:user.userId, 
        companyId:user.companyId
      }))
      })
      setLoading(false)
      cancel()
    } else if(switchAction){
      dispatch(deleteCurrentCompanySecurity({
        loanTypeId:loanTypeID, 
        userCompanyId:user.userCompanyId
      })).then(() => {
        dispatch(getCurrentUserCompanyInfo({
          userCompanyId:user.userCompanyId,
          userId:user.userId, 
          companyId:user.companyId
        }))
      })
      setLoading(false)
      setSecurity(false)
      cancel()
    } else {
      action(item)
      cancel()
    }
  }

  const cancel = () => {
    setShow()
    onClose()
  }

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={cancel} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={12}>
        <ModalHeader bg='tomato' borderRadius='12px 12px 0 0'>
          <ModalCloseButton onClick={cancel} border='none' color='white' />
          <Center data-aos='fade-right' fontSize='7xl' color='white'>
            <BiErrorCircle />
          </Center>
        </ModalHeader>
        <ModalBody w='100%'>
          <Box>
            <Center w='full' mb={4}>
              {
                !security && !switchAction &&
                <Heading as='h3' fontSize='xl' textAlign='center' fontWeight='normal'>Are you sure to delete {item?.text}?</Heading>
              }
              {
                security && !switchAction &&
                <Heading as='h3' fontSize='xl' textAlign='center' fontWeight='normal'>Are you sure to delete {item?.text}?   Your saved security data will be deleted if you disable the security</Heading>
              }
              {
                switchAction &&
                <Heading as='h3' fontSize='xl' textAlign='center' fontWeight='normal'>Your saved security data will be deleted if you disable the security</Heading>
              }
            </Center>
          </Box>
          <Flex
            mt={4}
            gap={4}
          >
            <Button
              variant='outline'
              borderRadius={8}
              py={5}              
              w='100%'
              onClick={cancel}
              mb={2}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              borderRadius={8}
              py={5}
              isLoading={companyProductsLoading}
              w='100%'
              colorScheme='blue'
              border='none' 
              _hover={{
                background:'#000072'
              }}
              onClick={confirmSave}
            >
              Confirm
            </Button>
          </Flex>
        </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteItem
