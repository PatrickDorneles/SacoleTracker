import { api } from './../../config/Apis';
import { BasicProduct } from './../../schemas/ProductSchema';

export async function getProductsFromTeam(token: string) {
    const response = await api.get<BasicProduct[]>('/product', {
		headers: {
			Authorization: token
		}
    })

    return response.data
}