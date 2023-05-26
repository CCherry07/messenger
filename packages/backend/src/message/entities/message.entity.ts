import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { User } from 'src/user/entities/user.entity';

export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.messages)
  user: User;
  @Column()
  body: string;

  @Column()
  image: string;

  @Column({ type: 'date', default: new Date() })
  createdAt: Date;

  @Column({ type: 'simple-array' })
  seenIds: string[];

  @OneToMany(() => User, (user) => user.seenMessages)
  seen: User[];

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @Column()
  seenderId: string;

  @ManyToOne(() => User, (user) => user.seenMessageIds)
  seender: User;
}
