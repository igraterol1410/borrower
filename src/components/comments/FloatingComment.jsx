import { Badge, Box, Center, Flex, Image, Input, Text, Textarea, Tooltip } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { BsThreeDots, BsXLg, BsPlusLg } from "react-icons/bs";
import { TiArrowUpThick } from "react-icons/ti";
import Comment from './Comment';
import { useSelector } from 'react-redux';

const FloatingComment = ({ position, comment, closeAction }) => {
    const { user } = useSelector( state => state?.user )
    const [showComment, setShowComment] = useState(!comment)
    const [currentType, setCurrentType] = useState(null)
    const [commentContent, setCommentContent] = useState('')
    const commentsType = [
        {
            label: 'Query',
            color: 'gray'
        },
        {
            label: 'Resolved',
            color: 'green'
        },
        {
            label: 'Urgent',
            color: 'red'
        },
        {
            label: 'Pending',
            color: 'blue'
        }
    ]

    useEffect(() => {
        if(comment){
            const currentCommentType = commentsType.filter((eachType) => (eachType.label === comment.type))
            setCurrentType(currentCommentType[0])
        }
    }, [])

    const handleWrite = (value) => {
        if(value.length <= 250){
            setCommentContent(value)
        }
    }

    const handleClose = () => {
        setShowComment(!showComment)
        if(!comment){
            closeAction()
        }
    }
    


  return (
    <Box
    as={motion.div}
    drag={!comment}
    pb={8}
    position='absolute'
    top={position.top - 64}
    left={position.left}
    zIndex={100}
    fontSize='xs'
    >
        <Flex gap={2}>
            <Flex
            h='30px'
            w='30px'
            borderRadius='50% 50% 0 50%'
            bg={comment ? `${currentType && currentType.color}.400` : 'purple.500'}
            justifyContent='center'
            alignItems='center'
            color='white'
            onClick={() => setShowComment(!showComment)}
            >
                {
                    !comment
                    ?
                    <BsPlusLg />
                    :
                    <BsXLg />
                }
            </Flex>
            <Box
            bg='white'
            shadow='2xl'
            borderRadius={20}
            w='300px'
            display={showComment ? 'block' : 'none'}
            border={currentType && `1px solid ${currentType.color}`}
            >
                <Flex 
                px={6} 
                pt={2}
                pb={2} 
                borderBottom='1px solid #eee'
                justifyContent='space-between'
                alignItems='center'
                >
                    <Box>
                        {
                            comment 
                            ?
                            <Box>{comment.title}</Box>
                            :
                            <Input variant='unstyled' border='none' size='xs' placeholder='Type a title' />
                        }                        
                    </Box>
                    <Flex gap={4}>
                        <Box cursor={!comment && 'grab'}>
                            {/* <Tooltip placement='top' hasArrow label={!comment && 'Drag'}> */}
                                <BsThreeDots /> 
                            {/* </Tooltip> */}
                        </Box>
                        <Box onClick={handleClose}>
                            <BsXLg />
                        </Box>
                    </Flex>
                </Flex>
                {
                    comment 
                    ?
                    <Comment comment={comment} />
                    :
                    <Flex 
                    gap={4} 
                    direction='column' 
                    minH='150px' 
                    pb={0} 
                    justifyContent='space-between'
                    >
                        <Box>
                            <Flex 
                            gap={2} 
                            p={2} 
                            pb={0}
                            h='100%'>
                                <Box>
                                    <Image 
                                    src={user?.picture} 
                                    w='40px' 
                                    h='40px' 
                                    borderRadius={50} 
                                    display={['none','none','block','block']} 
                                    />
                                </Box>
                                <Flex 
                                direction='column' 
                                justifyContent='space-between'
                                w='100%'
                                >
                                    <Box color='#086de7'>{user?.nickname || user?.email}</Box>
                                    <Textarea 
                                    variant='unstyled' 
                                    border='none' 
                                    size='xs' 
                                    w='100%'
                                    placeholder='Write a comment' 
                                    value={commentContent}
                                    onChange={(e) => handleWrite(e.target.value)}
                                    />
                                </Flex>
                            </Flex>
                            <Flex 
                            justifyContent='flex-end'
                            pr={4}
                            >
                                <Flex
                                alignItems='center'
                                gap={3}
                                >
                                    <Box>
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
                        </Box>
                        <Box borderRadius='0 0 20px 20px' bg='#eee' pt={2}>
                            <Text pl={4} color='gray' mb={1}>Mark comment as:</Text>
                            <Flex gap={2} p={2} justifyContent='space-around'>
                                {
                                    commentsType.map((type, index) => (
                                        <Badge 
                                        w='100%'
                                        textAlign='center'
                                        borderRadius={25} 
                                        px={2} 
                                        py={1} 
                                        textTransform='capitalize'
                                        colorScheme={type.color}
                                        color={type.color}
                                        fontSize='.65rem'
                                        cursor='pointer'
                                        border={`1px dashed ${currentType && currentType.label === type.label ? type.color : 'none'}`}
                                        onClick={() => setCurrentType(type)}
                                        >
                                            {type.label}
                                        </Badge>
                                    ))
                                }
                            </Flex>
                        </Box>
                    </Flex>
                }
            </Box>
        </Flex>
    </Box>
  )
}

export default FloatingComment
