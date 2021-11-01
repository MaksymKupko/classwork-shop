import { assign } from "lodash";
import { Column, Entity, ManyToOne } from "typeorm";
import { PurchaseStatusEnum } from "../../enums/purchase-status.enum";
import { Base } from "./base.entity";
import { ItemEntity } from "./item.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "purchases" })
export class PurchaseEntity extends Base {
  @Column({
    type: "enum",
    enum: PurchaseStatusEnum,
    default: PurchaseStatusEnum.PENDING,
  })
  public status: PurchaseStatusEnum;

  @Column({ default: 1 })
  public quantity: number;

  @Column()
  public customerId: number;

  @Column()
  public itemId: number;

  @ManyToOne(() => ItemEntity)
  public item: ItemEntity;

  @ManyToOne(() => UserEntity)
  public customer: Promise<UserEntity>;
}
