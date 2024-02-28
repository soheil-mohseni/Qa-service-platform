import { Controller, Get, Request, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('admin')
export class UserController {
  constructor(private readonly userService: UserService) {}


}
