import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./base.entity";
import { ChatEntity } from "./chat.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "chat_members" })
export class ChatMemberEntity extends Base {
  @Column()
  public userId: number;

  @Column()
  public chatId: number;

  @ManyToOne(() => UserEntity)
  public user: Promise<UserEntity>;

  @ManyToOne(() => ChatEntity)
  public chat: Promise<ChatEntity>;
}
