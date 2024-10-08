import TeamModel from '../models/TeamModel';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceRespoonse';
import MatchModel from '../models/MatchModel';
import IMatches from '../Interfaces/matches/IMatch';

export default class LeaderboardService {
  constructor(
    private teamModel: TeamModel = new TeamModel(),
    private matcheModel: MatchModel = new MatchModel(),
  ) { }

  private static calculateGoals(teamMatches: IMatches[]) {
    let goalsFavor = 0;
    let goalsOwn = 0;

    teamMatches.forEach((match) => {
      goalsFavor += match.homeTeamGoals;
      goalsOwn += match.awayTeamGoals;
    });

    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  }

  private static calculateResultsMatches(teamMatches: IMatches[]) {
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
        totalLosses += 1;
      }
    });

    return { totalPoints, totalVictories, totalDraws, totalLosses };
  }

  private static generateHomeBoard(teamId: number, allMatches: IMatches[]): ILeaderboard {
    const teamMatches = allMatches.filter((t) => t.homeTeamId === teamId && t.inProgress === false);

    const { totalPoints, totalVictories,
      totalDraws, totalLosses } = LeaderboardService.calculateResultsMatches(teamMatches);

    const resultGoals = LeaderboardService.calculateGoals(teamMatches);

    const totalGames = teamMatches.length;

    let efficiency = '';

    if (totalPoints) {
      efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    }

    return {
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      ...resultGoals,
      efficiency,
    };
  }

  private static sortMatches(leaderboard: ILeaderboard[]): ILeaderboard[] {
    return leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;

      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;

      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;

      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;

      return 0;
    });
  }

  public async getLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allMatches = await this.matcheModel.findAll();
    const allTeams = await this.teamModel.findAll();

    const leaderboard = allTeams.map((team) => {
      const name = team.teamName;

      const complementarBoardInfo = LeaderboardService.generateHomeBoard(team.id, allMatches);

      const formatedMatches = { name, ...complementarBoardInfo };

      return formatedMatches;
    });

    const sortedMatches = LeaderboardService.sortMatches(leaderboard);

    return { status: 'SUCCESSFUL', data: sortedMatches };
  }
}
