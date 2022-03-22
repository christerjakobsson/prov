import express from 'express';
import MessageService from './service/MessageService';
import Message from './typings/message';

const app = express();

app.get('/messages', (_req, res) => {
  res.send(MessageService.getMessages());
});

app.get('/messages/:messageId', (_req, res) => {
  // TODO handle if not a number
  const messageId = Number(_req.params.messageId);

  res.send(MessageService.getById(messageId));
});

app.post('messages', (req, res) => {
  const message = req.body as Message;
  MessageService.addMessage(message);
  res.send('');
});

// TODO PUT

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('App listening on port 3000!');
});
