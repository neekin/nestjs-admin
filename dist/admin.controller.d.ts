import { NestAdminService } from './admin.service';
export declare class NestAdminController {
    private readonly nestAdminService;
    constructor(nestAdminService: NestAdminService);
    getDashboard(): {
        message: string;
    };
}
