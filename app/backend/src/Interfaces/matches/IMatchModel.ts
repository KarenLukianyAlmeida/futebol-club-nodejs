import { NewEntity } from '..';
import IMatches from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatches[]>,
  update(id: IMatches['id']): Promise<IMatches | null>,
  updateGoals(id: IMatches['id'], dataGoals: number[]): Promise<IMatches | null>,
  create(data: Partial<NewEntity<IMatches>>): Promise<IMatches | null>
}
