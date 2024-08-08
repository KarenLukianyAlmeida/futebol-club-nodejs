import IMatches from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatches[]>,
}
