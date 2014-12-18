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
    throw new Error("Sorry, you have added not compatibility value.");
    LinesStorage.write(path, data);
  },
  saveInFile: function(path, csvStr, isAppend) {
    if(!isAppend) {
      LinesStorage.write(path, csvStr);
    } else {
      writer.appendToFile(path, csvStr);
    }
  }
};
