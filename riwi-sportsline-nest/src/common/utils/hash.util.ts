import * as bcrypt from 'bcrypt';

export async function hashString(plain: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(plain, saltRounds);
}

export function compareHash(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
