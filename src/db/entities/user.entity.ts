import crypto from "crypto";
import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { UserRoleEnum } from "../../enums/user-role.enum";
import { ColumnNumericTransformer } from "../transformers/column-numeric.transformer";
import { Base } from "./base.entity";
import { CardEntity } from "./card.entity";
import { ChatMemberEntity } from "./chat-member.entity";
import { ItemEntity } from "./item.entity";
import { PurchaseEntity } from "./purchase.entity";

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
    scale: 2,
    default: 300,
    transformer: new ColumnNumericTransformer(300),
  })
  public balance: number;

  @OneToMany(() => ItemEntity, item => item.seller)
  public items: Promise<ItemEntity[]>;

  @OneToMany(() => PurchaseEntity, purchase => purchase.customer)
  public purchases: Promise<PurchaseEntity[]>;

  @OneToMany(() => CardEntity, card => card.user)
  public cards: Promise<CardEntity[]>;

  @OneToMany(() => ChatMemberEntity, chatMember => chatMember.user)
  public chatMember: Promise<ChatMemberEntity[]>;

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
