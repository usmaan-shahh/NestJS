"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = void 0;
const common_1 = require("@nestjs/common");
exports.Cookie = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (data)
        return request.cookies?.[data];
    else
        return request.cookies;
});
//# sourceMappingURL=cookie.decorator.js.map