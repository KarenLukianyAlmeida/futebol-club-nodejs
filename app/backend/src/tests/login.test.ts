import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { user } from './mocks/user.mock';
import { token, loginWithoutEmail, loginInvalidPasword, login } from './mocks/login.mock';
import jwt from '../utils/jwt';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Login', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return a token when user login', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    sinon.stub(jwt, 'sign').returns(token as any);

    const { email, password } = login;

    const { status, body } = await chai.request(app).post('/login').send({email, password});
    
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({token});
  });

  it('should not return a token when user login without email', async function () {
    const { email, password } = loginWithoutEmail;

    const { status, body } = await chai.request(app).post('/login').send({email, password});

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled'});
  });

  it('should not return a token when user login with invalid password', async function () {
    const { email, password } = loginInvalidPasword;

    const { status, body } = await chai.request(app).post('/login').send({email, password});

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password'});
  });
});