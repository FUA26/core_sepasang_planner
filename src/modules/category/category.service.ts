import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { PaginatedDto, PaginationMeta } from 'src/utils/dto/response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAll(paginationQuery, queryParams): Promise<any> {
    console.log(paginationQuery);
    const count = await this.prisma.category.count();

    const datas = await this.prisma.category.findMany({
      orderBy: {
        [queryParams.sort]: queryParams.order,
      },

      take: paginationQuery.end,
      skip: paginationQuery.start,
    });
    return { count, datas };
  }

  async allList(): Promise<any> {
    return await this.prisma.category.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
