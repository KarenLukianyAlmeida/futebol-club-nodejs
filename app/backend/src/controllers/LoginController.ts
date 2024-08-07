import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService = new LoginService()) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.loginService.verifyLogin({ email, password });

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public static getRole(req: Request, res: Response) {
    const { role } = req.body.user.decoded;

    return res.status(200).json({ role });
  }
}
