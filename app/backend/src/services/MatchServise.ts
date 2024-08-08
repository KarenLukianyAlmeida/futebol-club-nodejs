import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceRespoonse';
import IMatches from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(private matchModel: MatchModel = new MatchModel()) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
