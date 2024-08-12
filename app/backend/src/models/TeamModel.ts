import ITeams from '../Interfaces/teams/ITeams';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;
  private matchModel = SequelizeMatch;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData === null) return null;

    const { teamName }: ITeams = dbData;
    return { id, teamName };
  }
}
