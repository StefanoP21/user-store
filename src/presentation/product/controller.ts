import { Request, Response } from 'express';
import { CreateProductDto, CustomError, PaginationDto } from '../../domain';
import { ProductService } from '../services/product.service';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  };

  createProduct = async (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.productService
      .createProduct(createProductDto!)
      .then((product) => res.status(201).json(product))
      .catch((err) => this.handleError(err, res));
  };

  getProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.json(400).json({ error });

    this.productService
      .getProducts(paginationDto!)
      .then((products) => res.status(200).json(products))
      .catch((err) => this.handleError(err, res));
  };
}
