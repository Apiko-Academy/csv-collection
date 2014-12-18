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
  CsvCollection.prototype.insert = function(values) {
    if(Array.isArray(values)) {
      this._addArray(values, false);
    } else {
      this._addOne(values, false);
    }
  };
  CsvCollection.prototype.remove = function() {
    throw new Error("Not implemented yet");
  };
  CsvCollection.prototype.update = function() {
    throw new Error("Not implemented yet");
  };
  CsvCollection.prototype.add = function(values) {
    if(Array.isArray(values)) {
      this._addArray(values, true);
    } else {
      this._addOne(values, true);
    }
  };
  CsvCollection.prototype.find = function(filter) {
    if(!filter) {
      return this._getAll();
    } else {
      var values = this._getAll();
      return this._filter(filter, values);
    }
  };
  _.extend(CsvCollection.prototype, {
    _addArray: function(values, isAppend) {
      if(utils.isAllCompatibility(this.config.properties, values)) {
        values = utils.fillAllProps(this.config.properties, values);
        var csvStr = Papa.unparse(values);
        writer.saveInFile(this.config.path, csvStr, isAppend);
      } else {
        throw new Error("Sorry, you have added not compatibility value.");
      }
    },
    _addOne: function(value, isAppend) {
      if(utils.isCompatibility(this.config.properties, value)) {
        value = utils.fillProps(this.config.properties, value);
        var csvStr = Papa.unparse([value]);
        writer.saveInFile(this.config.path, csvStr, isAppend);
      } else {
        throw new Error("Sorry, you have added not compatibility value.");
      }
    },
    _getAll: function() {
      var lines = LinesStorage.read(this.config.path);
      var data = Papa.parse(lines, {
        delimiter: "",	// auto-detect
        newline: "\r\n",	// auto-detect
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
