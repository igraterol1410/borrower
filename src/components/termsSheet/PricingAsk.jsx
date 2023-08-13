import { updatePricingAsk } from '@/services/products.services'
import { Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const PricingAsk = ({item, hasChange, setHasChange}) => {
    const [pricingValue, setPricingValue] = useState(item.percentPricingAsk)

    useEffect(() => {
        if(item){
            setPricingValue(item.percentPricingAsk)
        }
    },[item])

    const changePercentage = (value) => {
        setHasChange(hasChange + 1)
        if(value > 80){
            const payload = {
                userCompanyProductId: item.userCompanyProductID,
                percentPricingAsk: 80
            }
            setPricingValue(80)
            updatePricingAsk(payload)
        } else if( value < 0){
            const payload = {
                userCompanyProductId: item.userCompanyProductID,
                percentPricingAsk: 0
            }
            setPricingValue(0)
            updatePricingAsk(payload)
        } else{
            const payload = {
                userCompanyProductId: item.userCompanyProductID,
                percentPricingAsk: value
            }
            setPricingValue(value)
            updatePricingAsk(payload)
        }
    }
  return (
    <Input
    type='number'
    size='xs'
    max={80}
    placeholder='Pricing ask'
    min={0}
    value={pricingValue}
    onChange={(e) => changePercentage(e.target.value)}
    w='90%'
    />
  )
}

export default PricingAsk
