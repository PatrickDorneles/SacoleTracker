import Head from 'next/head'
import { Flex } from "@chakra-ui/react";
import { CoreContainer } from '../../components/core/CoreContainer';

export default function HomeScreen() {

    return (
        <CoreContainer>
            <Head>
                <title>🍦 - Home</title>
            </Head>
            YOURE AT HOME

        </CoreContainer>
    )
}