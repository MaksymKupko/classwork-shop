import { IsEnum } from "class-validator";
import { UserRoleEnum } from "../../../enums/user-role.enum";
import { AuthRequest } from "./auth.request";

export class RegistrationRequest extends AuthRequest {
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
