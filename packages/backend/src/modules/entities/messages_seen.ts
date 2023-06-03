import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Message } from '../message/entities/message.entity';

@Entity()
export class Messages_Seen {
  constructor(partial?: Partial<Messages_Seen>) {
    Object.assign(this, partial);
  }
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  messageId: number;

  @ManyToOne(() => User, (User) => User.seenMessages, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  users: User[];

  @ManyToOne(() => Message, (Message) => Message.seen, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'messageId', referencedColumnName: 'id' }])
  seenMessages: Message[];
}
