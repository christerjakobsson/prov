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

  if (Number.isNaN(messageId)) {
    return res.status(400).send({ error: 'messageId is not a number' });
  }

  const message = await findById(messageId);
  if (!message) {
    return res.sendStatus(404);
  }

  return res.send(message);
});

router.post('/', async (req, res) => {
  const { message, username } = req.body;
  if (!message) {
    return res.status(400).send({ error: 'message cant be null' });
  }

  if (!username) {
    return res.status(400).send({ error: 'username cant be null' });
  }

  return res.send(await addMessage(message, username));
});

router.delete('/:messageId', async (req, res) => {
  const messageId = Number(req.params.messageId);

  if (Number.isNaN(messageId)) {
    return res.status(400).send({ error: 'messageId is not a number' });
  }

  const message = await findById(messageId);
  if (!message) {
    return res.sendStatus(404);
  }

  const isDeleted = await deleteMessage(messageId);

  return res.sendStatus(isDeleted ? 204 : 400);
});

export default router;
