import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({ nullable: true, type: 'text' })
  lastMessage: Message;

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

  //TODO fix delete this ?
  @OneToMany(() => Message, (message) => message.user)
  users: User[];
}
