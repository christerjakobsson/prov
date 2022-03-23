import React, { useEffect, useState, KeyboardEvent } from 'react';
import Message from '../typings/Message';
import MessageService from '../services/MessageService';
import MessageComponent from './MessageComponent';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { TextField } from '@mui/material';

function MessagesComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  
  const fetchMessages = async () => {
    const messages = await MessageService.fetchAll();
    
    setMessages(messages)
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const keyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.keyCode == 13 && length) {
      const result = await MessageService.addMessage(username, message);
      setMessage("");
      if(result) {
        fetchMessages();
      }
    }
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', color: 'black' }}>
      <h1>Messages</h1>
      <nav aria-label="add-message">
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }}}>
          <div>
            <TextField value={username} onChange={(e) => setUsername(e.target.value)} id="username" label="Username" variant="outlined" />
          </div>
          <div>
            <TextField value={message} onChange={(e) => setMessage(e.target.value)} id="message" label="Message" variant="outlined" onKeyDown={keyPress}/>
          </div>
        </Box>
      </nav>
      <Divider />
      <nav aria-label="messages">
        <List>
          {messages && messages.map(message => <MessageComponent message={message} onSuccessfulDelete={fetchMessages} /> )}
        </List>
      </nav>
    </Box>
  );
}

export default MessagesComponent;
