import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceRespoonse';
import IMatches from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(private matchModel: MatchModel = new MatchModel()) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesByProgress(progress: string):
  Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchModel.findAll();
    const isInProgress = progress === 'true';
    const filteredMatches = allMatches.filter((match) => match.inProgress === isInProgress);

    return { status: 'SUCCESSFUL', data: filteredMatches };
  }

  public async endMatch(id: number): Promise<ServiceResponse<IMatches>> {
    const updatedMatch = await this.matchModel.update(id);

    if (!updatedMatch) {
      return { status: 'NOT_FOUND', data: { message: 'Match not founded' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateGoals(id: number, dataGoals: number[]):
  Promise<ServiceResponse<IMatches>> {
    const updateGoals = await this.matchModel.updateGoals(id, dataGoals);

    if (!updateGoals) {
      return { status: 'NOT_FOUND', data: { message: 'Match not founded' } };
    }

    return { status: 'SUCCESSFUL', data: updateGoals };
  }
}
