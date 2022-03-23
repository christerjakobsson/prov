import express from 'express';
import cors from 'cors';

import bodyParser from 'body-parser';
import 'dotenv/config';

import { sequelize, createUsersWithMessages } from './models';
import messageRoutes from './routes/messageRoutes';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.get('/', async (_req, res) => {
  res.send('Pong!');
});

app.use('/messages', messageRoutes);

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
