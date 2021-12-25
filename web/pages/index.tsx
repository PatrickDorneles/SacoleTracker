import { Link, Text } from '@chakra-ui/react'
import Head from 'next/head'


import { CoreContainer } from '../components/core/CoreContainer'
import { SignInForm } from '../components/layout/SignInForm'

import type { NextPage } from 'next'

const Home: NextPage = () => {

  return (
    <CoreContainer>
      <Head>
        <title>🍦 SacoleTracker 🍦</title>
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
