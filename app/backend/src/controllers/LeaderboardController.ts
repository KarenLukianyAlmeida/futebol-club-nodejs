import { Request, Response } from 'express';
import LeaderService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private leaderboardService = new LeaderService(),
  ) { }

  public async getLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboard();
    const { status, data } = serviceResponse;

    res.status(mapStatusHTTP(status)).json(data);
  }
}
