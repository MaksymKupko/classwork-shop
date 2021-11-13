import { IsEnum, Length } from "class-validator";
import { UserRoleEnum } from "../../../enums/user-role.enum";
import { BaseRequest } from "../../common/base.request";

export class RegistrationRequest extends BaseRequest {
  @Length(5, 20)
  login: string;

  @Length(5, 20)
  password: string;

  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
