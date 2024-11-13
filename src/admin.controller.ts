import { Controller, Get, Render } from '@nestjs/common';
import { NestAdminService } from './admin.service';

@Controller()
export class NestAdminController {
  constructor(private readonly nestAdminService: NestAdminService) {}
  @Get()
  @Render('admin/index.ejs') // 使用 EJS 模板
  getDashboard() {
    return this.nestAdminService.getAdminDashboard();
  }
}