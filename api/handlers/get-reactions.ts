import {RequestHandler} from 'express';
import {Stream} from '../stream';
import {ApiError, Reaction} from '../types';

export const getReactions = (reactions$: Stream<Reaction>): RequestHandler => (
  req,
  res,
) => {
  const {lastId} = req.query;
  const reactions = reactions$.allValues();

  if (lastId == null) {
    res.send(reactions);
    return;
  }

  const lastIndex = reactions.findIndex(lastId);

  if (lastIndex < 0) {
    const error: ApiError = {
      error: `Reaction with ID "${lastId}" not found`,
    };
    res.status(404).send(error);
    return;
  }

  res.send(reactions.slice(lastIndex));
};
