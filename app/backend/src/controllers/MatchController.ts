import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchServise';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  public async getAllMatches(req: Request, res: Response) {
    const progress = req.query.inProgress as unknown as string | undefined;

    if (progress) {
      const serviceResponse = await this.matchService.getMatchesByProgress(progress);
      const { status, data } = serviceResponse;
      res.status(mapStatusHTTP(status)).json(data);
    }

    const serviceResponse = await this.matchService.getAllMatches();
    const { status, data } = serviceResponse;

    res.status(mapStatusHTTP(status)).json(data);
  }
}
