import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import messageRoutes from './routes/messageRoutes';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use((_req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

app.get('/', async (_req, res) => {
  res.send('Pong!');
});

app.use('/messages', messageRoutes);

/*
import { sequelize, createUsersWithMessages } from './models';
const eraseDatabaseOnSync = true;
sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }
});
*/

const server = app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${process.env.PORT}!`);
});

export default { app, server };
