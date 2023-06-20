import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class requestPaginated {
  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @ApiPropertyOptional({ default: 1 }) // Tambahkan default value
  page?: number;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @ApiPropertyOptional({ default: 10 }) // Tambahkan default value
  record?: number;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  sort?: string;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsString()
  order?: string;
}
