// import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceRespoonse';
import ILogin from '../Interfaces/users/ILogin';
import IToken from '../Interfaces/users/IToken';
import UserModel from '../models/UserModel';
import jwt from '../utils/jwt';

export default class LoginService {
  constructor(
    private userModel: UserModel = new UserModel(),
  ) { }

  public async verifyLogin(login: ILogin): Promise<ServiceResponse<IToken>> {
    if (!login.password || !login.email) {
      return { status: 'INVALID_DATA', data: { message: 'All fields must be filled' } };
    }

    const userfound = await this.userModel.findOne(login.email);
    // if (!userfound || !bcrypt.compareSync(login.password, userfound.password)) {
    //   return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    // }
    if (!userfound) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }

    const { email, username } = userfound;

    const token = jwt.sign({ username, email });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
