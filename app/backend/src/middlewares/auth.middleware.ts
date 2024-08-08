import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/jwt';
import UserModel from '../models/UserModel';

class TokenValidation {
  constructor(
    private userModel = new UserModel(),
  ) { }

  public async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorization.split(' ')[1];
    // console.log({ token });
    try {
      const decoded = jwt.verify(token);
      // console.log({ decoded });
      const user = await this.userModel.findOne(decoded.email);
      // console.log({ user });
      if (user) {
        // console.log('HOLA');
        req.body.user = { decoded };
        return next();
      }
      return res.status(402).json('kjkj');
    } catch {
      // console.log(err);
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default TokenValidation;
