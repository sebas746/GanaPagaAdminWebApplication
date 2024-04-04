import { UserRole, UserRolesEnum } from "../../types/UserRoles.types";

export const ALL_ROLES: UserRole[] = [
    UserRolesEnum.Admin,
    UserRolesEnum.Scrutiny,
    UserRolesEnum.Promoter
  ];

export const SCRUTINY_ROLES: UserRole[] = [
UserRolesEnum.Admin,
UserRolesEnum.Scrutiny
];  

export const ADMIN_ROLES: UserRole[] = [
    UserRolesEnum.Admin
];  

export const PROMOTER_ROLES: UserRole[] = [
    UserRolesEnum.Promoter
];  