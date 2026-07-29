import test from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import { authorizeAccessToken } from '../shared/authorizeAccessToken.js';

test('authorizeAccessToken allows valid bearer tokens', () => {
  process.env.ACCESS_TOKEN_SECRET_KEY = 'test-secret';
  const token = jwt.sign({ id: 'user-123', role: 'admin' }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '1h',
  });

  const req = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  let nextCalled = false;
  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };

  authorizeAccessToken(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(req.user.id, 'user-123');
  assert.equal(req.user.role, 'admin');
  assert.equal(res.statusCode, null);
});

test('authorizeAccessToken rejects missing or invalid tokens', () => {
  process.env.ACCESS_TOKEN_SECRET_KEY = 'test-secret';
  const req = { headers: {} };

  let nextCalled = false;
  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };

  authorizeAccessToken(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 401);
  assert.match(res.body.message, /token/i);
});
