import {
  Controller,
  Get,
  Request,
  Query,
  Post,
  Body,
  HttpException,
  UseGuards,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { InitiateAdminDto } from './dto/initiate.dto';
import { AuthGuard } from 'src/share/common/guards/auth.guard';
import { RoleGuard } from 'src/share/common/guards/role.guard';
import { Roles } from 'src/share/common/decorators/role';
import { Role } from 'src/share/common/enums/role.enum';
import { CreateUserDto } from './dto/createUser.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import {
  UpdateUserDtoBody,
  UpdateUserDtoParams,
} from './dto/update-user.interface';

@Controller({ path: 'admin', version: '1' })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/create/admin')
  async createProduct(@Body() body: InitiateAdminDto) {
    return await this.adminService.createAdmin(body);
  }

  /////////// USER crud //////////

  @Post('/user/create')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async createUser(@Body() body: CreateUserDto) {
    return await this.adminService.createUser(body);
  }

  @Get('/user/list')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async userList() {
    return await this.adminService.userList();
  }

  @Delete('/user')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async deleteUser(@Query('username') username: DeleteUserDto) {
    return await this.adminService.deleteUser(username);
  }

  @Patch('/user')
  @UseGuards(AuthGuard, RoleGuard)
  async updateUser(
    @Query('username') username: UpdateUserDtoParams,
    @Body() body: UpdateUserDtoBody,
  ) {
    return await this.adminService.updateUser(username,body);
  }
}
