'use strict';

import { app } from 'egg-mock/bootstrap';
import assert = require('assert');

describe('test/app/service/user.test.js', () => {
  describe('POST /api/users/register', () => {
      it('should work', async () => {
        app.mockCsrf();
        const res = await app.httpRequest().post('/api/users/register').send({
          username: 'Jacky',
          password: '123456',
          passwordConfirmation: '123456',
        });
        assert(res.status === 201);
        assert(res.body.username === 'Jacky');
      });
  })
  describe('POST /api/users/login', () => {
    it('should work', async () => {
      app.mockCsrf();
      const res = await app.httpRequest().post('/api/users/login').send({
        username: 'Jacky',
        password: '123456',
      });
      assert(res.status === 200);
      assert(res.body.username === 'Jacky');
    });
  });
  // describe('GET /users/:id', () => {
  //   it('should work', async () => {
  //     const user = await app.factory.create('user');
  //     const res = await app.httpRequest().get(`/users/${user.id}`);
  //     assert(res.status === 200);
  //     assert(res.body.age === user.age);
  //   });
  // });
  //
  // describe('POST /users', () => {
  //   it('should work', async () => {
  //     app.mockCsrf();
  //     let res = await app.httpRequest().post('/users')
  //       .send({
  //         age: 10,
  //         name: 'name',
  //       });
  //     assert(res.status === 201);
  //     assert(res.body.id);
  //
  //     res = await app.httpRequest().get(`/users/${res.body.id}`);
  //     assert(res.status === 200);
  //     assert(res.body.name === 'name');
  //   });
  // });
  //
  // describe('DELETE /users/:id', () => {
  //   it('should work', async () => {
  //     const user = await app.factory.create('user');
  //
  //     app.mockCsrf();
  //     const res = await app.httpRequest().delete(`/users/${user.id}`);
  //     assert(res.status === 200);
  //   });
  // });
});
