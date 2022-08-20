import { Request, Response, NextFunction } from 'express';

const middlewareError = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { name, message } = err;

  switch (name) {
    case 'BadRequestError':
      res.status(400).json({ message });
      break;
    case 'UnauthorizedError':
      res.status(401).json({ message });
      break;
    default:
      res.status(500).json({ message });
  }
};

export default middlewareError;
