import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from 'src/modules/conversation/entities/conversation.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Message {
  constructor(partial: Partial<Message>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['text', 'image', 'file'], default: 'text' })
  type: string;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @Column({ nullable: true })
  body: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'simple-array', nullable: true })
  seenIds: string[];

  @ManyToMany(() => User, (user) => user.seenMessages)
  @JoinTable({
    name: 'messages_seen',
    joinColumn: {
      name: 'messageId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  seen: User[];

  @Column()
  conversationId: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @Column()
  senderId: number;

  @ManyToOne(() => User, (user) => user.messages)
  sender: User;
}
