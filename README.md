## Stack Overflow RSS

### Install

    npm install liveconf

### Use

Have a configuration file with some configuration. e.g. `config.json`

```json
{
   "a":8,
   "b":"foo"
}
```

```javascript
var liveconf = require('liveconf');

// get the configuration from a file
var config = liveconf('config.json');

console.log(config.b); // foo 
```

The configuration object will be cached and will always be the same for the same configuration file. The configuration file is watched so any changes are reflected on the object.

While the code is running you can change the configuration.

```json
{
   "b":"bar",
   "c":42
}
```

```javascript
console.log(config.b); // bar
```

### License

MIT