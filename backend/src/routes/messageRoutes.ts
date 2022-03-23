import express from 'express';
import {
  findAll, findById, addMessage, deleteMessage,
} from '../service/MessageService';

const router = express.Router();

router.get('/', async (_req, res) => {
  res.send(await findAll());
});

router.get('/:messageId', async (_req, res) => {
  // TODO handle if not a number
  const messageId = Number(_req.params.messageId);
  res.send(await findById(messageId));
});

router.post('/', async (req, res) => {
  const { message, username } = req.body;
  res.send(await addMessage(message, username));
});

router.delete('/:messageId', async (req, res) => {
  const messageId = Number(req.params.messageId);
  const message = await deleteMessage(messageId);

  res.sendStatus(message ? 200 : 400);
});

export default router;
