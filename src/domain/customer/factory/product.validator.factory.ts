import { Validator } from "sequelize";
import ProductYupValidator from "../validator/product.yup.validator";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../../product/entity/product";

export default class ProductValidatorFactory {
    static create(): ValidatorInterface<Product> {
        return new ProductYupValidator();
    }
}