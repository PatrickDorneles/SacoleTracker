import Head from 'next/head'
import { CoreContainer } from '../../components/core/CoreContainer';
import { CreateTeamForm } from '../../components/layout/CreateTeamForm';
import { useUser } from '../../contexts/UserContext';

export default function HomeScreen() {
    const {} = useUser()
    return (
        <CoreContainer>
            <Head>
                <title>🍦 - Home</title>
            </Head>

        </CoreContainer>
    )
}