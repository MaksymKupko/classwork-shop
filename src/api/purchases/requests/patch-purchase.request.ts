import { IsEnum } from "class-validator";
import { PurchaseStatusEnum } from "../../../enums/purchase-status.enum";
import { BaseRequest } from "../../common/base.request";

export class PatchPurchaseRequest extends BaseRequest {
  @IsEnum(PurchaseStatusEnum)
  status: PurchaseStatusEnum;
}
