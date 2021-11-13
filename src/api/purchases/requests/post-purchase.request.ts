import { IsInt } from "class-validator";
import { BaseRequest } from "../../common/base.request";

export class PostPurchaseRequest extends BaseRequest {
  @IsInt()
  itemId: number;

  @IsInt()
  count: number;
}
