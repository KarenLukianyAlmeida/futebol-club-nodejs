import ITeams from '../Interfaces/teams/ITeams';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }
}
