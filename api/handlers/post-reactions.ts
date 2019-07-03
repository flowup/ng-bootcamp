import {RequestHandler} from 'express';
import {Stream} from '../stream';
import {ApiError, isReaction, Post, Reaction} from '../types';

export const postReactions = (
  reactionStream: Stream<Reaction>,
  postStream: Stream<Post>,
): RequestHandler => (req, res) => {
  const {body} = req;

  if (!isReaction(body)) {
    const error: ApiError = {
      error: `Invalid request body`,
    };
    res.status(400).send(error);
    return;
  }

  if (!postStream.allValues().some(({id}) => id === body.postId)) {
    const error: ApiError = {
      error: `Post with ID "${body.postId}" not found`,
    };
    res.status(404).send(error);
    return;
  }

  reactionStream.push({
    ...body,
    id: Math.random()
      .toString(26)
      .substr(2),
  });

  res.status(201).send(body);
};
