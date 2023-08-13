import { Box, Divider, Flex, Grid, GridItem, Skeleton, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const CimAside = ({segmentBreakup, customerSupplier, promotorShareholder}) => {
    const { cim, cimLoading } = useSelector(state => state?.cim)
    const [cimInfo, setCimInfo] = useState(null)
    const [years, setYears] = useState(null)
    const [yearscs, setYearscs] = useState(null)
    const [companiescs, setCompaniescs] = useState(null)
    const [segmentBreakupInfo, setSegmentBreakup] = useState(null)
    const [tableRow, setTableRow] = useState(null)
    const [tableRowCus, setTableRowCus] = useState(null)
    const [tableRowSupp, setTableRowSupp] = useState(null)
    let FY = [] 
    let FYcs = [] 
    let rowItem = []
    let rowItemCus = []
    let rowItemSupp = []
    let diferentCompanies = []
    useEffect(() => {
        if(cim){
            setCimInfo(cim[0])
        }else{
            setCimInfo(null)
        }
    },[cim])
   
    useEffect(() => {
        if(segmentBreakup && segmentBreakup[0] && segmentBreakup[0].itemData){
            setSegmentBreakup(segmentBreakup[0])
            const cloneTable = segmentBreakup[0].itemData
            segmentBreakup[0].itemData.forEach(element => {
            const newYear = FY.filter((year) => year === element.financialyear)
            if(newYear.length === 0){
                FY.push(element.financialyear)
            }
            setYears(FY)
            
            const newRow = rowItem.filter((rowName) =>rowName.companyproductsegmentname === element.companyproductsegmentname)
            if(newRow.length === 0){
                const repeatedNames = cloneTable.filter((name) => (name.companyproductsegmentname === element.companyproductsegmentname))
                rowItem.push({
                    companyproductsegmentname:element.companyproductsegmentname,
                    years:repeatedNames
                })
            }
            setTableRow(rowItem)
        });
        }else{
            setSegmentBreakup(null)
            setYears(null)
            setTableRow(null)
        }
    },[segmentBreakup])
    useEffect(() => {
        if(customerSupplier && customerSupplier[0].itemData){
            const cloneTable = customerSupplier[0].itemData
            customerSupplier[0].itemData.forEach(element => {
            const newYear = FYcs.filter((year) => year === element.financialyear)
            if(newYear.length === 0){
                FYcs.push(element.financialyear)
            }
            FYcs.sort(function(a, b) {
                return a - b;
              });
            setYearscs(FYcs.reverse())
            const newCusRow = rowItemCus.filter((rowName) =>rowName.companycustomersuppliername === element.companycustomersuppliername)
            const newSupRow = rowItemSupp.filter((rowName) =>rowName.companycustomersuppliername === element.companycustomersuppliername)
            if(newCusRow.length === 0){
                const repeatedCusNames = cloneTable.filter((name) => (name.companycustomersuppliername === element.companycustomersuppliername && name.iscustomer))
                if(repeatedCusNames.length > 0){
                    rowItemCus.push({
                        companycustomersuppliername:element.companycustomersuppliername,
                        years:repeatedCusNames
                    })
                }
            }
            if(newSupRow.length === 0){
                const repeatedSuppNames = cloneTable.filter((name) => (name.companycustomersuppliername === element.companycustomersuppliername && !name.iscustomer))
                if(repeatedSuppNames.length > 0){
                    rowItemSupp.push({
                        companycustomersuppliername:element.companycustomersuppliername,
                        years:repeatedSuppNames
                    })
                }
            }
            setTableRowCus(rowItemCus)
            setTableRowSupp(rowItemSupp)
        });        
        }else{
            setYearscs(null)
            setTableRowCus(null)
            setTableRowSupp(null)
        }
    },[customerSupplier])

    const getCustomer = (row) => {
        const customer = row.years.filter((eachCustomer) => (eachCustomer.iscustomer === true))
        return customer.length > 0
    }

    const getPercentageAmount = (year,row) => {
        const filterRow = row.years.filter((eachYear) => (eachYear.financialyear === year))
        return filterRow.length > 0 ? filterRow[0].percentageofamount : ''
    }

  return (
    <Grid w='40%' maxW='40vw'>
        <GridItem 
        borderRadius={15} 
        p={4} 
        bg='#F8FAFB;'
        maxW='100%'>
            <Box 
            color='#4C5EFE' 
            fontSize={14} 
            fontWeight='bold'>
                Brief About Company
            </Box>
            <Divider />
            <Box 
            fontSize={12}>{cimInfo?.companyBriefInfo || 'Empty state'}</Box>
        </GridItem>
        <GridItem mt={4}>
            <Flex 
            color='#4C5EFE' 
            fontSize={14} 
            fontWeight='bold' 
            justifyContent='space-between' 
            px={4}>
                <Box>
                    Segmnent wise Break up (In Cr)
                </Box>
                <Box 
                fontSize={12} cursor='pointer'>
                    Graph view
                </Box>
            </Flex>
            <Skeleton isLoaded={!cimLoading}>
                <TableContainer border='1px solid #D9D9D9' borderRadius={20}>
                    <Table size='sm'>
                        <Thead bg='#F1F3FE'>
                        <Tr>
                            <Th py={4}>Segments Name</Th>
                            {
                                years && years.length > 0 &&
                                years.map((year, index) => (
                                    <Th key={index} py={4} isNumeric>{year}</Th>
                                ))
                            }
                        </Tr>
                        </Thead>
                            <Tbody>
                                {
                                    tableRow
                                    ?
                                    tableRow.map((row, index) => (
                                    <Tr key={index}>
                                        <Td py={4}>{row.companyproductsegmentname}</Td>
                                        {
                                            row.years && row.years.map((year, index) => (
                                                <Td py={4} key={index} isNumeric>{year.percentageofamount}</Td>
                                            ))
                                        }
                                    </Tr>
                                    ))
                                    :
                                    <Tr>
                                        <Td p={8} colSpan={4} rowSpan={4} textAlign='center'>No data available</Td>
                                    </Tr>
                                }
                            </Tbody>
                    </Table>
                </TableContainer>
            </Skeleton>
        </GridItem>
        <GridItem overflowX='scroll'>
            <Flex color='#4C5EFE' fontSize={14} fontWeight='bold' justifyContent='space-between' px={4}>
                <Box>Customer & Suppliers (IN %)</Box>
                <Box fontSize={12} cursor='pointer'>Graph view</Box>
            </Flex>
            <Skeleton isLoaded={!cimLoading}>
            <TableContainer border='1px solid #D9D9D9' borderRadius={20}>
                <Table size='sm'>
                    <Thead bg='#F1F3FE'>
                    <Tr>
                        <Th py={4}>Customer Name</Th>
                        {
                            yearscs && yearscs.map((year,index) => (
                                <Th py={4} key={index} isNumeric>{year}</Th>
                            ))
                        }
                    </Tr>
                    </Thead>
                        <Tbody>
                            {
                                tableRowCus
                                ?
                                tableRowCus.map((row, index) => (
                                <Tr key={index}>
                                    <Td>{row.companycustomersuppliername}</Td>
                                    {
                                        yearscs && yearscs.map((year,index) => (
                                            <Td py={4} key={index} isNumeric>{getPercentageAmount(year,row)}</Td>
                                        ))
                                    }
                                </Tr>
                                ))
                                :
                                <Tr>
                                    <Td  p={8} colSpan={4} rowSpan={4} textAlign='center'>No data available</Td>
                                </Tr>
                            }
                        </Tbody>
                    <Thead bg='#F1F3FE'>
                    <Tr>
                        <Th py={4}>Suppliers Name</Th>
                        {
                            yearscs && yearscs.map((year,index) => (
                                <Td py={4} key={index} isNumeric>{year}</Td>
                                ))
                            }
                    </Tr>
                    </Thead>
                        <Tbody>
                            {
                                tableRowSupp
                                ?
                                tableRowSupp.map((row, index) => (
                                <Tr key={index} display={getCustomer(row) && 'none'}>
                                    <Td>{row.companycustomersuppliername}</Td>
                                    {
                                        yearscs && yearscs.map((year,index) => (
                                            <Td py={4} key={index} isNumeric>{getPercentageAmount(year,row)}</Td>
                                        ))
                                    }
                                </Tr>
                                ))
                                :
                                <Tr>
                                    <Td  p={8} colSpan={4} rowSpan={4} textAlign='center'>No data available</Td>
                                </Tr>
                            }
                        </Tbody>
                </Table>
            </TableContainer>
            </Skeleton>
        </GridItem>
        <GridItem>
            <Flex color='#4C5EFE' fontSize={14} fontWeight='bold' justifyContent='space-between' px={4}>
                <Box>Promoter & Shareholding</Box>
            </Flex>
            <Skeleton isLoaded={!cimLoading}>
            <TableContainer border='1px solid #D9D9D9' borderRadius={20}>
                <Table size='sm'>
                    <Thead bg='#F1F3FE'>
                    <Tr>
                        <Th py={4}>Name</Th>
                        <Th py={4}>POSITION</Th>
                        <Th py={4}>%</Th>
                        {/* <Th py={4}>CIBIL</Th> */}
                    </Tr>
                    </Thead>
                        <Tbody>
                            {
                                promotorShareholder && promotorShareholder.length > 0
                                ?
                                promotorShareholder.map((item, index) => (
                                <Tr key={index}>
                                    <Td py={4}>{item.directorName}</Td>
                                    <Td py={4}>{item.designation}</Td>
                                    <Td py={4}>{item.percentageShare}</Td>
                                    {/* <Td >{item.cibil}</Td> */}
                                </Tr>
                                ))
                                :
                                <Tr>
                                    <Td p={8} colSpan={4} rowSpan={3} textAlign='center'>No data available</Td>
                                </Tr>
                            }
                        </Tbody>
                </Table>
            </TableContainer>
            </Skeleton>
        </GridItem>
    </Grid>
  )
}

export default CimAside
