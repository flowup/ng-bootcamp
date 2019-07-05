import {RequestHandler} from 'express';
import {Stream} from '../utilities';
import {ApiError, Message} from '../types';

export const getMessages = (posts$: Stream<Message>): RequestHandler => (
  req,
  res,
) => {
  const {lastId} = req.query;
  const posts = posts$.allValues();

  if (lastId == null) {
    res.send(posts);
    return;
  }

  const lastIndex = posts.findIndex(({id}) => id === lastId);

  if (lastIndex < 0) {
    const error: ApiError = {
      error: `Post with ID "${lastId}" not found`,
    };
    res.status(404).send(error);
    return;
  }

  res.send(posts.slice(lastIndex + 1));
};
