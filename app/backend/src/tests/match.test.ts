import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { allMatches } from './mocks/match.mock';
import authMiddleware from '../middlewares/auth.middleware';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Matches', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return all matches', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(allMatches);
  });

  it('should return all matches in progress', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);

    const { status, body } = await chai.request(app).get('/matches/?inProgress=true');

    expect(status).to.be.equal(200);
    expect(body).to.have.length(2);
  });

  // it.('should update inProgress atribute to false', async function () {
  //   // sinon.stub(SequelizeMatch, 'findOne').resolves(allMatches[1] as any);
  //   // sinon.stub(SequelizeMatch, 'update').resolves();

  //   const { status, body } = await chai.request(app).patch('/matches/42/finish');

  //   expect(status).to.be.equal(200);
  //   // expect(body).to.be.deep.equal({ message: 'Finished' });
  // });
});
