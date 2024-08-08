import IUsers from '../Interfaces/users/IUsers';
import SequelizeUser from '../database/models/SequelizeUser';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findOne(email: IUsers['email']): Promise<IUsers | null> {
    const dbData = await this.model.findOne({ where: { email } });
    if (dbData === null) return null;

    const { id, username, role, password }: IUsers = dbData;
    return { id, username, email, role, password };
  }
}
