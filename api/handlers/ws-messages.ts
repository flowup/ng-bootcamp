import {WebsocketRequestHandler} from 'express-ws';
import {generateId, Stream} from '../utilities';
import {Message, NewMessage} from '../types';

export const wsMessages = (
  messages$: Stream<Message>,
): WebsocketRequestHandler => ws => {
  const unsubscribe = messages$.subscribe(message => {
    ws.send(JSON.stringify(message));
  });

  ws.on('message', data => {
    try {
      const message: NewMessage = JSON.parse(data as string);
      messages$.push({...message, id: generateId(), timestamp: Date.now()});
    } catch (e) {}
  });

  ws.on('close', () => {
    unsubscribe();
  });
};
