import {RequestHandler} from 'express';
import {Stream} from '../stream';
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

  posts$.push({
    ...body,
    id: Math.random()
      .toString(26)
      .substr(2),
  });

  res.status(201).send(body);
};
