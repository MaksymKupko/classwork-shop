import { IsNumber, IsPositive } from "class-validator";
import { BaseRequest } from "../../common/base.request";

export class PatchWithdrawalsRequest extends BaseRequest {
  @IsNumber()
  @IsPositive()
  sum: number;
}
