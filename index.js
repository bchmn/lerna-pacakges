const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const get = require('lodash.get');

function lernaPackages({ rootDir, additionalKeys = [] } = {}) {
  let currentDir;
  if (rootDir) {
    currentDir = __dirname;
    process.chdir(path.resolve(rootDir));
  }

  if (!fs.existsSync('lerna.json')) {
    console.error(`Error: ${process.cwd()}${path.sep}lerna.json does not exist!`)
    process.exit(1);
  }
  const lernaListCmd = 'npx lerna ll --json';
  const lernaPackages = JSON.parse(execSync(lernaListCmd));

  const packages = lernaPackages.map(lernaPkg => {
    const pkgFullPath = path.resolve(lernaPkg.location);
    const pkgJsonPath = path.resolve(pkgFullPath, 'package.json');
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

  if (currentDir) {
    process.chdir(currentDir);
  }

  return packages;
}

module.exports = lernaPackages;
