import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputUpdateProductDto } from "./update.product.dto";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = ProductFactory.create(
     "a",
     "Product 1",
     100
);

// const product = new Product("123", "Product 1", 100);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
    findAll: jest.fn(),
  };
};

const input: InputUpdateProductDto = {
    id: product.id,
    name: "Product 1 Updated",
    price: 200,
  };

describe("Unit test for product update use case", () => {
    it("should update a product", async () => {
        const repository = MockRepository();
        const useCase = new UpdateProductUseCase(repository);

        const output = await useCase.execute(input);

        expect(output).toEqual(input);
    });
});
