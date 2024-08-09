import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceRespoonse';
import IMatches from '../Interfaces/matches/IMatch';
import { NewEntity } from '../Interfaces';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchService {
  constructor(private matchModel: MatchModel = new MatchModel()) { }

  private static async verifyTeams(teamsId: number[]): Promise<boolean> {
    const teamPromises = teamsId.map((id) => SequelizeTeam.findByPk(id));
    const teams = await Promise.all(teamPromises);

    return teams.every((team) => team !== null);
  }

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

  public async createMatch(data: Partial<NewEntity<IMatches>>): Promise<ServiceResponse<IMatches>> {
    const { homeTeamId, awayTeamId } = data;

    if (Number(homeTeamId) === Number(awayTeamId)) {
      return {
        status: 'UNPROCESSABLE',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const areTeamsInDatabase = await MatchService
      .verifyTeams([Number(homeTeamId), Number(awayTeamId)]);

    if (!areTeamsInDatabase) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' } };
    }

    const createdMatch = await this.matchModel.create(data);
    if (!createdMatch) {
      return { status: 'INVALID_DATA', data: { message: 'Missing required data' } };
    }

    return { status: 'CREATED', data: createdMatch };
  }
}
