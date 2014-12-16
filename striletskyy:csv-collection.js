CsvCollection = (function() {
  /*
  * config.path - path
  * config.properties - _id, name, etc
  */
  function CsvCollection(config) {
    if(config.path && config.properties) {
      this.config = config;
    } else {
      throw new Error("Please, enter all configuration");
    }
  };

  CsvCollection.prototype.add = function() {

  };
  CsvCollection.prototype.remove = function() {

  };
  CsvCollection.prototype.find = function(filter) {
    if(!filter) {
      return this._getAll();
    } else {
      var values = this._getAll();
      return this._filter(filter, values);
    }
  };
  CsvCollection.prototype.update = function() {
    throw new Error("Not implemented yet");
  };
  _.extend(CsvCollection.prototype, {
    _getAll: function() {
      var lines = LinesStorage.read(this.config.path);
      var data = Papa.parse(lines, {
        delimiter: "",	// auto-detect
        newline: "",	// auto-detect
        header: false,
        dynamicTyping: false,
        preview: 0,
        encoding: "",
        worker: false,
        comments: false,
        step: undefined,
        complete: undefined,
        error: undefined,
        download: false,
        skipEmptyLines: false,
        chunk: undefined,
        fastMode: false
      }).data;

      return utils._convertArrayToJson(data);
    },
    _filter: function(filter, values) {
      var i = 0;
      var cols = [];
      for(var value = values[i]; values.length > i; i++, value = values[i]) {
        var control = true;
        for(var prop in filter) {
          if(value[prop] && filter[prop] != value[prop]) {
            control = false;
          }
        }
        if(control) {
          cols.push(value);
        }
      }
      if(cols.length == 1) {
        return cols[0];
      } else {
        return cols;
      }
    }
  });
  return CsvCollection;
})();
