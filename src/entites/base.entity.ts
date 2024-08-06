import { ObjectType, Field, InputType, ID } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, MaxLength } from 'class-validator';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class BaseEntity {
  @Field()
  // @PrimaryGeneratedColumn()
  _id?: string;

  // @Column({ unique: true })
  @Prop({ required: true, unique: true, index: true })
  // @IsNotEmpty({ message: 'Mã không được để trống' })
  @Field(() => ID)
  // @MaxLength(20, { message: 'Giới hạn tối đa là 20 ký tự' })
  code: string;

  @Prop()
  @IsNotEmpty({ message: 'Tên  không được để trống' })
  @Field({ description: 'Tên' })
  @MaxLength(100, { message: 'Giới hạn tối đa là 100 ký tự' })
  name: string;

  // @CreateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP(6)',
  // })
  // @Field({ description: 'Ngày tạo', name: 'createdAt' })
  // create_at?: Date;
  /**
   * ---------------------------------
   */
  // @UpdateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP(6)',
  //   onUpdate: 'CURRENT_TIMESTAMP(6)',
  // })
  // @Field({ description: 'Ngày cập nhật', name: 'updatedAt' })
  // update_at?: Date;
  /**
   * ---------------------------------
   */
  @Field()
  createdAt?: Date;
  @Field()
  updatedAt?: Date;
  @Prop()
  @Field({ description: 'Mô tả', nullable: true })
  description?: string;
  /**
   * ---------------------------------
   */
  @Field({ description: 'Trạng thái', nullable: true })
  @Prop({ default: 'A' })
  status?: 'A' | 'I';
}
