var _private = {
  deleteHeader: function(data) {
    var index = data.indexOf("\n");
    return data.slice(index + 1);
  }
};
writer = {
  addToFile: function(path, data) {
    if(LinesStorage.isExist(path)) {
      data = _private.deleteHeader(data);
      data = "\r\n" + data;
    }
    LinesStorage.write(path, data);
  }
};
