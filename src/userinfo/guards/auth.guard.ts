import { CanActivate , ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";
import { Role } from "../entities/userinfo.entity";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector: Reflector){}
    canActivate(
        context: ExecutionContext): boolean 
        {
            const requireRols = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
                context.getHandler(),
                context.getClass()
            ]);
            const user = context.switchToHttp().getRequest().user;
            const hasRequiredRole = requireRols.some(role=> user.role?.includes(role));
            return hasRequiredRole;
        }
    }