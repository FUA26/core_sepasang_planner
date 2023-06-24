import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { NextPrevHelper, StartEndHelper } from 'src/helper/pagination.helper';
import { requestPaginated } from 'src/utils/dto/requestPaginated.dto';
import { PaginatedDto, PaginationMeta } from 'src/utils/dto/response.dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('list')
  async findAllList() {
    const data = await this.categoryService.allList();
    const response: PaginatedDto<Category> = {
      status: 'success',
      message: 'Data retrieved successfully',
      datas: data,
    };
    return response;
  }

  @Get()
  @ApiResponse({ status: 200, description: 'OK' })
  async findAll(@Query() query: requestPaginated) {
    const paginationQuery = StartEndHelper(query.record, query.page);
    const service = await this.categoryService.findAll(paginationQuery, query);
    const meta: PaginationMeta = await NextPrevHelper(
      service.count,
      query.record,
      query.page,
    );
    const data = service.datas;
    const response: PaginatedDto<Category> = {
      status: 'success',
      message: 'Data retrieved successfully',
      datas: data,
      meta,
    };

    return response;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
