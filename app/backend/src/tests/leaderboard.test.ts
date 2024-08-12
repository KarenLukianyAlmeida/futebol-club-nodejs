import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { allMatches, allTeams, formatedMatches } from './mocks/match.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Leaderboard', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return all matches formated', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);
    sinon.stub(SequelizeTeam, 'findAll').resolves(allTeams as any);

    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(formatedMatches);
  });
});
