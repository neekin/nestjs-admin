"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AdminModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_controller_1 = require("./admin.controller");
const path_1 = require("path");
const register_module_1 = require("./register/register.module");
const core_1 = require("@nestjs/core");
let AdminModule = AdminModule_1 = class AdminModule {
    static register(extraModule, prefix = 'admin') {
        const importedModules = extraModule.filter(Boolean);
        const childrenRoutes = importedModules.map((module) => ({
            path: module.name.replace(/Module$/, '').toLowerCase(),
            module,
        }));
        const routes = [
            {
                path: prefix,
                module: AdminModule_1,
                children: [
                    {
                        path: 'register',
                        module: register_module_1.RegisterModule,
                    },
                    ...childrenRoutes
                ]
            },
        ];
        return {
            module: AdminModule_1,
            controllers: [admin_controller_1.NestAdminController],
            imports: [...importedModules, core_1.RouterModule.register(routes)],
            providers: [admin_service_1.NestAdminService],
            exports: importedModules
        };
    }
    static configure(app, opt) {
        const viewsDir = ['views', (0, path_1.join)(__dirname, '..', 'views')];
        if (opt && opt.viewsDir) {
            viewsDir.unshift(opt.viewsDir);
        }
        app.setBaseViewsDir(viewsDir);
        app.setViewEngine('ejs');
    }
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = AdminModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [register_module_1.RegisterModule]
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map