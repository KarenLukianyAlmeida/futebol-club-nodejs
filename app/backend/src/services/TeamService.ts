import { ServiceResponse } from '../Interfaces/ServiceRespoonse';
import ITeams from '../Interfaces/teams/ITeams';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: TeamModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
