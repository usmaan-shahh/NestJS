"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlreadyExistsError = void 0;
const common_1 = require("@nestjs/common");
class EmailAlreadyExistsError extends common_1.ConflictException {
    constructor() {
        super('Email already exists');
    }
}
exports.EmailAlreadyExistsError = EmailAlreadyExistsError;
//# sourceMappingURL=email-already-exists.exception.js.map