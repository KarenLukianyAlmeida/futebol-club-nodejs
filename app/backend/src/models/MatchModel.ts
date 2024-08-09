import IMatches from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { NewEntity } from '../Interfaces';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [{
        model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
      {
        model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'],
      }],
    });

    return dbData;
  }

  async update(id: IMatches['id']): Promise<IMatches | null> {
    const dbData = await this.model.findOne({ where: { id } });
    if (dbData) {
      await dbData.update({ inProgress: false });
      return dbData;
    }
    return null;
  }

  async updateGoals(id: number, dataGoals: number[]): Promise<IMatches | null> {
    const dbData = await this.model.findOne({ where: { id } });
    if (dbData) {
      await dbData.update({ homeTeamGoals: dataGoals[0], awayTeamGoals: dataGoals[1] });
      return dbData;
    }
    return null;
  }

  async create(data: Partial<NewEntity<IMatches>>): Promise<IMatches | null> {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = data;
    if (
      homeTeamId === undefined
      || awayTeamId === undefined
      || homeTeamGoals === undefined
      || awayTeamGoals === undefined
    ) {
      return null;
    }

    const dbData = await this.model
      .create({ homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true });

    const { id, inProgress }:IMatches = dbData;

    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
