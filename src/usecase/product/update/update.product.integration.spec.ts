import { UpdateProductUseCase } from './update.product.usecase';
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Integration test for product update use case", () => {
    let sequelize :Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);
        const product = new Product("123", "Product", 123);
        await productRepository.create(product);
        const input = {
            id: "123",
            name: "Product2",
            price: 123,
        };
        const output = {
            id: "123",
            name: "Product2",
            price: 123,
        };
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });
});