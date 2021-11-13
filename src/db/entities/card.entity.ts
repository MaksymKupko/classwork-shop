import { Column, Entity, ManyToOne } from "typeorm";
import { CardTypeEnum } from "../../enums/card-type.enum";
import { Base } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "cards" })
export class CardEntity extends Base {
  @Column()
  public type: CardTypeEnum;

  @Column()
  public number: string;

  @Column()
  public expired: string;

  @Column()
  public cvv: number;

  @Column()
  public userId: number;

  @ManyToOne(() => UserEntity, { nullable: false })
  public user: UserEntity;
}
