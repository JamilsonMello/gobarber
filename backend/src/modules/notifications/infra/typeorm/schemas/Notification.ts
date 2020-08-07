import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

@Entity('notifications')
export default class Notifications {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  content: string;

  @Column({ type: 'uuid' })
  recipient_id: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
