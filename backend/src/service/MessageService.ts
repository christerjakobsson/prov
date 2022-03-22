import models from '../models';

const addMessage = async (text: string, username: string) => {
  const [user] = await this.user.getOrCreate(username);
  return this.message.create({
    text,
    userId: user.id,
  });
};

const findById = async (messageId: number) => models.Message.findByPk(messageId);

const findAll = async () => models.Message.findAll();

export { addMessage, findById, findAll };
