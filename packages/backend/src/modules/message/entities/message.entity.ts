import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from 'src/modules/conversation/entities/conversation.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['text', 'image', 'file'], default: 'text' })
  type: string;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @Column('text')
  body: string;

  @Column()
  image: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'simple-array' })
  seenIds: string[];

  @OneToMany(() => User, (user) => user.seenMessages)
  seen: User[];

  @Column({ nullable: true, unique: true })
  conversationId: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @Column()
  seenderId: string;

  @ManyToOne(() => User, (user) => user.seenMessageIds)
  seender: User;
}
