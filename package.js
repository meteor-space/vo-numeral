
Package.describe({
  summary: 'Value Objects for numeral domains.',
  name: 'space:vo-numeral',
  version: '0.1.0',
});

Package.onUse(function(api) {

  api.versionsFrom('METEOR@1.0');

  api.use([
    'check',
    'space:messaging@1.6.0'
  ]);

  api.add_files([
    'source/quantity.js',
  ]);

  api.export('Quantity');

});

Package.onTest(function(api) {

  api.use([
    'check',
    'space:vo-numeral',
    'practicalmeteor:munit@2.1.5',
    'space:testing@1.3.0',
  ]);

  api.add_files([
    'tests/quantity.unit.js',
  ]);

});
