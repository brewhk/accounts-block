Package.describe({
  name: 'brewhk:accounts-block',
  version: '0.0.1',
  summary: 'Provide methods to (un)block users, as well as hooks and utility functions.',
  git: 'https://github.com/brewhk/accounts-block.git',
  documentation: 'README.md'
});

Npm.depends({
  "lodash.pull": "4.0.1",
  "lodash.pullall": "4.1.1",
})

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.use('aldeed:simple-schema@1.5.3');
  api.use('mongo');
  api.mainModule('client/index.js', 'client');
  api.mainModule('server/index.js', 'server');
});
