import { Conversation } from 'src/modules/conversation/entities/conversation.entity';
import { Message } from 'src/modules/message/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column()
  hashPassword: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'simple-array', nullable: true })
  coversationsIds: string[];

  @OneToMany(() => Conversation, (conversation) => conversation.users)
  conversations: Conversation[];

  @Column({ type: 'simple-array', nullable: true })
  seenMessageIds: string[];

  @OneToMany(() => Message, (message) => message.user)
  seenMessages: Message[];

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @Column({ type: 'simple-array', nullable: true })
  messages: Message[];
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  userId: number;

  @Column({ unique: true })
  provider: string;

  @Column({ unique: true })
  providerAccountId: string;

  @Column()
  refreshToken: string;

  @Column()
  accessToken: string;

  @Column()
  accessTokenExpires: Date;

  @Column()
  tokenType: string;

  @Column()
  scope: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column()
  idToken: string;

  @Column()
  sessionState: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}

export interface TokenEntity {
  code: number;
  message: string;
  data: Partial<User & { token: string }>;
}
