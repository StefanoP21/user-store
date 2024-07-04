import { Request, Response } from 'express';
import { CustomError, PaginationDto } from '../../domain';

export class ProductController {
  //todo
  // constructor(private readonly productService: ProductService) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  };

  createProduct = async (req: Request, res: Response) => {
    return res.json('createProducts');

    // const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    // if (error) return res.status(400).json({ error });
    // this.categoryService
    //   .createCategory(createCategoryDto!, req.body.user)
    //   .then((category) => res.status(201).json(category))
    //   .catch((err) => this.handleError(err, res));
  };

  getProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.json(400).json({ error });

    return res.json('getProducts');

    // this.categoryService
    //   .getCategories(paginationDto!)
    //   .then((categories) => res.status(200).json(categories))
    //   .catch((err) => this.handleError(err, res));
  };
}
