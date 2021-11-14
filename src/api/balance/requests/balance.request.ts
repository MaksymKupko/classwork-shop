import { IsNumber, IsPositive } from "class-validator";
import { BaseRequest } from "../../common/base.request";

export class BalanceRequest extends BaseRequest {
  @IsNumber()
  @IsPositive()
  sum: number;
}
