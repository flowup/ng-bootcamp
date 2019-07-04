import {WebsocketRequestHandler} from 'express-ws';
import {generateId, Stream} from '../utilities';
import {Post} from '../types';

export const wsPosts = (
  posts$: Stream<Post>,
): WebsocketRequestHandler => ws => {
  const unsubscribe = posts$.subscribe(post => {
    ws.send(JSON.stringify(post));
  });

  ws.on('message', data => {
    try {
      const post: Post = JSON.parse(data as string);
      posts$.push(generateId(post));
    } catch (e) {}
  });

  ws.on('close', () => {
    unsubscribe();
  });
};
