CsvCollection = (function() {
  /*
  * config.path - path
  * config.properties - _id, name, etc
  */
  var _private = {
    fillProps: function(properties, value) {
      var i = 0;
      for(var prop = properties[i]; i < properties.length; i++, prop = properties[i]) {
        if(!value.hasOwnProperty(prop)) {
          value[prop] = '';
        }
      }
      return value;
    },
    fillAllProps: function(properties, values) {
      var i = 0;
      var filled = [];
      for(var value = values[i]; values.length > i; i++, value = values[i]) {
        filled.push(_private.fillProps(properties, value));
      }
      return filled;
    },
    isCompatibility: function(properties, value) {
      if(Object.keys(value).length <= properties.length) {
        for(var el in value) {
          if(!_.contains(properties, el)) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    },
    isAllCompatibility: function(properties, values) {
      var i = 0;
      for(var value = values[i]; values.length > i; i++, value = values[i]) {
        if(!_private.isCompatibility(properties, value)) {
          return false;
        }
      }
      return true;
    }
  };
  function CsvCollection(config) {
    if(config.path && config.properties) {
      this.config = config;
    } else {
      throw new Error("Please, enter all configuration");
    }
  };

  CsvCollection.prototype.add = function(values) {
    if(Array.isArray(values)) {
      this._addArray(values)
    } else {
      this._addOne(values);
    }
  };
  CsvCollection.prototype.remove = function() {
    throw new Error("Not implemented yet");
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
    _addArray: function(values) {
      if(_private.isAllCompatibility(this.config.properties, values)) {
        values = _private.fillAllProps(this.config.properties, values);
        var csvStr = Papa.unparse(values);
        LinesStorage.write(this.config.path, csvStr);
      } else {
        throw new Error("Sorry, you have added not compatibility value.");
      }
    },
    _addOne: function(value) {
      if(_private.isCompatibility(this.config.properties, value)) {
        value = _private.fillProps(this.config.properties, value);
        var csvStr = Papa.unparse([value]);
        LinesStorage.write(this.config.path, csvStr);
      } else {
        throw new Error("Sorry, you have added not compatibility value.");
      }
    },
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
