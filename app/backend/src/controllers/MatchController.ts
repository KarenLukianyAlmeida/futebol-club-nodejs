import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchServise';
import IMatches from '../Interfaces/matches/IMatch';
import { NewEntity } from '../Interfaces';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  public async getAllMatches(req: Request, res: Response) {
    const progress = req.query.inProgress as unknown as string | undefined;

    if (progress) {
      const serviceResponse = await this.matchService.getMatchesByProgress(progress);
      const { status, data } = serviceResponse;
      return res.status(mapStatusHTTP(status)).json(data);
    }

    const serviceResponse = await this.matchService.getAllMatches();
    const { status, data } = serviceResponse;

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async endMatch(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchService.endMatch(Number(id));
    const { status, data } = serviceResponse;

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const dataGoals = [homeTeamGoals, awayTeamGoals];

    const serviceResponse = await this.matchService.updateGoals(Number(id), dataGoals);
    const { status, data } = serviceResponse;

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
    const matchData: Partial<NewEntity<IMatches>> = {
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals,
    };

    const serviceResponse = await this.matchService.createMatch(matchData);
    const { status, data } = serviceResponse;
    console.log({ status });
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
