import React, { useEffect, useState } from 'react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import './styles/chatStyles.css'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
  ConversationList,
  Conversation,
} from "@chatscope/chat-ui-kit-react";
import { Box, Flex } from '@chakra-ui/react';
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

import Logo from '@/assets/icons/ibankey-logo-2.svg'
import BankImage1 from '@/assets/icons/bank-image-1.svg'
import ReplyIcon from '@/assets/icons/reply-icon.svg'
import Dots from '@/assets/icons/dots.svg'
import { getHeadersId, getMessages, postMessage } from '@/services/chat.services';

import { AiOutlineDelete, AiOutlineEdit, AiOutlineCloseCircle  } from "react-icons/ai";
import { BsFillReplyFill, BsThreeDotsVertical  } from "react-icons/bs";

const ChatUi = ({banks, showChat, setShowChat, bankChat, setBankChat}) => {
    const [showList, setShowList] = useState(false)
    const [msgInputValue, setMsgInputValue] = useState("");
    const [messageSent, setMessageSent] = useState([]);
    const [messageParent, setMessageParent] = useState(null)
    const [headerId, setHeaderId] = useState(null)
    const [messagePagination, setMessagePagination] = useState(0)
    const [messageSentId, setMessageSentId] = useState(1)
    const [showMessageAction, setShowMwssageAction] = useState(null)
    const [loading, setLoading] = useState(false)
    const [chatScrolled, setChatScrolled] = useState(true)
    const [editMessage, setEditMessage] = useState(null)
    const lenderID = 'c17bc5e6-88b1-4d14-bacb-7f4096b5e1e6'
    const messageListContainer = document.getElementById('listContainer')
    
    
    useEffect(() => {
        const handleScroll = () => {
            if(messageListContainer?.scrollTop > 0){
                setChatScrolled(messageListContainer?.scrollTop > 0)
            }
            if(chatScrolled){
                if(messageListContainer?.scrollTop === 0){
                    getConversationMessages(headerId, (messagePagination + 1))
                    setMessagePagination(messagePagination + 1)
                    setChatScrolled(true)
                }
            }
        }
        messageListContainer?.addEventListener('scroll', handleScroll)
    
        return () => {
            setMessagePagination(0)
            messageListContainer?.removeEventListener('scroll', handleScroll)}
      }, [messageListContainer, loading])

    const handleBack = () =>{
        setShowList(true)
        setMessageSent([])
    }
    const handleShow = () =>{
        // console.log(bankChat)
        if(bankChat.name || bankChat.bankName){
            setShowChat(!showChat)
            setMessageSent([])
        }
        // setShowList(true)
    }

    const handleChat = (bank) => {
        setBankChat({
            bankIcon:bank.image,
            bankName:bank.name,
        })
        setShowList(false)
    }

    useEffect(() => {
        if(bankChat.bankName){
            setShowList(false)
        }
    },[showChat])
    
    useEffect(() => {
        if(messagePagination === 0){
            messageListContainer?.scrollTo(150, 2000) 
        }
    },[messageSent])

    const getMessageTime = (message) => {
        const date = new Date(message.createdOn)
        return date.getTime()
    }

    const gotoLastMessage = (messages) => {
        setTimeout(() => {
            messageListContainer?.scrollTo(150, (messageListContainer?.scrollHeight))           
        }, 300);
    }

    const getConversationMessages = (headerId, page) => {
        setLoading(true)
        getMessages(headerId, page).then((res) => {
            setLoading(false)
            res.sort((a, b) => getMessageTime(a) - getMessageTime(b))
            if(res !== messageSent){
                setMessageSent(res.concat(messageSent))
            }
            gotoLastMessage(res.concat(messageSent))
        })
    }

    const getCurrentTime = () => {
        var date = new Date().toLocaleString( 'sv', { timeZone: 'Asia/Kolkata' } )
        return date
    }

    useEffect(() => {
        if(showChat){
            setLoading(true)
            getHeadersId(bankChat.userCompanyId, bankChat.lenderId).then((res) => {
                setHeaderId(res)
                getConversationMessages(res, messagePagination)
            })
        }
    },[bankChat])

    const handleSend = message => {
        if(editMessage){
            // console.log(messageSent)
            editMessage.content = message
            // console.log(editMessage)
            const editedMessage = messageSent.filter((eachSentMessage) => (eachSentMessage.messageId === editMessage.messageId))
            // console.log(editedMessage[0])
        }
        else{
            const newMessage = {
                type: "html",
                messageId: messageSentId,
                messageHeaderId: headerId,
                content: message,
                createdOn: getCurrentTime(),
                senderId: bankChat.userCompanyId,
                parentId: messageParent || null,
                direction: 'normal',
                isEdited: true,
                isDeleted: true
              }
              postMessage(newMessage)
            setMessageSent([...messageSent, newMessage]);
            setMsgInputValue("");
            setMessageParent(null)
            setMessageSentId(messageSentId +1)
            gotoLastMessage([...messageSent, newMessage])
        }
      };

      const getParent = (id) => {
        const parent = messageSent.filter((message) => (message.messageId === id))
        return id !== null && parent.length > 0 ? parent[0].content : ''
      }

      const formatDate = (fecha) => {
        const identifyDate = fecha.split(' ')
        if(identifyDate.length > 1){
            const date2 = identifyDate[1].split(':')
            return `${identifyDate[0]} ${date2[0]}:${date2[1]}`
        }
        else{
            if (!fecha) return
            if(fecha !== 'Just now'){
                const date = fecha.split('.')
                const date1 = date[0].split('T')
                const date2 = date1[1].split(':')
                return `${date1[0]} ${date2[0]}:${date2[1]}`
            }else{
                return fecha
            }
        }
      }

      const setMessageToEdit = (message) => {
        setEditMessage(message)
        setMessageParent(message.messageId)
        setMsgInputValue(message.content)
      }
    
    
  return (
    <Box display={bankChat.name || bankChat.bankName ? 'block' : 'none'} w={['90vw', '40vw']} position='fixed' bottom='20px' right='20px' zIndex='10'>
        <Box 
        w='50px' 
        h='50px' 
        borderRadius='50%' 
        bgGradient='linear(to-b, #4C5EFE 0%, #290088 315.22%)'
        ml='auto'
        mb={2}
        display='flex'
        justifyContent='center'
        alignItems='center'
        color='white'
        onClick={handleShow}
        >
            {
                showChat
                ?
                <AiOutlineDown />
                :
                <AiOutlineUp />
            }
        </Box>
        {
            showChat &&
            <Box
            position='relative'>
                {
                    messageParent &&
                    <Flex
                    position='absolute'
                    borderRadius='12px'
                    bottom='50px'
                    p={3}
                    right='15px'
                    w='95%'
                    zIndex='1000'
                    bgGradient='linear(to-b, #4C5EFE 0%, #290088 315.22%)'
                    color='white'                    
                    justifyContent='space-between'
                    >
                        <Box className='reply-box-2' fontSize='xs'>
                        { editMessage ? msgInputValue.toString() : getParent(messageParent)}
                        </Box>
                        <Box><AiOutlineCloseCircle onClick={() => {
                            if(editMessage){
                                setEditMessage(null)
                            }
                            setMessageParent(null)
                        }} /></Box>
                    </Flex>
                }
            {
                showList
                ?
                <ConversationList>    
                    {
                        banks && banks.map((bank, index) => (
                        <Conversation key={index} name={bank.bankName} onClick={() => handleChat(bank)}>
                            <Avatar src={bank.bankIcon} name={bank.bankName} />
                        </Conversation>
                        ))
                    }                
                </ConversationList>
            :
                <MainContainer>
                    <ChatContainer>
                        <ConversationHeader>
                            <ConversationHeader.Back onClick={handleShow} />
                            {/* <Avatar src={BankImage1} name="Joe" /> */}
                            <ConversationHeader.Content userName={`${bankChat.bankName} (${bankChat.bank})`} info="" />
                            <ConversationHeader.Actions>
                                <Avatar src={Logo} name="Joe" />
                            </ConversationHeader.Actions>
                        </ ConversationHeader>
                        <MessageList 
                        id='listContainer' 
                        autoScrollToBottom={true} 
                        loading={loading}
                        >
                        {
                            messageSent && messageSent.map((item, index) => (
                            <Message
                            key={index}
                            model={{
                                message: item.content,
                                sentTime: item.sentTime,
                                sender: item.sender,
                                direction: item.senderId === bankChat.userCompanyId ? 'outgoing' : 'incoming',
                                position: item.position === 'normal' ? 'normal' :'normal',
                                type: 'html'
                            }}
                            id={item.messageId}
                            avatarPosition={item.direction === 'outgoing' ? 'cl' : 'cr'}
                            >
                                {
                                    item.parentId !== null &&
                                    <Message.HtmlContent html={`<div class='reply-box'>${getParent(item.parentId)}</div><br/> ${item.content}`} />
                                }
                                <Message.Header children={
                                <Flex className='message-actions' gap={2} mb={-3} color='#4C5EFE' fontSize='large' opacity={showMessageAction && showMessageAction === index ? '1' : '0'}>
                                    <Box><AiOutlineDelete cursor='pointer' /></Box>
                                    <Box><AiOutlineEdit cursor='pointer' onClick={()=>setMessageToEdit(item)}/></Box>
                                    <Box><BsFillReplyFill cursor='pointer' onClick={()=>setMessageParent(item.messageId)} /></Box>
                                </Flex>
                                } />
                                <Message.Footer children={
                                <Flex className='message-actions' gap={2} ml='auto' mt='-.5rem' opacity={showMessageAction && showMessageAction === index ? '1' : '0'}>
                                    <Box>{formatDate(item.createdOn)}</Box>
                                </Flex>
                                } />
                                <Avatar src={Dots} className='dots-img' onClick={()=>{
                                    if(showMessageAction===index){
                                        setShowMwssageAction(null)
                                    }else{
                                        setShowMwssageAction(index)
                                    }
                                    }} size="xs"/>
                            </Message>
                                ))
                            }
                        </MessageList>
                        <MessageInput fancyScroll={false} attachButton={false} placeholder="Type message here" className='borrower-input-chat' onChange={msg => setMsgInputValue(msg)} value={msgInputValue} onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            }
            </Box>
        }
    </Box>
  )
}

export default ChatUi
