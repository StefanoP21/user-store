import { CategoryModel } from '../../data';
import { CreateCategoryDto, CustomError, UserEntity } from '../../domain';

export class CategoryService {
  //* DI
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExist = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (categoryExist) throw CustomError.badRequest('Category already exist');

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      });

      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };
    } catch (error) {
      throw CustomError.internalServerError(`Internal server error: ${error}`);
    }
  }

  async getCategories() {
    try {
      const categories = await CategoryModel.find();

      if (categories.length < 1)
        throw CustomError.notFound('Categories not found on database');

      return categories.map((category) => ({
        id: category.id,
        name: category.name,
        available: category.available,
      }));
    } catch (error) {
      throw CustomError.internalServerError(`Internal server error: ${error}`);
    }
  }
}
