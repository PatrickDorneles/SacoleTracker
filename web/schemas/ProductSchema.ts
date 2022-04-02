import { Team } from '../database/models/TeamModel';

import { Product } from './../database/models/ProductModel';
export type ProductCreationParams = {
    name: string
    description: string
    price: number
    initialStorage: number
}

export class BasicProduct {
    _id!: string
	name!: string
	description!: string
	price!: number
	imageUrl?: string
    quantity!: number

    static create(props: Product, team: Team) {
        const productBasicOutput = new BasicProduct()
        
        productBasicOutput._id = props._id
        productBasicOutput.name = props.name
        productBasicOutput.description = props.description
        productBasicOutput.price = props.price
        productBasicOutput.imageUrl = props.imageUrl
        productBasicOutput.quantity = team.storage.find(
            (product) => product.productId = props._id
        )?.quantity ?? 0

        return productBasicOutput
    }
}