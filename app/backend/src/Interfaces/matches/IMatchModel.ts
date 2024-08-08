import IMatches from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatches[]>,
  update(id: IMatches['id']): Promise<IMatches | null>,
}
