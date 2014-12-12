Package.describe({
  name: 'striletskyy:csv-collection',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('striletskyy:csv-collection.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('striletskyy:csv-collection');
  api.addFiles('striletskyy:csv-collection-tests.js');
});
