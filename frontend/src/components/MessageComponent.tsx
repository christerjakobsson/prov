import React from 'react';
import Message from '../typings/Message';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageService from '../services/MessageService';

interface Props {
  message: Message;
  onSuccessfulDelete: () => void;
}

function MessageComponent({ message, onSuccessfulDelete }: Props) {

  const deleteMessage = async (messageId: number) => {
    const isDeleted = await MessageService.deleteMessage(messageId)
    if(isDeleted) {
      onSuccessfulDelete();
    }
  }

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={message.text} secondary={message.userId} />
        <DeleteIcon onClick={() => deleteMessage(message.id)} />
      </ListItemButton>
    </ListItem>
  );
}

export default MessageComponent;


