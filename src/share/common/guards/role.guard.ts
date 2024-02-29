import { CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Role } from "../enums/role.enum";
import { ROLE_KEY } from "../decorators/role";
import { ErrorMessages } from "../constants/errors.constant";

export class TokenDto {
    id: number;
    role: Role;
}

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) { }
    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        const req: Request = context.switchToHttp().getRequest<Request>();
        const token = req['token'];
        let userRole = token?.role;
        if (!requiredRoles || requiredRoles.length == 0) return true;
        const accessResult = requiredRoles.some(role => role === userRole);
        if (accessResult) return accessResult;
        throw new HttpException(
            ErrorMessages.FORBIDDEN,
            HttpStatus.FORBIDDEN,
          );
    }
}