import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class LayoutPriorityMiddleware implements NestMiddleware {
  constructor(private readonly viewsDirs: string[]=[]) {
    this.use = this.use.bind(this);
  }
  use(req: Request, res: Response, next: NextFunction) {
      for (const dir of this.viewsDirs) {
        const layoutPath = join(dir,'layout.ejs');
        if (fs.existsSync(layoutPath)) {
          res.locals.layout = layoutPath;
          return next();
        }
      }
    // 如果没有找到，设置默认布局
    res.locals.layout = join(__dirname, '../views', 'layout.ejs');

    next();
  }
}