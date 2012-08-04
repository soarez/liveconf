var fs = require('fs')
var should = require('should')
var _ = require('lodash')

var liveconf = require('./../lib/liveconf')

var FILE_NAME = __dirname + '/config.json'
var initialConfig = {
  a: 2,
  b: 'foo'
}
var config;

describe('liveconf', function () {

  before(function() {
    fs.writeFileSync(FILE_NAME, JSON.stringify(initialConfig))
  })

  it('should export a function', function() {
    liveconf.should.be.a('function')
  })

  it('should provide an object with the configuration values', function() {

    config = liveconf(FILE_NAME)

    return _
    .chain(initialConfig)
    .keys()
    .all(function(k){ 
      return initialConfig[k] === config[k]
    })
    .value()
  })

  it('should update the given object when the configuration changes', function(done) {

    config = liveconf(FILE_NAME)
    var newConfig = { b:'bar', c:42 }

    setTimeout(function() {
      fs.writeFileSync(FILE_NAME, JSON.stringify(newConfig))
    }, 50);

    setTimeout(function() {

      _.chain(newConfig)
      .keys()
      .all(function(k){ 
        return config[k] === newConfig[k]
      })
      .value().should.be.true
      
      _.keys(config).length.should.equal(_.keys(newConfig).length)

      done()
    }, 100)
  })

  it('should cache the configuration objects', function() {
    liveconf(FILE_NAME).should.equal(liveconf(FILE_NAME))
  })
})