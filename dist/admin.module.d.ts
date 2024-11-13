import { DynamicModule } from '@nestjs/common';
export declare class AdminModule {
    static register(extraModule?: any, prefix?: string): DynamicModule;
    static configure(app: any, opt?: any): void;
}
