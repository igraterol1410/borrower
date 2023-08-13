import { Box, Flex, GridItem, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const TeasorMainTable = ({financialData}) => {
    const { cimLoading } = useSelector(state => state?.cim)
    const [financialDataInfo, setFinancialDataInfo] = useState(null)
    const [years, setYears] = useState(null)
    const [rowData, setRowData] = useState(null)
    const [rowDataAverage, setRowDataAverage] = useState(null)
    let FY = [] 
    let rowValue = []

    const getTitle = (rowTitle) => {
        switch (rowTitle) {
            case 'netsales': return 'Net Sales'                
                break;
            case 'ebidta': return 'EBIDTA'                
                break;
            case 'ebidtapercent': return 'EBIDTA (%)'                
                break;
            case 'interest': return 'Interest'                
                break;
            case 'depreciation': return 'Depreciation'                
                break;
            case 'oprprofitafterintanddep': return 'Opr Profit after int and dep'                
                break;
            case 'nonoperatingincome': return 'Non-operating income'                
                break;
            case 'pbt': return 'PBT'                
                break;
            case 'pat': return 'PAT'                
                break;
            case 'patpercent': return 'PAT(%)'                
                break;
            case 'cashprofitspredividend': return 'Cash Profits Pre dividend'                
                break;
            case 'grossfixedassets': return 'Gross Fixed Assets'                
                break;
            case 'netfixedassets': return 'Net fixed assets'                
                break;
            case 'networth': return 'Net Worth(incld Sub loan)'                
                break;
            case 'tangiblenetworthtnw': return 'Tangible Networth (TNW)'                
                break;
            case 'adjustedtnwatnw': return 'Adjusted TNW (ATNW)'                
                break;
            case 'longtermdebta': return 'Long term debt (A)'                
                break;
            case 'stdotherthanregularwc': return 'STD(other than regular WC)'                
                break;
            case 'workingcapitalbankfinance': return 'Working Capital Bank Finance'                
                break;
            case 'totaldebt': return 'Total Debt'                
                break;
            case 'currentportionofltd': return 'Current portion of LTD'                
                break;
            case 'totaloutsideliabilitiestol': return 'Total Outside Liabilities (TOL)'                
                break;
            case 'toltnw': return 'TOL/TNW'                
                break;
            case 'totaldebttnw': return 'Total Debt/TNW'                
                break;
            case 'totaldebtatnw': return 'Total Debt /ATNW'                
                break;
            case 'tolinclcontingatnw': return 'TOL (incl. conting)/ ATNW'                
                break;
            case 'currentassets': return 'Current Assets'                
                break;
            case 'currentliabilities': return 'Current Liabilities'                
                break;
            case 'currentratio': return 'Current ratio'                
                break;
            case 'dscr': return 'DSCR'                
                break;
            case 'interestcover': return 'Interest cover'                
                break;
            case 'totaldebtebidta': return 'Total Debt /EBIDTA'                
                break;
            case 'totaldebtcashprofit': return 'Total Debt/ Cash Profit'                
                break;
            case 'averagepaymentperiod': return 'Average Payment Period'                
                break;
            case 'averagecollectionperiod': return 'Average Collection Period'                
                break;
            case 'averageholdingperiod': return 'Average Holding Period'                
                break;
            case 'cashfromoperactivityasonstmar': return 'Cash from Oper Activity as on 31st Mar'                
                break;
        
            default: return rowTitle
                break;
        }
    }

    useEffect(() => {
        if(financialData && financialData[0].itemData){
            const cloneTable = financialData[0].itemData
            financialData[0].itemData.forEach(element => {
            const newYear = FY.filter((year) => year === element.financialyear)
            if(newYear.length === 0){
                FY.push(element.financialyear)
            }
            setYears(FY)

            let fn = Object.keys(financialData[0].itemData[0]);
            let rowsName = fn.filter((names) => names !== 'financialyear' && names !=='averagepaymentperiod' && names !=='averagecollectionperiod'&& names !=='averageholdingperiod')
            let averageRows = fn.filter((names) => names ==='averagepaymentperiod' || names ==='averagecollectionperiod' || names ==='averageholdingperiod')
            let averageTableRow = averageRows.map((eachName)=>({
                name:eachName,
                years: getDataYear(eachName, cloneTable)
            }))
            // let yearsData = cloneTable.forEach((year) =>{console.log()})
            let tableRow = rowsName.map((eachName)=>({
                name:eachName,
                years: getDataYear(eachName, cloneTable)
            }))
            setRowDataAverage(averageTableRow)
            setRowData(tableRow)
        })}else{
            setRowDataAverage(null)
            setRowData(null)
            setYears(null)
        }
    },[financialData])

    const getDataYear= (eachName, cloneTable) => {
        rowValue = []
        const keyName = Object.keys(cloneTable[0])
        const indexOfKeyName = keyName.indexOf(eachName)
        cloneTable.forEach(item => {
            const dataValues = Object.values(item)
            rowValue.push(dataValues[indexOfKeyName])
        });
        return rowValue
    }

    const getSymbol = (title) => {
        switch (title) {
            case 'ebidtapercent': return '%'                
                break;
            case 'patpercent': return '%'                
                break;
            case 'toltnw': return 'x'                
                break;
            case 'totaldebttnw': return 'x'                
                break;
            case 'totaldebtatnw': return 'x'                
                break;
            case 'tolinclcontingatnw': return 'x'                
                break;
            case 'currentratio': return 'x'                
                break;
            case 'dscr': return 'x'                
                break;
            case 'interestcover': return 'x'                
                break;
            case 'totaldebtebidta': return 'x'                
                break;
            case 'totaldebtcashprofit': return 'x'                
                break;
        
            default: return ''
                break;
        }
    }

  return (
    <Box w={['100%','60%']}>
        <Flex 
        color='#4C5EFE' 
        fontSize={14} 
        fontWeight='bold' 
        justifyContent='space-between' 
        px={4}>
            <Box>Financials (in Cr)</Box>
        </Flex>
        <Skeleton isLoaded={!cimLoading}>
            <TableContainer h='98%' border='1px solid #D9D9D9' borderRadius={20}>
                <Table size='sm'>
                    <Thead bg='#F1F3FE'>
                    <Tr>
                        <Th py={4} colSpan={!rowData ? '6' : ''}>Financial Name</Th>
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
                        rowData
                        ?
                        rowData.map((row, index) => (
                        <Tr key={index}>
                            <Td>{getTitle(row.name)}</Td>
                            {
                                row.years && row.years.map((year, index) => (
                                    <Td 
                                    key={index} 
                                    isNumeric
                                    p={3}>
                                        <Text mb={0} display='inline-block'>{year}</Text>                                        
                                        <Text mb={0} display='inline-block' fontSize={getSymbol(row.name) === 'x' ? '11px' : ''}>
                                            {getSymbol(row.name)}
                                        </Text>
                                    </Td>
                                ))
                            }
                        </Tr>
                        ))
                        :
                        <Tr>
                            <Td p={8}  h='100%' colSpan={4} textAlign='center'>No data available</Td>
                        </Tr>
                    }
                    <Tr bg='#F1F3FE'>
                        <Th py={4} colSpan={6}>AVERAGE PERIOD (IN DAYS)</Th>
                    </Tr>
                    {
                        rowDataAverage && rowDataAverage.map((row, index) => (
                            <Tr key={index}>
                                <Td>{getTitle(row.name)}</Td>
                                {
                                    row.years && row.years.map((year, index) => (
                                        <Td 
                                        key={index} 
                                        isNumeric 
                                        p={3}>
                                            <Text>{year}</Text>                                        
                                            <Text mb={0} fontSize={getSymbol(row.name) === 'x' ? '8px' : '1rem'}>
                                                {getSymbol(row.name)}
                                            </Text>
                                        </Td>
                                    ))
                                }
                            </Tr>
                        ))
                    }
                    </Tbody>
                </Table>
            </TableContainer>
        </Skeleton>
    </Box>
  )
}

export default TeasorMainTable
