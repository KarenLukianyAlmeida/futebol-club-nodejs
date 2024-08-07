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
      const decoded = await jwt.verify(token);
      console.log('decoded auth.  ', decoded.email);
      const user = await this.userModel.findOne(decoded.email);
      if (!user) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }

      req.body.user = { decoded };
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}

export default TokenValidation;
