import { Model, QueryInterface, DataTypes } from 'sequelize';
import IMatches from '../../Interfaces/matches/IMatch';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatches>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      inProgress: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  }
}