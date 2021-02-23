'use strict';

import { EggPlugin } from 'egg';

const plugin: EggPlugin = {};

plugin.sequelize = {
  package: 'egg-sequelize',
  enable: true,
};
plugin.jwt = {
  enable: true,
  package: 'egg-jwt',
};
plugin.cors = {
  enable: true,
  package: 'egg-cors',
};

export default plugin;
