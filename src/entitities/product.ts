import { IProduct } from "src/interfaces/product-interface";
import { Either, left, right } from "src/utils/either";

export class Product {
    constructor(
        readonly code: number,
        readonly status: string,
        readonly imported_t: string,
        readonly url: string,
        readonly creator: string,
        readonly created_t: number,
        readonly last_modified_t: number,
        readonly product_name: string,
        readonly quantity: string,
        readonly brands: string,
        readonly categories: string,
        readonly labels: string,
        readonly cities: string,
        readonly purchase_places: string,
        readonly stores: string,
        readonly ingredients_text: string,
        readonly traces: string,
        readonly serving_size: string,
        readonly serving_quantity: number,
        readonly nutriscore_score: number,
        readonly nutriscore_grade: string,
        readonly main_category: string,
        readonly image_url: string) { }

    create(input: IProduct): Either<Error, Product> {
        try {
            return right(new Product(input.code,
                input.status,
                input.imported_t,
                input.url,
                input.creator,
                input.created_t,
                input.last_modified_t,
                input.product_name,
                input.quantity,
                input.brands,
                input.categories,
                input.labels,
                input.cities,
                input.purchase_places,
                input.stores,
                input.ingredients_text,
                input.traces,
                input.serving_size,
                input.serving_quantity,
                input.nutriscore_score,
                input.nutriscore_grade,
                input.main_category,
                input.image_url))
        }
        catch (error) {
            return left(new Error("Failed to create Product"));
        }

    }

}