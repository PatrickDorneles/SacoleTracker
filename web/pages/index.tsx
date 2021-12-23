import { Flex, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
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
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
      backgroundColor={"#283593"}
    >
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

    </Flex>
  )
}

export default Home
