import { Request, Response } from 'express';
import { CreateCategoryDto, CustomError } from '../../domain';
import { CategoryService } from '../services/category.service';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  };

  createCategory = async (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.categoryService
      .createCategory(createCategoryDto!, req.body.user)
      .then((category) => res.status(201).json(category))
      .catch((err) => this.handleError(err, res));
  };

  getCategories = async (req: Request, res: Response) => {
    this.categoryService
      .getCategories()
      .then((categories) => res.status(200).json(categories))
      .catch((err) => this.handleError(err, res));
  };
}
