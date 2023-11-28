import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto } from "./find.product.dto";

export class FindProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository : ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }
    async execute(input:InputFindProductDto ) {
        const product = await this.productRepository.find(input.id);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}