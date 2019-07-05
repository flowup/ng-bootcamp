import {WebsocketRequestHandler} from 'express-ws';
import {generateId, Stream} from '../utilities';
import {Message, Like, NewLike} from '../types';

export const wsLikes = (
  likes$: Stream<Like>,
  messages$: Stream<Message>,
): WebsocketRequestHandler => ws => {
  const unsubscribe = likes$.subscribe(like => {
    ws.send(JSON.stringify(like));
  });

  ws.on('message', data => {
    try {
      const like: NewLike = JSON.parse(data as string);
      if (messages$.allValues().some(({id}) => id === like.messageId)) {
        likes$.push({...like, id: generateId()});
      }
    } catch (e) {}
  });

  ws.on('close', () => {
    unsubscribe();
  });
};
