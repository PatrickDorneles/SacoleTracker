import { Link, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useEffect } from 'react'
import { CoreContainer } from '../components/core/CoreContainer'
import { SignInForm } from '../components/layout/SignInForm'
import { useUser } from '../contexts/user'

const Home: NextPage = () => {
  const { user } = useUser()
  const { push } = useRouter()

  useEffect(() => {
    if(user) {
      push('/home')
    }
  }, [user,push])

  return (
    <CoreContainer>
      <Head>
        <title>SacoleTracker</title>
      </Head>

      <Text
        fontSize={100}
      >
        🍦
      </Text>

      <Text
        fontSize={30}
        fontWeight={"bold"}
        marginBottom={12}
        color={"white"}
      >
        SacoleTracker
      </Text>

      <SignInForm />

      <Link 
        href="/public/create-team"
        color={"white"}
        marginTop={4}
      >
        Deseja criar um time?
      </Link>

    </CoreContainer>
  )
}

export default Home
