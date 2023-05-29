import { Message } from 'src/modules/message/entities/message.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Conversation {
  constructor(partial?: Partial<Conversation>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastMessageAt: Date;

  @Column({ nullable: true })
  name: string;

  @Column()
  isGroup: boolean;

  @Column({ type: 'simple-array', nullable: true })
  messagesIds: string[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @Column({ type: 'simple-array' })
  userIds: number[];

  @ManyToMany(() => User, (user) => user.conversations)
  @JoinTable({
    name: 'conversations_users',
    joinColumn: {
      name: 'conversationId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
