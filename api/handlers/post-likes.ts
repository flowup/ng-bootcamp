import {RequestHandler} from 'express';
import {ApiError, isNewLike, Like, Message} from '../types';
import {addNewId, Stream} from '../utilities';

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

  likes$.push(addNewId(body));
  res.status(204).send();
};
