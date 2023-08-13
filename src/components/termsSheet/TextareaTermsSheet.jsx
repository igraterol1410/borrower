import React from 'react'
import { Textarea } from '@chakra-ui/react'

const TextareaTermsSheet = ({disable,value,setVariable, width}) => {
  return (
    <Textarea 
    maxLength={250}
    size={['sm', 'md']}
    fontSize='xs'
    resize='none' 
    disabled={disable}
    w={width || ['90%','85%']}
    borderColor='#D9D9D9'
    value={value}
    onChange={(e) => setVariable(e.target.value)} 
    />
  )
}

export default TextareaTermsSheet
