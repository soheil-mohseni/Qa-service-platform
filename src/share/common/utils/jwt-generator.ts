import * as JWT from 'jsonwebtoken';
import { Role } from '../enums/role.enum';
import { User } from 'src/domain/user/repository/user.entity';
import { encryptString } from './crypto';

export async function signAccessToken(user: User, role: Role): Promise<string> {
  const id = user.id;
  const options = { expiresIn: '24h' };
  const encrypteid = await encryptString(id);
  const encrypterole = await encryptString(role);

  const token = JWT.sign(
    { id: encrypteid, role: encrypterole },
    process.env.ACCESS_TOKEN_SECRET,
    options,
  );
  return token;
}
