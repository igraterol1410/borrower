import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Grid, Heading, Image, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Text, useDisclosure } from '@chakra-ui/react'
import WarningIcon from '@/assets/icons/warning.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setCompanyId, updateUser } from '@/store/slices/user/userSlices'
import { useNavigate } from 'react-router-dom'

const SelectCompanyModal = ({ show, setShow }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, companies, userId } = useSelector(state => state?.user)
  const savedUser = JSON.parse(localStorage.getItem('user'))

  const [value, setValue] = useState(1)
  const [company, setCompany] = useState(1)
  const [newCompanies, setNewCompanies] = useState(null)
  var companiesToShow = []

  useEffect(() => {
    if (show) {
      onOpen()
    }
  }, [show])

  const confirmSave = () => {
    const dataToSave = { ...savedUser, userId: userId, companyId: company, userCompanyId: value }
    localStorage.setItem("user", JSON.stringify(dataToSave));
    dispatch(updateUser(dataToSave))
    localStorage.removeItem('userId')
    dispatch(setCompanyId(value))
    navigate('/dashboard/industry')
  }

  const cancel = () => {
    setShow(false)
    onClose()
  }

  const getAllCompaniesWithSameName = (company) => {
    const repeatedCompany = companies.filter((eachRepeated) => eachRepeated.companyID === company.companyID)
    let joinRepeatedCompanies = []
    repeatedCompany.forEach((repeated) => {
      joinRepeatedCompanies.push({ userCompanyId: repeated.userCompanyID, industryName: repeated.industryName, subindustryName: repeated.subindustryName })
    })
    const indexOfrepeatedCompany = companiesToShow.indexOf(company)
    companiesToShow[indexOfrepeatedCompany].companies = joinRepeatedCompanies
  }

  useEffect(() => {
    if (companies) {
      companies.forEach(company => {
        let repeatValue = companiesToShow.filter((eachCompany) => eachCompany.companyID === company.companyID)
        if (repeatValue.length === 0) {
          const setCompany = {
            companyID: company.companyID,
            companyName: company.companyName,
            industryID: company.industryID,
            industryName: company.industryName,
            subIndustryID: company.subIndustryID,
            subindustryName: company.subindustryName,
            userCompanyID: company.userCompanyID,
            userID: company.userID,
            userName: company.userName
          }
          companiesToShow.push(setCompany)
          getAllCompaniesWithSameName(setCompany)
        }
      });
      setNewCompanies(companiesToShow)
    }
  }, [companies])

  const setData = (company, id) => {
    setValue(id)
    setCompany(company.companyID)
  }

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={cancel} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={12}>
          <ModalHeader bg='blue.600' color='white'>
            <Box >
              {/* <Center data-aos='fade-right'> */}

              <Center w='full' mb={4}>
                {/* <Image src={WarningIcon} alt='Alert' mr={4} /> */}
                <Heading as='h4' fontSize='xl' textAlign='center'>Select company</Heading>
              </Center>
            </Box>
            {/* </Center> */}
          </ModalHeader>
          <ModalBody w='100%' bg='blue.800' color='white'>

            <Box>
              <Grid templateColumns='1fr'>
                {
                  newCompanies && newCompanies.map((company, index) => (
                    <Box key={index}>
                      {/* <Box>{company.companyName}</Box> */}
                      <Heading as='h3' fontSize='xl' textAlign='left'>{company.companyName}</Heading>
                      {
                        company.companies && company.companies.map((eachId, index) => (
                          <RadioGroup key={index} onChange={(e) => { setData(company, eachId.userCompanyId) }} value={value}>
                            <Radio mt={4} value={eachId.userCompanyId}><Text fontSize={12}>({eachId.industryName || 'New Entry'}  {eachId.subindustryName ? `- ${eachId.subindustryName}` : ''})</Text></Radio>
                          </RadioGroup>
                        ))
                      }
                    </Box>
                  ))
                }
              </Grid>
            </Box>
            <Flex
              mt={4}
              gap={4}
            >
              {/* <Button
                variant='outline'
                borderRadius={8}
                py={5}
                w='100%'
                onClick={cancel}
                mb={2}
              >
                Cancel
              </Button> */}
              <Button
                type='submit'
                //   isLoading={kycDocLoading}
                //   border='1px solid #1C397E'
                borderRadius={8}
                py={5}
                w='100%'
                //   bg='primary'
                colorScheme='blue'
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

export default SelectCompanyModal
