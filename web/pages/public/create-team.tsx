import { CloseIcon } from '@chakra-ui/icons'
import { Button, Text } from "@chakra-ui/react";
import Head from "next/head"
import { useRouter } from "next/router";

import { CoreContainer } from "../../components/core/CoreContainer";
import { CreateTeamForm } from "../../components/layout/CreateTeamForm";

export default function CreateTeamPage() {
    const { push } = useRouter()

    return (
        <CoreContainer>
            <Head>
                <title>🍦 - Criação de Times</title>
            </Head>

            <Text
                fontSize={30}
                fontWeight={"bold"}
                marginBottom={8}
                color={"white"}
            >
                Criação de Times
            </Text>


            <CreateTeamForm />


            <Button
                leftIcon={<CloseIcon />}
                marginTop={4}
                colorScheme='whiteAlpha'
                variant='ghost'
                onClick={() => {
                    push('/')
                }}
            >
                VOLTAR
            </Button>
        </CoreContainer>
    )
}