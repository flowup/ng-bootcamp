import {WebsocketRequestHandler} from 'express-ws';
import {Like, Message, NewLike} from '../types';
import {addNewId, Stream} from '../utilities';

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
        likes$.push(addNewId(like));
      }
    } catch (e) {}
  });

  ws.on('close', () => {
    unsubscribe();
  });
};
