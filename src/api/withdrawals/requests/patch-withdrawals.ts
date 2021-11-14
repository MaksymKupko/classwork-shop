import { IsInt, IsPositive } from "class-validator";
import { BaseRequest } from "../../common/base.request";

export class PatchWithdrawalsRequest extends BaseRequest {
  @IsInt()
  @IsPositive()
  sum: number;
}
