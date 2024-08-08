import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchServise';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  public async getAllMatches(_req: Request, res: Response) {
    const serviceResponse = await this.matchService.getAllMatches();
    const { status, data } = serviceResponse;

    res.status(mapStatusHTTP(status)).json(data);
  }
}
