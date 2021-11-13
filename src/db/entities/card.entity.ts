import { Column, Entity, ManyToOne } from "typeorm";
import { CardTypeEnum } from "../../enums/card-type.enum";
import { Base } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "cards" })
export class CardEntity extends Base {
  @Column()
  public type: CardTypeEnum;

  @Column()
  public number: number;

  @Column()
  public expire: string;

  @Column()
  public cvv: number;

  @ManyToOne(() => UserEntity)
  public user: UserEntity;
}
