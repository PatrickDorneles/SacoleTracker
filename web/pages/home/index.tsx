import { Flex } from "@chakra-ui/react"
import Head from "next/head"

import { HomeHeader } from "../../components/layout/HomeHeader"
import { ProductList } from "../../components/layout/ProductList"

export default function HomeScreen() {
	
	return (
		<Flex
			flexDirection={"column"}
			alignItems={"center"}
			backgroundColor={"#283593"}
			height={"100%"}
			padding={6}
		>
			<Head>
				<title>🍦 - Home</title>
			</Head>
			
			<HomeHeader />

			<ProductList />

		</Flex>
	)
}