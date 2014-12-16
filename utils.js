utils = {
  _convertArrayToJson: function(data) {
    var propertyNames = data[0];
    data = this._checkLastLine(data);
    var i = 1;
    var cols = [];
    for(var line = data[i]; data.length > i; i++, line = data[i]) {
      var j = 0;
      var temp = {};
      for(var prop = line[j]; line.length > j; j++, prop = line[j]) {
        temp[propertyNames[j]] = prop;
      }
      cols.push(temp);
    }
    return cols;
  },
  _checkLastLine: function(data) {
    var control = data[data.length - 1][0] == '';
    if(control) {
      data = data.slice(0, data.length - 1);
      return data;
    } else {
      return data;
    }
  }
};
