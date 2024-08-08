import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { allMatches } from './mocks/match.mock';

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

  it.only('should return all matches in progress', async function () {
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);

    const { status, body } = await chai.request(app).get('/matches/?inProgress=true');

    expect(status).to.be.equal(200);
    expect(body).to.have.length(2);
  });
});
