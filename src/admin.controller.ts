import { Controller, Get, Render } from '@nestjs/common';
import { NestAdminService } from './admin.service';

@Controller()
export class NestAdminController {
  constructor(private readonly nestAdminService: NestAdminService) {}
  @Get()
  @Render('admin/index') 
  getDashboard() {
    return this.nestAdminService.getAdminDashboard();
  }
}