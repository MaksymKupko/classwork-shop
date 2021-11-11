import { assign } from "lodash";
import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { UserRoleEnum } from "../../enums/user-role.enum";
import { Base } from "./base.entity";
import { ItemEntity } from "./item.entity";
import { PurchaseEntity } from "./purchase.entity";
import crypto from "crypto";
import { Length, Min } from "class-validator";

@Entity({ name: "users" })
export class UserEntity extends Base {
  @Column({
    type: "enum",
    enum: UserRoleEnum,
    default: UserRoleEnum.CUSTOMER,
  })
  public role: UserRoleEnum;

  @Column({
    type: "text",
    unique: true,
  })
  public login: string;

  @Column({ select: false })
  public password: string;

  @Column({
    type: "decimal",
    default: 300,
  })
  public balance: number;

  @OneToMany(() => ItemEntity, item => item.seller)
  public items: Promise<ItemEntity[]>;

  @OneToMany(() => PurchaseEntity, purchase => purchase.customer)
  public purchases: Promise<PurchaseEntity[]>;

  @BeforeInsert()
  encryptPassword() {
    this.password = this.getPasswordHash(this.password);
  }

  verifyPassword(password: string) {
    const passwordHash = this.getPasswordHash(password);

    return this.password === passwordHash;
  }

  getPasswordHash(password: string) {
    return crypto.createHash("sha256").update(password, "binary").digest("base64");
  }
}