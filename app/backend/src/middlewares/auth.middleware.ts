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
    try {
      const decoded = jwt.verify(token);
      const user = await this.userModel.findOne(decoded.email);
      if (user) {
        req.body.user = { decoded };
        return next();
      }
    } catch {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default TokenValidation;
