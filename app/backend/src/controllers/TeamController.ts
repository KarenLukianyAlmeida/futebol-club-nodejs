import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import LeaderService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
    private leaderboardService = new LeaderService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAllTeams();
    res.status(200).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamService.getTeamById(Number(id));
    const { status, data } = serviceResponse;

    res.status(mapStatusHTTP(status)).json(data);
  }
}
