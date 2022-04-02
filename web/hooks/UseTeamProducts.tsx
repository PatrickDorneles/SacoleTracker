import { useCallback, useState } from "react";
import useSWR from "swr";

import { AUTH_TOKEN_KEY } from "../config/Constants";
import { useUser } from "../contexts/UserContext";
import { getProductsFromTeam } from "../functions/requests/ProductRequests";
import { BasicProduct } from "../schemas/ProductSchema";

export function useTeamProducts() {
    const { user } = useUser()
    
    const getProducts = useCallback(async () => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY)
        
        if(!user || !token) return []

        const products = getProductsFromTeam(token)

        return products
    }, [user])

    const { data: products } = useSWR<BasicProduct[]>('products', getProducts)
    
    return products ?? []
}