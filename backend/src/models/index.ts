import { DataTypes, Sequelize } from 'sequelize';
import 'dotenv/config';

import getUserModel from './user';
import getMessageModel from './message';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  User: getUserModel(sequelize, { DataTypes }),
  Message: getMessageModel(sequelize, { DataTypes }),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'Christer',
      messages: [
        {
          text: 'Christers första meddelande',
        },
        {
          text: 'Christers andra meddelande',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'Skeletor',
      messages: [
        {
          text: 'Skeletors första meddelande',
        },
        {
          text: 'Skeletors andra meddelande',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};

export { sequelize, createUsersWithMessages };

export default models;
