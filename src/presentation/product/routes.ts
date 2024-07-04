import { Router } from 'express';
import { ProductController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const productService = '';
    const controller = new ProductController();

    router.get('/', controller.getProducts);
    router.post('/', [AuthMiddleware.validateJwt], controller.createProduct);

    return router;
  }
}
