import { Module, Global, DynamicModule, Type } from '@nestjs/common';
import { NestAdminService } from './admin.service';
import { NestAdminController } from './admin.controller';
import { join } from 'path';
import { RegisterModule } from './register/register.module';
import { RouterModule } from '@nestjs/core';


@Global()
@Module({
  imports: [RegisterModule]
})
export class AdminModule {
  static register(extraModule?: any, prefix: string = 'admin'): DynamicModule {
    const importedModules = extraModule.filter(Boolean); 
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
    // 设置视图目录和视图引擎
    const viewsDir = ['views', join(__dirname, '..', 'views')];
    if (opt && opt.viewsDir) {
      viewsDir.unshift(opt.viewsDir);
    }
    app.setBaseViewsDir(viewsDir);
    app.setViewEngine('ejs');
  }
}