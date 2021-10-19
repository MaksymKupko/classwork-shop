import { assign } from "lodash";
import { UserRoleEnum } from "../enums/user-role.enum";
import { BaseEntity } from "./base.entity";

export class UserEntity extends BaseEntity {
  public login: string;

  public password: string;

  public balance: number;

  public role: UserRoleEnum;

  constructor(data: Partial<UserEntity>) {
    super(data);
    assign(this, data);
  }
}
