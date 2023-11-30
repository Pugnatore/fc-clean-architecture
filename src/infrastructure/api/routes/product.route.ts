import { InputCreateProductDto } from './../../../usecase/product/create/create.product.dto';
import express, { Request, Response } from "express";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { ListProductsUseCase } from '../../../usecase/product/list/list.product.usecase';

export const productRoute = express.Router();

productRoute.post("/", async (req:Request, res: Response) => {
    const useCase = new CreateProductUseCase(new ProductRepository());
    
    try {
        const productDto = {
            name: req.body.name,
            price: req.body.price,
            type: req.body.type,
        };
        const output = await useCase.execute(productDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/", async (req: Request, res:Response) => {
    const useCase = new ListProductsUseCase(new ProductRepository());
    try{
        const output = await useCase.execute({});
        res.send(output);
    }
    catch(err){
        res.status(500).send(err);
    }
});
