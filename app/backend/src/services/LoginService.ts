import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceRespoonse';
import ILogin from '../Interfaces/users/ILogin';
import IToken from '../Interfaces/users/IToken';
import UserModel from '../models/UserModel';
import jwt from '../utils/jwt';
import { validatePassword, validateEmail } from './validations/validationInputValue';
import IUsers from '../Interfaces/users/IUsers';

export default class LoginService {
  constructor(
    private userModel: UserModel = new UserModel(),
  ) { }

  static isEmailOrPasswordValid(login: ILogin, userFound: IUsers | null): boolean {
    const { email, password } = login;

    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
      return false;
    }

    if (!userFound) {
      return false;
    }

    const isPasswordValid = validatePassword(password);

    if (!isPasswordValid) {
      return false;
    }

    return bcrypt.compareSync(password, userFound.password);
  }

  public async verifyLogin(login: ILogin): Promise<ServiceResponse<IToken>> {
    const { email, password } = login;

    if (!password || !email) {
      return { status: 'INVALID_DATA', data: { message: 'All fields must be filled' } };
    }

    const userFound = await this.userModel.findOne(email);

    if (!LoginService.isEmailOrPasswordValid(login, userFound)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const { username } = userFound as IUsers;

    const token = jwt.sign({ username, email });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
