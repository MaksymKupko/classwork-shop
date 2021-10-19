import { assign } from "lodash";
import { BaseEntity } from "./base.entity";

export class ItemEntity extends BaseEntity {
  public price: number;

  public title: string;

  public quantity: number;

  public sellerId: number;

  constructor(data: Partial<ItemEntity>) {
    super(data);
    assign(this, data);
  }
}
