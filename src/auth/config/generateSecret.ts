import { randomBytes } from 'crypto';

const X = randomBytes(64).toString('hex');

console.log(X);
