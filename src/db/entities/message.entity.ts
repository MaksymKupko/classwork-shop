import { BaseEntity, Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./base.entity";
import { ChatEntity } from "./chat.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "messages" })
export class MessageEntity extends Base {
  @Column({ type: "text" })
  public data: string;

  @Column()
  senderId: number;

  @ManyToOne(() => UserEntity)
  public sender: Promise<UserEntity>;

  @Column()
  public chatId: number;

  @ManyToOne(() => ChatEntity)
  public chat: Promise<ChatEntity>;
}
