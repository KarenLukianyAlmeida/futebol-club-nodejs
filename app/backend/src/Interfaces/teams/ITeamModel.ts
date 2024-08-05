import ITeams from './ITeams';

export interface ITeamModel {
  findAll(): Promise<ITeams[]>,
}
