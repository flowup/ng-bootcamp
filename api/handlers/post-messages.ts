import {RequestHandler} from 'express';
import {ApiError, isNewMessage, Message} from '../types';
import {addNewId, Stream} from '../utilities';

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

  posts$.push({...addNewId(body), timestamp: Date.now()});
  res.status(204).send();
};
