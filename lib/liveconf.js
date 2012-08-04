var fs = require('fs');
var path = require('path');
var cache = {};

module.exports = exports = function(configFileName) {
  
  var filePath = path.resolve(configFileName);

  if (cache[filePath]) {
    return cache[filePath];
  }

  var config = JSON.parse(fs.readFileSync(filePath));
  cache[filePath] = config;

  fs.watch(filePath, { persistent: false }, function (event) {
    
    if (event != 'change') {
      return;
    }
    
    fs.readFile(filePath, function(err, data) {

      if (err) {
        return;
      }

      var newConfig;

      try {
        newConfig = JSON.parse(data);
      } catch (e) {
        return;
      }

      var key;
      for(key in config) {
        if (!newConfig.hasOwnProperty(key))
          delete config[key];
      }

      for(key in newConfig) {
        config[key] = newConfig[key];
      }
    });
  });

  return config;
};