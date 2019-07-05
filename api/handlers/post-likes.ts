import {RequestHandler} from 'express';
import {generateId, Stream} from '../utilities';
import {ApiError, isNewLike, Message, Like} from '../types';

export const postLikes = (
  likes$: Stream<Like>,
  messages$: Stream<Message>,
): RequestHandler => (req, res) => {
  const {body} = req;

  if (!isNewLike(body)) {
    const error: ApiError = {
      error: `Invalid request body`,
    };
    res.status(400).send(error);
    return;
  }

  if (!messages$.allValues().some(({id}) => id === body.messageId)) {
    const error: ApiError = {
      error: `Post with ID "${body.messageId}" not found`,
    };
    res.status(404).send(error);
    return;
  }

  likes$.push({...body, id: generateId()});
  res.status(204).send();
};
