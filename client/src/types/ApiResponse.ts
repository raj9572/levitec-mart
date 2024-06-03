import { Product } from "../components/ProductItem";

export interface ApiResponse{
    status:string,
    message:string,
    data? :Array<Product> | string,
    statusCode:number

}