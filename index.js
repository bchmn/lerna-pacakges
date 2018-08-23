const fs = require('fs');
const path = require('path');
const glob = require('glob');
const get = require('lodash.get');

function lernaPackages ({ configPath = './lerna.json', additionalKeys = [] } = {}) {
  const lernaConfig = require(path.resolve(configPath));
  let packages;
  lernaConfig.packages.forEach(pacakagesGlob => {
    packages = glob.sync(pacakagesGlob).map(pkgPath => {
      const pkgFullPath = path.resolve(pkgPath);
      const pkgJsonPath = path.resolve(pkgPath, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath));

      const pkgInfo = {
        name: get(pkg, 'name'),
        private: get(pkg, 'private', false),
        version: get(pkg, 'version'),
        registry: get(pkg, 'publishConfig.registry'),
        path: pkgFullPath,
      };

      if (additionalKeys.length) {
        additionalKeys.forEach(key => pkgInfo[key] = get(pkg, key));
      }

      return pkgInfo;
    });
  });

  return packages;
}

module.exports = lernaPackages;
