import { Flex, FormControl, FormLabel, Switch, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

const NotificationCard = ({ notification, payload, setPayload }) => {
    const [checkedItem, setCheckedItem] = useState(!notification.isExcluded)

    const handleSwitch = () => {
        const currentNotifications = payload
        if(!verifyDeals()){
            setCheckedItem(!checkedItem)
            currentNotifications.push(notification.notificationTemplateId)
            setPayload(currentNotifications)            
        }else{
            const notificationToDelete = payload.filter((eachNotification)=>(eachNotification === notification.notificationTemplateId))
            const index = payload.indexOf(notificationToDelete[0])
            const newArray = [...payload]
            newArray.splice(index, 1)
            setPayload(newArray)
            setCheckedItem(!checkedItem)
        }
    }

    const verifyDeals = () => {
        const currentSelectedNotifications = payload.filter((eachNotification)=>(eachNotification === notification.notificationTemplateId))
        return currentSelectedNotifications?.length > 0
    }
  return (
    <FormControl 
    as={Flex} 
    justifyContent='space-between'
    mb={4}
    key={notification.notificationTemplateId}
    >
        <FormLabel>
            <Text>{notification.name}</Text>
            <Text fontSize='xs' color='#aaa'>{notification.description}</Text>
        </FormLabel>
        <Switch onChange={handleSwitch} size='lg' isChecked={checkedItem} />
    </FormControl>
  )
}

export default NotificationCard
