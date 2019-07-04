import {RequestHandler} from 'express';
import {generateId, Stream} from '../utilities';
import {ApiError, isReaction, Post, Reaction} from '../types';

export const postReactions = (
  reactions$: Stream<Reaction>,
  posts$: Stream<Post>,
): RequestHandler => (req, res) => {
  const {body} = req;

  if (!isReaction(body)) {
    const error: ApiError = {
      error: `Invalid request body`,
    };
    res.status(400).send(error);
    return;
  }

  if (!posts$.allValues().some(({id}) => id === body.postId)) {
    const error: ApiError = {
      error: `Post with ID "${body.postId}" not found`,
    };
    res.status(404).send(error);
    return;
  }

  reactions$.push(generateId(body));
  res.status(204).send();
};
