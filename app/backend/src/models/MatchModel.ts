import IMatches from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

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
}
