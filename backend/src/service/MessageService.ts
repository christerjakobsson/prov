import Message from '../typings/message';

export default class MessageService {
  static addMessage(message: Message) {
    this.messages.push(message);
    return message;
  }

  static getById(messageId: number): Message {
    return this.messages.find((message) => message.id === messageId);
  }

  static messages: Message[] = [
    {
      id: 1,
      userId: 1,
      message: 'Hej hej!',
    },
    {
      id: 2,
      userId: 2,
      message: 'Detta är ett meddelande',
    },
  ];

  static getMessages(): Message[] {
    return this.messages;
  }
}
