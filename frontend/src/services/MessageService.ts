import Message from "../typings/Message";

export default class MessageService {
  private static baseUrl = 'http://localhost:8080/messages';

  static async addMessage(username: string, message: string) {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, message })
    })

    return response.ok;
  }

  static async deleteMessage(messageId: number): Promise<boolean> {
    const response = await fetch(`http://localhost:8080/messages/${messageId}`, {
      method: 'DELETE'
    });

    return response.ok;
  }

  static async fetchAll(): Promise<Message[]> {
    const response = await fetch('http://localhost:8080/messages')

    const messages = await response.json();
    return messages;
  }

} 