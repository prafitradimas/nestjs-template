import * as fs from 'fs';
import * as path from 'path';

export function getAppRootPath(): string {
  let dirname = __dirname;
  while (!fs.existsSync(path.join(dirname, 'package.json'))) {
    dirname = path.join(dirname, '..');
  }

  return dirname;
}
