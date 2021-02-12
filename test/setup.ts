'use strict';

// import { app } from 'egg-mock/bootstrap';

before(() => {
  // defined app.factory for build test data
});

after(async () => {
  // clear database after each test case
  await Promise.all([
    // app.model.User.destroy({ truncate: true, force: true }),
  ]);
});
