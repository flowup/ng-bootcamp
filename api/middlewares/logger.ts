import {RequestHandler} from 'express';

export const logger: RequestHandler = (req, _, next) => {
  console.log(`${req.method} ${req.path}\n${JSON.stringify(req.body)}\n`);
  next();
};
