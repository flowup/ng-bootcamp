import {WebsocketRequestHandler} from 'express-ws';
import {Message, NewMessage} from '../types';
import {addNewId, Stream} from '../utilities';

export const wsMessages = (
  messages$: Stream<Message>,
): WebsocketRequestHandler => ws => {
  const unsubscribe = messages$.subscribe(message => {
    ws.send(JSON.stringify(message));
  });

  ws.on('message', data => {
    try {
      const message: NewMessage = JSON.parse(data as string);
      messages$.push({...addNewId(message), timestamp: Date.now()});
    } catch (e) {}
  });

  ws.on('close', () => {
    unsubscribe();
  });
};
