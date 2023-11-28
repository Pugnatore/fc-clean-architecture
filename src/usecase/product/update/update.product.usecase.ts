import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository : ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }


    async execute(data: InputUpdateProductDto) : Promise<OutputUpdateProductDto> {
        const product = await this.productRepository.find(data.id);

        if (!product) {
            throw new Error("Product not found");
        }

        product.changeName(data.name);
        product.changePrice(data.price);
        await this.productRepository.update(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        }
    }
}