import { Box, Checkbox, Flex, Input, Radio, RadioGroup, Select, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaRegDotCircle } from "react-icons/fa";

const ProductSecurityType = ({ item, securityData, loanSubtypeSecurityItem, header, setItemChange, allSecurityData, itemChecked, setIitemChecked }) => {
    // const [itemChecked, setIitemChecked] = useState(false)
    const [itemValue, setIitemValue] = useState('')
    const [currentItem, setCurrentItem] = useState('')
    const [sliderValue, setSliderValue] = useState(20)
    const securityItemType = {
        checkbox: 'checkbox',
        select: 'select',
        range: 'range',
        radio: 'radio',
        number: 'number',
        textBox: 'text'
    }

    const headersIds = {
        mortgage: '1c5a8baa-99be-42e5-9cd6-9b64e1a8c284'
    }

    useEffect(() => {
        if(loanSubtypeSecurityItem){
            const currentValue = JSON.parse(loanSubtypeSecurityItem.itemValue)
            if((item.type === securityItemType.number || item.type === securityItemType.textBox)){
                changeItemValue(
                    {
                    type: item.type,
                    securityDetails: {detailId:currentValue?.value[0]?.id}
                    }, 
                    currentValue?.value[0]?.value
                )
                setCurrentItem(currentValue?.value[0]?.value)
            }
            if(item.type === securityItemType.select && currentValue.value){
                setIitemValue(currentValue?.value[1]?.value)
                changeItemValue(
                    {
                    type: securityItemType.select,
                    detailId:currentValue?.value[1]?.id || '', 
                    itemLabel:currentValue?.value[1]?.value || ''
                    }, 
                    currentValue?.value[1]?.value
                )
            }
            if(item.type === securityItemType.checkbox && currentValue.value && item.lable === currentValue?.value[0]?.value){
                changeItemValue(
                    {
                    type: securityItemType.checkbox,
                    detailId:currentValue?.value[0]?.id || '', 
                    itemLabel:currentValue?.value[0]?.value || ''
                    }, 
                    currentValue?.value[0]?.value
                )
                setIitemChecked()
            }
            if(item.type === securityItemType.range){
                changeItemValue(
                    {
                    type: securityItemType.range,
                    detailId:currentValue?.value[2]?.id || '', 
                    itemLabel:currentValue?.value[2]?.value || ''
                    }, 
                    currentValue?.value[2]?.value
                )
            }
            if(item.type === securityItemType.radio){
                changeItemValue(
                    {
                    type: securityItemType.radio,
                    id:currentValue.titleId
                    }, 
                    currentValue?.value[0]?.value
                )
            }
        }
    },[loanSubtypeSecurityItem, item])

    useEffect(() => {
    }, [setIitemChecked])

    const changeItemValue = (item, value) => {
        if(item.type === securityItemType.checkbox){
            if(header.headerId === headersIds.mortgage){
                if(securityData.value[0].itemLabel === item.lable){
                    securityData.value[0] = {
                        id:'',
                        itemLabel: '',
                        value:'',
                        type: ''
                    }
                }else{
                    securityData.value[0] = {
                        id:item.detailId,
                        itemLabel: item.lable,
                        value:value,
                        type: item.type
                    }
                }
            }else{
                if(securityData.value[0].itemLabel === item.lable){
                    securityData.value = [ 
                        {
                            id:'',
                            itemLabel: '',
                            value:''
                        }
                    ]
                }
                else{
                    securityData.value = [ 
                        {
                            id:item.detailId,
                            itemLabel: item.lable,
                            value:value
                        }
                    ]
                }
            }
            // console.log(allSecurityData)
            setIitemChecked()
        }
        if(item.type === securityItemType.select){
            setIitemValue(value)
            if(header.headerId === headersIds.mortgage){
                securityData.value[1] = {
                    id:item.detailId,
                    itemLabel: item.lable,
                    value:value,
                    type: item.type
                }
            }else{
                securityData.value = [ 
                    {
                        id:item.detailId, 
                        itemLabel: item.lable,
                        value:value 
                    } 
                ]
            }
        }
        if(item.type === securityItemType.range){
            setSliderValue(value || 20)
            if(header.headerId === headersIds.mortgage){
                securityData.value[2] = {
                    id:item.detailId,
                    itemLabel: item.lable,
                    value:value,
                    type: item.type
                }
            }else{
                securityData.value = [ 
                    {
                        id:item.detailId, 
                        itemLabel: item.lable,
                        value:value 
                    } 
                ]
            }
        }
        if(item.type === securityItemType.radio){
            securityData.value = [ 
                {
                    id:item.id, 
                    value:value 
                } 
            ]
        }
        if(item.type === securityItemType.number && value <= 100 && value >= 0){
            setCurrentItem(value)
            securityData.value = [ 
                {
                    id:item?.securityDetails[0]?.detailId, 
                    value:value 
                } 
            ]
        }
        if(item.type === securityItemType.textBox && value.length < 50){
            setCurrentItem(value)
            securityData.value = [ 
                {
                    id:item?.securityDetails[0]?.detailId, 
                    value:value 
                } 
            ]
        }
    }

    const getConditions = (label) => {
        if(header.headerId === headersIds.mortgage){
            if(securityData.value[0].value === label){
                return true
            }else{
                return false
            }
        }else{
            if(securityData.value[0].value === label){
                return true
            }else{
                return false
            }
        }
    }

  return (
    <Box 
    border={item?.type !== securityItemType.radio && '1px solid #DADADA'}
    p={item?.type !== securityItemType.radio && '.25rem .5rem'}
    w='100%'
    borderRadius={8}
    >
        {
            item.type === securityItemType.checkbox &&
            <Checkbox
                fontSize='10px !important'
                colorScheme='purple'
                borderColor='purple'
                // isChecked={itemChecked}
                isChecked={getConditions(item.lable)}
                value={item.lable}
                onChange={(e) => {
                    changeItemValue(item, e.target.value)
                    setItemChange(false)
                }}
                size='sm'>
                {item.lable}
            </Checkbox>
        }
        {
            item.type === securityItemType.select &&
            <>
                <Box
                fontSize={['sm']}
                fontWeight='600'
                >
                    {item.lable}
                </Box>
                <Select 
                w='100%'
                border='none'
                zIndex={100}
                placeholder='Select'
                value={itemValue}
                onChange={(e) => {
                    changeItemValue(item, e.target.value)
                    setItemChange(false)
                }}
                >
                    {
                        item?.value?.split(',').map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))
                    }
                </Select>
            </>
        }
        {
            item.type === securityItemType.range &&
            <>
                <Box
                fontSize={['sm']}
                fontWeight='600'
                >
                    {item.lable}
                </Box>
                <Slider 
                aria-label='slider-ex-1' 
                defaultValue={loanSubtypeSecurityItem && JSON.parse(loanSubtypeSecurityItem.itemValue)?.value[2]?.value || sliderValue} 
                onChange={(e) => {
                    changeItemValue(item, e)
                    setItemChange(false)
                    }
                    }>
                    <SliderMark
                    value={sliderValue}
                    textAlign='center'
                    bg='blue.500'
                    color='white'
                    // mt='-7'
                    ml='5'
                    w='12'
                    >
                    {sliderValue}%
                    </SliderMark>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                        <Box  as={FaRegDotCircle} />
                    </SliderThumb>
                </Slider>
            </>
        }
        {
            item.type === securityItemType.radio &&
            <RadioGroup 
            defaultValue={loanSubtypeSecurityItem && JSON.parse(loanSubtypeSecurityItem.itemValue)?.value[0]?.value || (item?.securityDetails && item?.securityDetails[0]?.lable)}
            onChange={(e) => {
                changeItemValue(item, e)
                setItemChange(false)
            }}
            >
            <Flex
            gap={4}
            >
            <Box
            fontSize={['sm']}
            fontWeight='600'
            >
                {item.companySecurityName}
            </Box>
            {
                item?.securityDetails?.map((value, index) => (
                    <Radio 
                    key={index}
                    bg='#D9D9D9' 
                    value={value.lable}>
                        {value.lable}
                    </Radio>
                ))
            }
            </Flex>
        </RadioGroup>
        }
        {
            item.type === securityItemType.textBox &&
            <Input 
            size='sm' 
            bg='#FAFAFA'
            type={securityItemType.textBox}                                        
            p={1} 
            textAlign='center'
            min={0}
            border='none'
            value={currentItem}
            borderRadius={5} 
            fontSize='1em'
            onChange={(e) => {
                changeItemValue(item, e.target.value)
                setItemChange(false)
            }}
            />
        }
        {
            item.type === securityItemType.number &&
            <Input 
            size='sm' 
            bg='#FAFAFA'
            type={securityItemType.number}                                        
            p={1} 
            textAlign='center'
            min={0}
            border='none'
            value={currentItem}
            borderRadius={5} 
            max={9999}
            fontSize='1em'
            onChange={(e) => {
                changeItemValue(item, e.target.value)
                setItemChange(false)
            }}
            />
        }
    </Box>
  )
}

export default ProductSecurityType
