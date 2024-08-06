import IUsers from './IUsers';

export interface IUserModel {
  findOne(username: IUsers['username']): Promise<IUsers | null>,
}
