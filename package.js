Package.describe({
  name: 'striletskyy:csv-collection',
  summary: 'Manage CSV as Collection',
  version: '0.0.1',
  git: 'https://github.com/JSSolutions/csv-collection.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use([
    'lines-storage',
    'striletskyy:papa-parse',
    'underscore'
  ], 'server');
  api.export('CsvCollection', 'server');
  api.addFiles(['striletskyy:csv-collection.js', 'utils.js', 'writer.js']);
});
