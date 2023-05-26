import { Message } from 'src/message/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'date' })
  lastMessage: Message;

  @Column()
  name: string;

  @Column()
  isGroup: boolean;

  @Column({ type: 'simple-array' })
  messagesIds: string[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @Column({ type: 'simple-array' })
  userIds: string[];

  @OneToMany(() => Message, (message) => message.user)
  users: string[];
}
