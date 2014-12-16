CsvCollection = (function() {
  /*
  * config.path - path
  * config.properties - _id, name, etc
  */
  var utils = {
    _convertArrayToJson: function(data) {
      var propertyNames = data[0];
      data = this._checkLastLine(data);
      var i = 1;
      var colls = [];
      for(var line = data[i]; data.length > i; i++, line = data[i]) {
        var j = 0;
        var temp = {};
        for(var prop = line[j]; line.length > j; j++, prop = line[j]) {
          temp[propertyNames[j]] = prop;
        }
        colls.push(temp);
      }
      return colls;
    },
    _checkLastLine: function(data) {
      if(data[data.length - 1][0] == '') {
        data = data.slice(0, data.length - 1);
        return data;
      }
    }
  };
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
      // ...
    }
  };
  CsvCollection.prototype.update = function() {
    throw new Error("Not implemented yet");
  };
  CsvCollection.prototype._getAll = function() {
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
  };

  return CsvCollection;
})();
