import { assign } from "lodash";
import { PurchaseStatusEnum } from "../enums/purchase-status.enum";
import { BaseEntity } from "./base.entity";

export class PurchaseEntity extends BaseEntity {
  public customerId: string;

  public itemId: string;

  public status: PurchaseStatusEnum;

  constructor(data: Partial<PurchaseEntity>) {
    super(data);

    assign(this, data);
    this.status = PurchaseStatusEnum.PENDING;
  }
}
