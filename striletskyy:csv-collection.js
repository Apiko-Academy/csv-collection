CsvCollection = (function() {
  /*
  * config.path - path
  * config.properties - _id, name, etc
  */
  function CsvCollection(config) {
    if(config.path && config.properties) {
      this.config = config;
    } else {
      throw new Error("Please, enter all cinfiguration");
    }
  };

  CsvCollection.prototype.add = function() {

  };
  CsvCollection.prototype.remove = function() {

  };
  CsvCollection.prototype.find = function() {

  };
  CsvCollection.prototype.update = function() {
    throw new Error("Not implemented yet");
  };
  return CsvCollection;
})();
