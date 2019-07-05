import {RequestHandler} from 'express';
import {generateId, Stream} from '../utilities';
import {ApiError, isNewMessage, Message} from '../types';

export const postMessages = (posts$: Stream<Message>): RequestHandler => (
  req,
  res,
) => {
  const {body} = req;

  if (!isNewMessage(body)) {
    const error: ApiError = {
      error: `Invalid request body`,
    };
    res.status(400).send(error);
    return;
  }

  posts$.push({...body, id: generateId(), timestamp: Date.now()});
  res.status(204).send();
};
