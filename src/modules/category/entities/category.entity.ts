import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class CategoryEntity implements Category {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  isActive: number;
  @ApiProperty()
  date_created: Date;
  @ApiProperty()
  date_updated: Date;
}
