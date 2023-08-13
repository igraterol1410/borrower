import { Flex, Image, SlideFade, Tooltip, useDisclosure } from '@chakra-ui/react'
import { motion } from 'framer-motion';
import React from 'react'
import { FaPlus,FaRegComment } from "react-icons/fa";
import CommentCheck from '@/assets/comments-icons/comment-check.svg'
import CommentPlus from '@/assets/comments-icons/comment-plus.svg'
import CommentClose from '@/assets/comments-icons/comment-close.svg'

const CommentsOptions = ({ enableComments, setEnableComments, addComments, setAddComments, viewComments, setViewComments }) => {
    const { isOpen, onToggle } = useDisclosure()

  return (
    <Flex
    direction='column'
    position='fixed'
    bottom='20px'
    right='20px'
    zIndex={1000}
    gap={2}
    >
        <SlideFade in={isOpen} offsetY='20px'>
            <Tooltip placement='left' hasArrow label='Add comment'>
            <Flex 
            position='relative'
            as={motion.div}
            transition='all ease .5s'
            alignItems='center' 
            justifyContent='center' 
            h='60px' 
            w='60px' 
            borderRadius='50%'
            bg='cyan.400'
            color='white'
            _hover={{
                bg:'cyan.300'
            }}
            onClick={() => {
                setAddComments(!addComments)
                onToggle()
            }}
            >
                <Image src={CommentPlus} />
            </Flex>
            </Tooltip>
        </SlideFade>
        <SlideFade in={isOpen} offsetY='20px'>
            <Tooltip placement='left' hasArrow label={!enableComments ? 'Enable comments' : 'Disable comments'}>
            <Flex 
            as={motion.div}
            transition='all ease .5s'
            alignItems='center' 
            justifyContent='center' 
            h='60px' 
            w='60px' 
            borderRadius='50%'
            bg='pink.400'
            color='white'
            _hover={{
                bg:'pink.300'
            }}
            onClick={() => {
                setEnableComments(!enableComments)
                onToggle()
            }}
            >
                <Image src={!enableComments ? CommentCheck : CommentClose} />
            </Flex>
            </Tooltip>
        </SlideFade>
        <SlideFade in={isOpen} offsetY='20px'>
            <Tooltip placement='left' hasArrow label='View all comments'>
            <Flex 
            as={motion.div}
            transition='all ease .5s'
            alignItems='center' 
            justifyContent='center' 
            h='60px' 
            w='60px' 
            borderRadius='50%'
            bg='blue.400'
            color='white'
            _hover={{
                bg:'blue.300'
            }}
            onClick={() => {
                setViewComments(!viewComments)
                onToggle()
            }}
            >
                <FaRegComment />
            </Flex>
            </Tooltip>
        </SlideFade>
        <Flex 
        as={motion.div}
        transition='all ease .5s'
        alignItems='center' 
        justifyContent='center' 
        h='60px' 
        w='60px' 
        borderRadius='50% 50% 0 50%'
        bg='blue.800'
        color='white'
        _hover={{
            bg:'blue.600'
        }}
        onClick={onToggle}
        >
            <FaPlus />
        </Flex>
    </Flex>
  )
}

export default CommentsOptions
