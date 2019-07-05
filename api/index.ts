import * as express from 'express';
import * as expressWs from 'express-ws';
import * as cors from 'cors';
import {getMessages} from './handlers/get-messages';
import {getLikes} from './handlers/get-likes';
import {postMessages} from './handlers/post-messages';
import {postLikes} from './handlers/post-likes';
import {wsMessages} from './handlers/ws-messages';
import {wsLikes} from './handlers/ws-likes';
import {logger} from './middlewares/logger';
import {Stream} from './utilities';
import {Message, Like} from './types';

const messages$ = new Stream<Message>();
const likes$ = new Stream<Like>();

const api = (express() as unknown) as expressWs.Application;
expressWs(api);

api.use(express.json({type: '*/*'}));
api.use(cors());
api.use(logger);

api.ws('/messages/stream', wsMessages(messages$));
api.get('/messages', getMessages(messages$));
api.post('/messages', postMessages(messages$));

api.ws('/likes/stream', wsLikes(likes$, messages$));
api.get('/likes', getLikes(likes$));
api.post('/likes', postLikes(likes$, messages$));

api.listen(8080);
