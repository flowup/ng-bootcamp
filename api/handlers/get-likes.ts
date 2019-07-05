import {RequestHandler} from 'express';
import {Stream} from '../utilities';
import {ApiError, Like} from '../types';

export const getLikes = (likes$: Stream<Like>): RequestHandler => (
  req,
  res,
) => {
  const {lastId} = req.query;
  const likes = likes$.allValues();

  if (lastId == null) {
    res.send(likes);
    return;
  }

  const lastIndex = likes.findIndex(({id}) => id === lastId);

  if (lastIndex < 0) {
    const error: ApiError = {
      error: `Reaction with ID "${lastId}" not found`,
    };
    res.status(404).send(error);
    return;
  }

  res.send(likes.slice(lastIndex + 1));
};
