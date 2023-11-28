import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ListProductsUseCase } from "./list.product.usecase";
import { OutputListProductDto } from "./list.product.dto";


describe("Integration test for product list use case", () => {
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

    it("should list products", async () => {

        const productRepository = new ProductRepository();
        var useCase = new ListProductsUseCase(productRepository);

        const product = new Product("123", "Product", 123);
        const product2 = new Product("1234", "Product2", 1234);
       
        await productRepository.create(product);
        await productRepository.create(product2);

    

        var output : OutputListProductDto = {
            products: [
                {
                    id: "123",
                    name: "Product",
                    price: 123,
                },
                {
                    id: "1234",
                    name: "Product2",
                    price: 1234,
                }
            ]
        }
                       
        var result = await useCase.execute();
       
        expect(result).toEqual({products: expect.arrayContaining(output.products)});
    });
});