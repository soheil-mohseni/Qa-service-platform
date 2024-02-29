import { Controller, Get, Request, Query, Post, Body, HttpException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { initiateAdminDto } from './dto/initiate.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/create/admin')
  async createProduct(
    @Body() body: initiateAdminDto,
  ): Promise<string | HttpException> {
    return await this.adminService.createAdmin(body);
  }
}
