import { CreateProductUseCase } from "./create.product.usecase";

const input = {
    name: "Product",
    price: 100,
    type: "a",
};

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

  describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
    
        const output = await productCreateUseCase.execute(input);
    
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should thrown an error when price is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        
        input.price = 0;
    
        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
          "product: Price must be greater than zero"
        );
    });

    it("should thrown an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
    
        input.name = "";
    
        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
          "product: Name is required"
        );
    });

    it("should thrown an error when type is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
    
        input.type = "";
    
        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
          "product: Product type not supported"
        );
    });

    it("should thrown an error when type is not valid", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
    
        input.type = "c";
    
        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
          "product: Product type not supported"
        );
    });
  });