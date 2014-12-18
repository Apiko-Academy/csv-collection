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
  },
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
      filled.push(this.fillProps(properties, value));
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
      if(!this.isCompatibility(properties, value)) {
        return false;
      }
    }
    return true;
  }
};
