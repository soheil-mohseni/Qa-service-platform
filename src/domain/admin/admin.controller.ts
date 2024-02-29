import {
  Controller,
  Get,
  Request,
  Query,
  Post,
  Body,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { initiateAdminDto } from './dto/initiate.dto';
import { AuthGuard } from 'src/share/common/guards/auth.guard';
import { RoleGuard } from 'src/share/common/guards/role.guard';
import { Roles } from 'src/share/common/decorators/role';
import { Role } from 'src/share/common/enums/role.enum';

@Controller({ path: 'admin', version: '1' })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/create/admin')
  async createProduct(
    @Body() body: initiateAdminDto,
  ) {
    return await this.adminService.createAdmin(body);
  }

  @Post('/create/admin')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async createUser(
    @Body() body: initiateAdminDto,
  ) {
    return await this.adminService.createAdmin(body);
  }
}
