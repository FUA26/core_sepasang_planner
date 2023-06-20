import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'title',
    default: 'Web Invitation',
  })
  @IsNotEmpty()
  title: string;
}
