import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

import { sequelize, createUsersWithMessages } from './models';
import { findAll, findById, addMessage } from './service/MessageService';

const app = express();
app.use(bodyParser.json());

app.get('/messages', async (_req, res) => {
  res.send(await findAll());
});

app.get('/messages/:messageId', async (_req, res) => {
  // TODO handle if not a number
  const messageId = Number(_req.params.messageId);
  res.send(await findById(messageId));
});

app.post('/messages', async (req, res) => {
  const { text, username } = req.body;
  const message = await addMessage(text, username);
  res.send(message);
});

const eraseDatabaseOnSync = true;
sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});
