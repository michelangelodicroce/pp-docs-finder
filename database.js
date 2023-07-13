import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

export const db = readdirSync('data').reduce((accumulator, fileName) => {
  const file = readFileSync(join('data', fileName), 'utf8');
  const records = JSON.parse(file)

  return [...accumulator, ...records]
}, [])
