import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Flex, Text } from "@chakra-ui/react"

import { useUser } from "../../contexts/UserContext"
import { useTeamProducts } from "../../hooks/UseTeamProducts"

export function ProductList() {
    const { user } = useUser()
    const products = useTeamProducts()
    
    return (
        <Flex
            direction="column"
            alignItems="center"
        >
            {
                products.length ? 
                (
                    products.map(p => p.name)
                ) 
                : (
                    <Alert
                        status="warning"
                        variant="subtle"
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='200px'
                        margin={10}
                    >
                        <AlertIcon boxSize='40px' mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize='lg'>
                            Sem produtos!
                        </AlertTitle>
                        <AlertDescription maxWidth='sm'>
                            Seu time não possui produtos cadastrados! <br></br>
                            {user?.admin && "Gostaria de cadastrar algum produto?"}
                        </AlertDescription>
                    </Alert>
                )
            }
            {
                user?.admin
                && (
                    <Button
                        onClick={() => { /** */ }}
                    >
                        CADASTRAR PRODUTO
                    </Button>
                )
            }
        </Flex>
    )
}