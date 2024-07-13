import { ProductModel } from '../../data';
import { CreateProductDto, CustomError, PaginationDto } from '../../domain';

export class ProductService {
    //* DI
    constructor() {}

    async createProduct(createProductDto: CreateProductDto) {
        const productExist = await ProductModel.findOne({
            name: createProductDto.name,
        });
        if (productExist) throw CustomError.badRequest('Product already exist');

        try {
            const product = new ProductModel(createProductDto);

            await product.save();

            return product;
        } catch (error) {
            throw CustomError.internalServerError(
                `Internal server error: ${error}`
            );
        }
    }

    async getProducts(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;

        try {
            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .populate('user', 'name')
                    .populate('category', 'name'),
            ]);

            if (products.length < 1)
                throw CustomError.notFound('Products not found on database');

            return {
                page,
                limit,
                total,
                next: `/api/products?page=${page + 1}&limit=${limit}`,
                prev:
                    page - 1 > 0
                        ? `/api/products?page=${page - 1}&limit=${limit}`
                        : null,
                products,
            };
        } catch (error) {
            throw CustomError.internalServerError(
                `Internal server error: ${error}`
            );
        }
    }
}
