export interface Message {
  id: string;
  timestamp: number;
  author: {
    name: string;
    color: string;
  };
  text: string;
}

export type NewMessage = Pick<Message, 'author' | 'text'>;

export interface Like {
  id: string;
  messageId: string;
}

export type NewLike = Pick<Like, 'messageId'>;

export interface ApiError {
  error: string;
}

export function isNewMessage(message: unknown): message is NewMessage {
  return (
    typeof message === 'object' &&
    message !== null &&
    message.hasOwnProperty('author') &&
    message.hasOwnProperty('text')
  );
}

export function isNewLike(like: unknown): like is NewLike {
  return (
    typeof like === 'object' &&
    like !== null &&
    like.hasOwnProperty('messageId')
  );
}
