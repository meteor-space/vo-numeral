
Package.describe({
  name: 'space:vo-numeral',
  summary: 'Value Objects for numeral domains.',
  version: '0.1.0',
  git: 'https://github.com/meteor-space/vo-numeral.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {

  api.versionsFrom('1.2.0.1');

  api.use([
    'check',
    'ecmascript',
    'space:domain@0.1.0'
  ]);

  api.add_files([
    'source/quantity.js'
  ]);

  api.export('Quantity');

});

Package.onTest(function(api) {

  api.use([
    'check',
    'ejson',
    'ecmascript',
    'space:vo-numeral',
    'practicalmeteor:munit@2.1.5',
    'space:testing@3.0.1',
    'space:testing-messaging@3.0.0'
  ]);

  api.add_files([
    'tests/quantity.unit.js'
  ]);

});
