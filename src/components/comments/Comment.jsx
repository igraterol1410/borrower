import { Box, Collapse, Flex, Image, Input, Textarea, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TiArrowUpThick } from "react-icons/ti";
import { motion } from 'framer-motion';

const Comment = ({ comment }) => {
  const { isOpen, onToggle } = useDisclosure()
  const { user } = useSelector( state => state?.user )
  const [commentContent, setCommentContent] = useState('')

  const handleWrite = (value) => {
    if(value.length <= 250){
        setCommentContent(value)
    }
}

  return (
    <Box 
    border='1px solid #eee'
    p='.75rem 1.25rem'
    _hover={{
      bg:'#f9f9f9'
    }}
    fontSize='sm'
    borderRadius='0 0 20px 20px'
    >
      <Flex 
      justifyContent='space-between'
      mb={6}
      >
        <Flex gap={2} alignItems='center'>
        <Box>
          <Image 
          src={user?.picture} 
          w='40px' 
          h='40px' 
          borderRadius={50} 
          display={['none','none','block','block']} 
          />
        </Box>
        <Box>
          <Box color='#086de7'>{user?.nickname || user?.email}</Box>
          <Box fontSize='xs'>{comment.title}</Box>
        </Box>
          <Box fontSize='xs' color='#aaa'>date</Box>
        </Flex>
        <Box cursor='pointer' onClick={onToggle}>Info</Box>
      </Flex>
      <Box>{comment.comment}</Box>
      <Collapse in={isOpen} animateOpacity>
        <Flex
          color='white'
          mt='4'
          rounded='md'
          shadow='md'
          w='100%'
          alignItems='center'
          justifyContent='space-around'
        >
          <Textarea 
          variant='unstyled' 
          size='sm' 
          minH='10px'
          placeholder='Add comment' 
          w='70%' 
          border='none' 
          value={commentContent}
          onChange={(e) => handleWrite(e.target.value)}
          />
          <Flex
          alignItems='center'
          gap={3}
          >
              <Box color='red'>
                  {commentContent.length}/250
              </Box>
              <Flex 
              as={motion.div}
              transition='all ease .5s'
              justifyContent='center' 
              alignItems='center' 
              color='white' 
              alignSelf='flex-end' 
              fontSize='2xl' 
              h='30px' 
              w='30px' 
              borderRadius='50%' 
              bg='#aaa'
              _hover={{
                  bg:'#ccc'
              }}
              >
                  <TiArrowUpThick />
              </Flex>
          </Flex>
        </Flex>
      </Collapse>
    </Box>
  )
}

export default Comment
