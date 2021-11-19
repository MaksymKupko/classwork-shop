import { Entity, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { ChatMemberEntity } from "./chat-member.entity";
import { MessageEntity } from "./message.entity";

@Entity({ name: "chats" })
export class ChatEntity extends Base {
  @OneToMany(() => MessageEntity, message => message.chat)
  public messages: Promise<MessageEntity[]>;

  @OneToMany(() => ChatMemberEntity, member => member.chat)
  public members: Promise<ChatMemberEntity[]>;
}
