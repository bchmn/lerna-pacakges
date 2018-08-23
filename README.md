# Lerna Packages

Get basic information about all your lerna packages.

## Usage

```
npm i lerna-packages
```

```javascript
const lernaPackages = require('lerna-packages');
const allPackages = lernaPackages();
```

## lernaPackages({ options })

Returns an array of objects with the following data structure:
```javascript
{ 
  name: String,
  private: Boolean,
  version: String,
  registry: String,
  path: String  
}
```

### Options
* `configPath` The path to your `lerna.json`.  Defaults
  to `./lerna.json`.
* `additionalKeys` An array of additional keys to pull from the modules package.json. Defaults to `[]`.
