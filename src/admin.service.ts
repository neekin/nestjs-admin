// src/nest-admin.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestAdminService {
  getAdminDashboard() {
    return { message: 'Welcome to the Admin Dashboard' };
  }
}