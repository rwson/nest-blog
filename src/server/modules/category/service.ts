import { Injectable, Inject } from '@nestjs/common';

import { subtract, multiply, divide } from 'ramda';

import { AuthService } from '@/server/auth';

import { CategoryModelToken, CategoryModel, CategoryInterface } from '@/server/models';
import { CategoryDocument } from '@/server/models/category';

import { CreateCategoryDto, UpdateCategoryDto } from '@/dto/category/request';
import { QueryCategoryDetailResponse, CategoryListItem, QueryCategoryListResponse } from '@/dto/category/response';
import { BaseResponse } from '@/dto/base';

import errorCode from '@/error-code';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CategoryModelToken) private readonly categoryModel: CategoryInterface,
    private readonly authService: AuthService,
  ) {}

  async createCategory(authorization: string, category: CreateCategoryDto): Promise<BaseResponse> {
    const user = this.authService.parse(authorization);
    const id: string = user.id ?? '';

    const categoryInst: CategoryDocument = new CategoryModel({
      title: category.title,
      creator: id
    });

    await categoryInst.save();

    return errorCode.success;
  }

  async updateCategory(category: UpdateCategoryDto): Promise<BaseResponse> {
    const id: string = category.id;

    delete category.id;

    await this.categoryModel.findByIdAndUpdate(id, category);

    return errorCode.success;
  }

  async deleteCategory(id: string) {
    await this.categoryModel.findByIdAndRemove(id);

    return errorCode.success;
  }

  async detail(id: string): Promise<QueryCategoryDetailResponse> {
    const category: CategoryDocument = await this.categoryModel.findById(id);
    const data: CategoryListItem = category.toJSON() as CategoryListItem;

    return {
      ...errorCode.success,
      data
    };
  }

  async list(page: string, pageSize: string): Promise<QueryCategoryListResponse> {
    const pageNum: number = Number(page);
    const limit: number = Number(pageSize);
    const skip: number = multiply(subtract(pageNum, 1), limit);

    const count: number = await this.categoryModel.count({});

    const totalPages: number = Math.ceil(divide(count, limit));

    const res: Array<CategoryDocument> = await this.categoryModel.find({})
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'creator',
        select: 'userName -_id',
      });

    const data: Array<CategoryListItem> = res.map((category: CategoryDocument): CategoryListItem => {
      return category.toJSON() as CategoryListItem;
    });

    return {
      ...errorCode.success,
      data: {
        totalPages,
        currentPage: pageNum,
        data
      }
    };
  }
}
