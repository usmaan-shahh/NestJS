import { ConflictException } from "@nestjs/common";
export declare class EmailAlreadyExistsError extends ConflictException {
    constructor();
}
