import { Message } from 'src/message/entities/message.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
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
