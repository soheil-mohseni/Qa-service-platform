import * as JWT from 'jsonwebtoken';
import { Role } from "../enums/role.enum";
import { User } from 'src/domain/user/repository/user.entity';


export function signAccessToken(user: User, role:Role): string {
    const id = user.id ;
    const options = { expiresIn: "24h" };
    const token = JWT.sign({id ,role}, process.env.ACCESS_TOKEN_SECRET, options);
    return token;
  }

