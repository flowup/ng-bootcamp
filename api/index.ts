import * as express from 'express';
import * as expressWs from 'express-ws';
import {getPosts} from './handlers/get-posts';
import {getReactions} from './handlers/get-reactions';
import {postPosts} from './handlers/post-posts';
import {postReactions} from './handlers/post-reactions';
import {Stream} from './stream';
import {Post, Reaction} from './types';

const postStream = new Stream<Post>();
const reactionStream = new Stream<Reaction>();

const api = (express() as unknown) as expressWs.Application;
api.use(express.json({type: '*/*'}));
expressWs(api);

api.use((req, _, next) => {
  console.log(`${req.method} ${req.path}\n${JSON.stringify(req.body)}\n`);
  next();
});

api.get('/posts', getPosts(postStream));
api.post('/posts', postPosts(postStream));
api.get('/reactions', getReactions(reactionStream));
api.post('/reactions', postReactions(reactionStream, postStream));

api.listen(8080);
