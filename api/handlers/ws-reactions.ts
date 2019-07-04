import {WebsocketRequestHandler} from 'express-ws';
import {generateId, Stream} from '../utilities';
import {Post, Reaction} from '../types';

export const wsReactions = (
  reactions$: Stream<Reaction>,
  posts$: Stream<Post>,
): WebsocketRequestHandler => ws => {
  const unsubscribe = reactions$.subscribe(reaction => {
    ws.send(JSON.stringify(reaction));
  });

  ws.on('message', data => {
    try {
      const reaction: Reaction = JSON.parse(data as string);
      if (posts$.allValues().some(({id}) => id === reaction.postId)) {
        reactions$.push(generateId(reaction));
      }
    } catch (e) {}
  });

  ws.on('close', () => {
    unsubscribe();
  });
};
