import { useToast } from '@chakra-ui/react'
const toast = useToast()

const showToast = (title, message, status, closable) => {
    toast({
        title: title,
        description: message,
        status: status,
        duration: 3000,
        isClosable: closable,
      })
}

export {
    showToast
  }