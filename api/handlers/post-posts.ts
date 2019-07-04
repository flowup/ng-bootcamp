import {RequestHandler} from 'express';
import {generateId, Stream} from '../utilities';
import {ApiError, isPost, Post} from '../types';

export const postPosts = (posts$: Stream<Post>): RequestHandler => (
  req,
  res,
) => {
  const {body} = req;

  if (!isPost(body)) {
    const error: ApiError = {
      error: `Invalid request body`,
    };
    res.status(400).send(error);
    return;
  }

  posts$.push(generateId(body));
  res.status(204).send();
};
