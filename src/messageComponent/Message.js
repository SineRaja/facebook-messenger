//import { Card, CardContent, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
import './Message.css';

const Message = forwardRef(({ message, username }, ref) => {
  const isUser = username === message.username;
  return (
    <div className='message_content'>
      <div ref={ref} className={`message ${isUser && 'message_user'}`}>
        <p className='userName_design'>{!isUser && `${message.username.replace('@gmail.com', '') || 'Unknown User'} `}</p>
        <div className={isUser ? "message_userCard" : "message_questCard"}>
          <div className='message_card_content'>
            <h1 className='text_message_design' >
              {message.message}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Message
