import { Module, Global, DynamicModule, MiddlewareConsumer } from '@nestjs/common';
import { NestAdminService } from './admin.service';
import { NestAdminController } from './admin.controller';
import { join } from 'path';
import { RegisterModule } from './register/register.module';
import { RouterModule } from '@nestjs/core';
// import * as ejs from 'ejs';
// import * as ejsLocals from 'ejs-locals';
import * as expressEjsLayouts from 'express-ejs-layouts';
import { AdminLayoutMiddleware } from './admin-layout.middleware';
import { LayoutPriorityMiddleware } from './layout-priority.middleware';
@Global()
@Module({
  imports: [RegisterModule]
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminLayoutMiddleware)
      .forRoutes(NestAdminController); // 适用于 AdminController 的所有路由
  }
  static register(extraModule?: any, prefix: string = 'admin'): DynamicModule {
    const importedModules = extraModule && extraModule.filter(Boolean) || []; 
    const childrenRoutes = importedModules.map((module) => ({
      path:module.name.replace(/Module$/, '').toLowerCase(),
      module,
    }))
    const routes = [
      {
        path: prefix,
        module: AdminModule,
        children:[
          {
            path: 'register',
            module: RegisterModule,
          },
          ...childrenRoutes
        ]
      },
    ];

    return {
      module: AdminModule,
      controllers: [NestAdminController],
      imports: [...importedModules,RouterModule.register(routes)],
      providers: [NestAdminService],
      exports:importedModules
    };
  }

  static configure(app: any,opt?:any) {
    const projectRoot = process.cwd();
    const userViewsDir = opt && opt.viewsDir ? opt.viewsDir : [join(projectRoot, 'views')];
    const defaultViewsDir = join(__dirname, '..', 'views');
 
    // 设置视图目录和视图引擎
    const viewsDir = [...userViewsDir, defaultViewsDir];
    app.setBaseViewsDir(viewsDir);
    app.setViewEngine('ejs');
    app.use(expressEjsLayouts);
    // 检查用户是否提供了自定义的 layout.ejs
    app.use(new LayoutPriorityMiddleware(viewsDir).use);
 
  }
}