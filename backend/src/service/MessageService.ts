import models from '../models';

const addMessage = async (text: string, username: string) => {
  const [user] = await models.User.getOrCreate(username);

  return models.Message.create({
    text,
    userId: user.id,
  });
};

const findById = async (messageId: number) => models.Message.findByPk(messageId);

const findAll = async () => models.Message.findAll({ order: [['createdAt', 'DESC']] });

const deleteMessage = async (messageId: number) => models.Message.delete(messageId);

export {
  addMessage, findById, findAll, deleteMessage,
};
