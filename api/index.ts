import * as express from 'express';
import * as expressWs from 'express-ws';
import * as cors from 'cors';
import {getPosts} from './handlers/get-posts';
import {getReactions} from './handlers/get-reactions';
import {postPosts} from './handlers/post-posts';
import {postReactions} from './handlers/post-reactions';
import {wsPosts} from './handlers/ws-posts';
import {wsReactions} from './handlers/ws-reactions';
import {logger} from './middlewares/logger';
import {Stream} from './utilities';
import {Post, Reaction} from './types';

const posts$ = new Stream<Post>();
const reactions$ = new Stream<Reaction>();

const api = (express() as unknown) as expressWs.Application;
expressWs(api);

api.use(express.json({type: '*/*'}));
api.use(cors());
api.use(logger);

api.ws('/posts/stream', wsPosts(posts$));
api.get('/posts', getPosts(posts$));
api.post('/posts', postPosts(posts$));

api.ws('/reactions/stream', wsReactions(reactions$, posts$));
api.get('/reactions', getReactions(reactions$));
api.post('/reactions', postReactions(reactions$, posts$));

api.listen(8080);
