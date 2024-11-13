import { Controller, Get } from '@nestjs/common';

@Controller()
export class RegisterController {
    @Get()
    register(){
        return "这是注册页面"
    }
}
