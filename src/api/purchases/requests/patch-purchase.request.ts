import { IsEnum } from "class-validator";
import { PurchaseStatusEnum } from "../../../enums/purchase-status.enum";

export class PatchPurchaseRequest {
  @IsEnum(PurchaseStatusEnum)
  status: PurchaseStatusEnum;
}
