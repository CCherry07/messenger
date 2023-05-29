import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Conversation } from '../conversation/entities/conversation.entity';

@Entity()
export class Conversations_Users {
  constructor(partial?: Partial<Conversations_Users>) {
    Object.assign(this, partial);
  }
  @PrimaryColumn({ name: 'userId' })
  userId: number;

  @PrimaryColumn({ name: 'conversationId' })
  conversationId: number;

  @ManyToOne(() => User, (User) => User.conversations, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  users: User[];

  @ManyToOne(() => Conversation, (Conversation) => Conversation.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'conversationId', referencedColumnName: 'id' }])
  conversations: Conversation[];
}
