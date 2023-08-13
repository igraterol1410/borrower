import React, { useEffect, useState } from 'react'
import { Box, Flex, Grid, GridItem, Table, TableContainer, Thead,Tr,Th,Tbody,Td, Image, Text } from '@chakra-ui/react'
import SecuredIcon from '@/assets/teasor/secured.svg'
import UnsecuredIcon from '@/assets/teasor/usecured.svg'
import TeasorCheck from './TeasorCheck'

const TeasorComparison = ({comparison, bankingArrangments}) => {
    const [diferentsCompanies, setDiferentsCompanies] = useState(null)
    const [years, setYears] = useState(null)
    const [rowData, setRowData] = useState(null)
    const companyN = []
    let FY = [] 
    let rowValue = []

useEffect(() => {
    if(comparison && comparison[0].itemData){
        const cloneTable = comparison[0].itemData
        comparison[0].itemData.forEach(element => {
        const newCompany = companyN.filter((company) => company === element.companyName)
        if(newCompany.length === 0){
            companyN.push(element.companyName)
        }
        const newYear = FY.filter((year) => year === element.financialYear)
        if(newYear.length === 0){
            FY.push(element.financialYear)
        }
        setDiferentsCompanies(companyN)
        setYears(FY)
        let fn = Object.keys(comparison[0].itemData[0]);
        let rowsName = fn.filter((names) => names !== 'financialYear' && names !== 'companyID' && names !== 'companyName' && names !== 'companyPeerComparisionID' && names !== 'userCompanyID')
        // let yearsData = cloneTable.forEach((year) =>{console.log()})
        let tableRow = rowsName.map((eachName)=>({
            name:eachName,
            years: getDataYear(eachName, cloneTable)
        }))
        setRowData(tableRow)
    })}
    else{
        setRowData(null)
        setYears(null)
    }
},[comparison])

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

const getTitle = (rowTitle) => {
    switch (rowTitle) {
        case 'sales': return 'Sales'                
            break;
        case 'ebidtaPercentage': return 'EBIDTA (%)'                
            break;
        case 'patPercentage': return 'PAT (%)'                
            break;
        case 'cp': return 'CP'                
            break;
        case 'fatr': return 'FATR'                
            break;
        case 'termDebt': return 'Term Debt'                
            break;
        case 'totalDebt': return 'Term Debt'                
            break;
        case 'tnw': return 'TNW'                
            break;
        case 'tol': return 'TOL'                
            break;
        case 'toL_OR_TNW': return 'TOL/TNW'                
            break;
        
        default: return rowTitle
            break;
    }
}

const getSymbol = (title) => {
    switch (title) {
        case 'ebidtaPercentage': return '%'                
            break;
        case 'patPercentage': return '%'                
            break;
        case 'toL_OR_TNW': return 'x'                
            break;    
        default: return ''
            break;
    }
}

  return (
    <>
    <GridItem>
    <TeasorCheck bankingArrangments={bankingArrangments} /> 
        <Flex color='#4C5EFE' fontSize={14} fontWeight='bold' justifyContent='space-between' px={4} mt={4}>
            <Box>PEER COMPARISON</Box>
        </Flex>
        <TableContainer border='1px solid #D9D9D9' borderRadius={20}>
            <Table size='sm'>
                <Thead bg='#F1F3FE' py={4}>
                <Tr>
                    <Th py={4}></Th>
                    {
                        diferentsCompanies && diferentsCompanies.map((company,index)=>(
                            <Th key={index} colSpan="2" textAlign='center' py={4}>{company}</Th>
                        ))
                    }
                </Tr>
                <Tr>
                    <Th py={4}></Th>
                    {
                        years && diferentsCompanies.length > 0 &&
                        years.map((year, index) => (
                            <Th key={index} py={4} isNumeric>{year}</Th>
                        ))
                    }
                    {
                        years && diferentsCompanies.length > 1 &&
                        years.map((year, index) => (
                            <Th key={index} py={4} isNumeric>{year}</Th>
                        ))
                    }
                    {
                        years && diferentsCompanies.length > 2 &&
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
                                py={4}>
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
                        <Td p={8}  h='100%' colSpan={4} rowSpan={20} textAlign='center'>No data available</Td>
                    </Tr>
                }
                </Tbody>
            </Table>
        </TableContainer>
    </GridItem>
    </>
  )
}

export default TeasorComparison
