import { Flex, Text } from "@chakra-ui/react";
import { CoreContainer } from "../../components/core/CoreContainer";
import { CreateTeamForm } from "../../components/layout/CreateTeamForm";
import Head from 'next/head'

export default function CreateTeamPage() {
    return (
        <CoreContainer>
            <Head>
                <title>🍦 - Criação de Times</title>
            </Head>
            
            <Text
                fontSize={30}
                fontWeight={"bold"}
                marginBottom={12}
                color={"white"}
            >
                Criação de Times
            </Text>


            <CreateTeamForm />
        </CoreContainer>
    )
}