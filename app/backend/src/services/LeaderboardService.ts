import TeamModel from '../models/TeamModel';
import ILeaderboard from '../Interfaces/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceRespoonse';
import MatchModel from '../models/MatchModel';
import IMatches from '../Interfaces/matches/IMatch';

export default class LeaderboardService {
  constructor(
    private teamModel: TeamModel = new TeamModel(),
    private matcheModel: MatchModel = new MatchModel(),
  ) { }

  private static calculateGoals(teamMatches: IMatches[]): ILeaderboard {
    let goalsFavor = 0;
    let goalsOwn = 0;

    teamMatches.forEach((match) => {
      goalsFavor += match.homeTeamGoals;
      goalsOwn += match.awayTeamGoals;
    });

    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  }

  private static calculateResultsMatches(teamMatches: IMatches[]): ILeaderboard {
    let totalPoints = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    teamMatches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalPoints += 3;
        totalVictories += 1;
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        totalPoints += 1;
        totalDraws += 1;
      } else {
        totalPoints += 0;
        totalLosses += 1;
      }
    });

    return { totalPoints, totalVictories, totalDraws, totalLosses };
  }

  private static test(teamId: number, allMatches: IMatches[]): ILeaderboard {
    const teamMatches = allMatches.filter((team) => team.homeTeamId === teamId);

    const resultsMatches = LeaderboardService.calculateResultsMatches(teamMatches);

    const resultGoals = LeaderboardService.calculateGoals(teamMatches);

    const totalGames = teamMatches.length;

    let efficiency = 0;

    if (resultsMatches.totalPoints) {
      efficiency = Number(((resultsMatches.totalPoints / (totalGames * 3)) * 100).toFixed(2));
    }

    return { ...resultsMatches, totalGames, ...resultGoals, efficiency };
  }

  public async getLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allMatches = await this.matcheModel.findAll();
    const allTeams = await this.teamModel.findAll();

    const leaderboard = allTeams.map((team) => {
      const name = team.teamName;
      const complementarBoardInfo = LeaderboardService.test(team.id, allMatches);

      return { name, ...complementarBoardInfo };
    });

    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
