import { Box, Flex, FormControl, FormLabel, Grid, GridItem, Image, Img, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import MainImg from '@/assets/teasor/mainImage.svg'
import { PhoneIcon } from '@chakra-ui/icons'
import SecuredIcon from '@/assets/teasor/secured.svg'
import UnsecuredIcon from '@/assets/teasor/usecured.svg'

import LocationIcon from '@/assets/teasor/ubicationIcon.svg'
import BuildingIcon from '@/assets/teasor/buildingIcon.svg'
import IndustryIcon from '@/assets/teasor/industryIcon.svg'
import PaperIcon from '@/assets/teasor/paperIcon.svg'
import PaperCheckIcon from '@/assets/teasor/paperCheckIcon.svg'
import BankingIcon from '@/assets/teasor/bankingIcon.svg'
import { useSelector } from 'react-redux'

const CimInfo = ({rating, healthCheckData}) => {
    const { cim } = useSelector(state => state?.cim)
    const [cimInfo, setCimInfo] = useState(null)
    useEffect(() => {        
        if(cim){
            setCimInfo(cim[0])
        }
    },[cim])

    const getFy = (fy) => {
        return fy.toString().split('20')[1]
    }

    const healthCheckTypes = {
        CaseAgainst_Borrower:'Case Against Borrower',
        GSTCompliance: 'GST Compliance'
    }

  return (
    <Box
    borderRadius={50}
    mb={6}
    >
        <Box
        borderRadius={20}
        bg='#F1F3FE'
        p={4}
        w='100%'
        h='100%'
        >
            <Flex
            gap={4}
            direction={['column', 'row']}
            >
                <Flex
                bg='white'
                p={2}
                borderRadius={10}
                boxShadow='0px 0px 40px rgba(0, 0, 0, 0.2)'
                alignItems='center'
                justifyContent='center'
                minW={['50%','15%']}
                >
                    {/* <Image src={MainImg} alt='main logo' maxW='100%' /> */}
                    <Text py={0} fontSize={36} fontWeight='extrabold' borderBottom='10px solid #DCA726'>{cimInfo?.companyName?.split(' ')[0]}</Text>
                </Flex>
                <Grid 
                w='100%'
                templateRows={['1fr','1fr 1fr']}
                gap={4}
                >
                    <Grid 
                    templateColumns={['1fr 1fr','2fr 3fr 4fr']}
                    gap={4}
                    >
                        <GridItem
                        display='flex'
                        gap={2}
                        alignContent='center'
                        alignItems='center'
                        bg='white'
                        borderRadius={10}
                        px={4}
                        py={0}
                        >
                            <Image h='20px' src={BuildingIcon} />
                            <Box w='90%'>
                                <FormControl>
                                <FormLabel fontSize='10px' mb={0}>Company name</FormLabel>
                                    <Input
                                    size='xs'
                                    p={0}
                                    fontSize='10px'
                                    border='none' 
                                    defaultValue={cimInfo?.companyName}
                                    type='text' 
                                    placeholder='Case Construction'
                                    />
                            </FormControl>
                            </Box>
                        </GridItem>
                        <GridItem
                        display='flex'
                        gap={2}
                        alignContent='center'
                        alignItems='center'
                        bg='white'
                        borderRadius={10}
                        px={4}
                        py={0}
                        >
                            <Image h='20px' src={LocationIcon} />
                            <Box w='90%'>
                                <FormControl>
                                <FormLabel fontSize='10px' mb={0}>Company Location</FormLabel>
                                    <Input
                                    size='xs'
                                    p={0}
                                    border='none' 
                                    fontSize='10px'
                                    defaultValue={cimInfo?.companyLocation || 'N/A'}
                                    type='text' 
                                    placeholder='Eco Perk,Kondapur, Hyderabad'
                                    />
                            </FormControl>
                            </Box>
                        </GridItem>                        
                        <GridItem
                        display='flex'
                        gap={2}
                        alignContent='center'
                        alignItems='center'
                        bg='white'
                        borderRadius={10}
                        px={4}
                        py={0}
                        >
                            <Image h='20px' src={IndustryIcon} />
                            <Box w='90%'>
                                <FormControl>
                                <FormLabel fontSize='10px' mb={0}>Industry and Nature Activity</FormLabel>
                                    <Input
                                    size='xs'
                                    p={0}
                                    border='none' 
                                    defaultValue={cimInfo?.industryAndNatureOfActivity}
                                    type='text' 
                                    fontSize='10px'
                                    placeholder='Construction and Contracting > '
                                    />
                            </FormControl>
                            </Box>
                        </GridItem>
                    </Grid>
                    <Grid 
                    templateColumns={['1fr 1fr','1fr 1fr 2fr 1fr 1fr']}
                    gap={4}
                    >
                        <GridItem
                        display='flex'
                        gap={2}
                        alignContent='center'
                        alignItems='center'
                        bg='white'
                        borderRadius={10}
                        px={4}
                        py={0}
                        >
                            <Image h='20px' src={PaperIcon} />
                            <Box w='90%'>
                                <FormControl>
                                <FormLabel fontSize='10px' mb={0}>Constitution</FormLabel>
                                    <Input
                                    size='xs'
                                    p={0}
                                    border='none' 
                                    defaultValue={cimInfo?.constitution}
                                    type='text' 
                                    fontSize='10px'
                                    placeholder='Pvt Ltd'
                                    />
                            </FormControl>
                            </Box>
                        </GridItem>
                        <GridItem
                        display='flex'
                        gap={2}
                        alignContent='center'
                        alignItems='center'
                        bg='white'
                        borderRadius={10}
                        px={4}
                        py={0}
                        >
                            <Image h='20px' src={PaperIcon} />
                            <Box w='90%' fontSize='10px'>
                                <FormControl>
                                <FormLabel fontSize='10px' mb={0}>Auditor</FormLabel>
                                    <Input
                                    size='xs'
                                    p={0}
                                    border='none' 
                                    type='text' 
                                    placeholder='abc'
                                    fontSize='10px'
                                    defaultValue={cimInfo?.auditor}
                                    />
                            </FormControl>
                            </Box>
                        </GridItem>
                        <GridItem
                        display='flex'
                        gap={2}
                        alignContent='center'
                        alignItems='center'
                        bg='white'
                        borderRadius={10}
                        px={4}
                        py={0}
                        >
                            <Image h='20px' src={PaperIcon} />
                            <Box w='90%' fontSize='10px'>
                                <FormControl>
                                <FormLabel fontSize='10px' mb={0}>Proposal For</FormLabel>
                                    {/* <Input
                                    size='xs'
                                    p={0}
                                    border='none' 
                                    type='text' 
                                    placeholder='Working capital and Term loan'
                                    defaultValue={cimInfo?.proposalFor}
                                    /> */}
                                    {cimInfo?.proposalFor}
                            </FormControl>
                            </Box>
                        </GridItem>
                        <GridItem
                        display='flex'
                        gap={2}
                        alignContent='center'
                        alignItems='center'
                        bg='white'
                        borderRadius={10}
                        px={4}
                        py={0}
                        >
                            <Image h='20px' src={BankingIcon} />
                            <Box w='90%'>
                                <FormControl>
                                <FormLabel fontSize='10px' mb={0}>Banking arrangement</FormLabel>
                                    <Input
                                    size='xs'
                                    p={0}
                                    border='none' 
                                    type='text' 
                                    placeholder='Sole'
                                    fontSize='10px'
                                    defaultValue={cimInfo?.bankingArragnments}
                                    />
                            </FormControl>
                            </Box>
                        </GridItem>
                        <GridItem
                        display='flex'
                        gap={2}
                        alignContent='center'
                        alignItems='center'
                        bg='white'
                        borderRadius={10}
                        px={4}
                        py={0}
                        >
                            <Image h='20px' src={PaperCheckIcon} />
                            <Box w='90%'>
                                <FormControl>
                                <FormLabel fontSize='10px' mb={0}>Exposure Clarification</FormLabel>
                                    <Input
                                    size='xs'
                                    p={0}
                                    border='none' 
                                    type='text' 
                                    fontSize='10px'
                                    placeholder='PSL'
                                    defaultValue={cimInfo?.exposerClafication}
                                    />
                            </FormControl>
                            </Box>
                        </GridItem>
                    </Grid>
                </Grid>
            </Flex>
        </Box>
        {/* <Grid templateColumns='1fr 1fr 1fr'>
            <GridItem>1</GridItem>
            <GridItem>2</GridItem>
        </Grid> */}
        <Flex
        wrap='wrap'
        justifyContent='space-around'
        mt={4}
        alignItems='center'
        >
            <Flex 
            gap={4} 
            bg='#fafafa'
            p={4}
            borderRadius={20}
            >
                {
                    healthCheckData && healthCheckData.map((healthCheck) => (
                        <Flex
                        key={healthCheck.healthCheckType}
                        direction={'column'}
                        alignItems='center'
                        gap={2}
                        >
                            <Box>{healthCheckTypes[healthCheck.healthCheckType]}</Box>
                            <Box>
                                {
                                   healthCheck.healthCheckValue==='1'
                                   ?(
                                    <Image src={SecuredIcon} />
                                   )
                                   :(
                                    <Image src={UnsecuredIcon} />
                                   ) 
                                }
                            </Box>
                        </Flex>
                    ))
                }
            </Flex>
            <Flex
            wrap='wrap'
            gap={4}
            justifyContent='space-around'
            bg='#fafafa'
            p={4}
            borderRadius={20}
            >
                {
                    rating && rating.map((rate) => (
                        <Flex
                        key={rate.financialYear}
                        gap={4}
                        px={4}
                        py={2}
                        borderRadius={50}
                        shadow='lg'
                        bgGradient='linear(to-r, #4C5EFE 0%, #4C5EFE 40%, #fff 40%, #fff 100%)'
                        fontSize={'xs'}
                        >
                            <Box pr={2} color='white'>FY {getFy(rate.financialYear)}</Box>
                            <Box>{rate.rating}</Box>
                        </Flex>
                    ))
                }
            </Flex>
        </Flex>
    </Box>
  )
}

export default CimInfo
