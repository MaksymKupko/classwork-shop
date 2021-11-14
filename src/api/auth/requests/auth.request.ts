import { IsEnum, Length } from "class-validator";
import { BaseRequest } from "../../common/base.request";

export class AuthRequest extends BaseRequest {
  @Length(5, 20)
  login: string;

  @Length(5, 20)
  password: string;
}
