const getMessageModel = (sequelize, { DataTypes }) => {
  const Message = sequelize.define('message', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Message.associate = (_models) => {
    Message.belongsTo(_models.User);
  };

  Message.delete = (messageId) => Message.destroy({ where: { id: messageId } });

  return Message;
};

export default getMessageModel;
