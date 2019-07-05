export interface NewMessage {
  author: {
    name: string;
    color: string;
  };
  text: string;
}

export interface Message extends NewMessage {
  id: string;
  timestamp: number;
}

export interface NewLike {
  messageId: string;
}

export interface Like extends NewLike {
  id: string;
}

export interface ApiError {
  error: string;
}

// TODO: make these more robust

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
