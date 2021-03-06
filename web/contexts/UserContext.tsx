import { useRouter } from "next/router";
import { createContext, useContext, useEffect } from "react";
import useSWR from "swr";

import { AUTH_TOKEN_KEY } from "../config/Constants";
import { signInRequest, verifyUserRequest } from "../functions/requests/UserRequests";
import { UserSchemaWithTeam } from "../schemas/UserSchema";

import { useLoading } from "./LoadingContext";

const UserContext = createContext({} as {
    user?: UserSchemaWithTeam,
    login: (username: string, password: string) => Promise<{
        success: boolean,
        error?: string
    }>,
    logout: () => void
})


const UserProvider: React.FC = ({ children }) => {
    const { data: user, mutate, isValidating } = useSWR<UserSchemaWithTeam | undefined>('/user/verify', async (url) => {
        const token = localStorage?.getItem(AUTH_TOKEN_KEY) ?? ""
        return await verifyUserRequest(url, token)
    })
    const { startLoading, stopLoading } = useLoading()
    const { push, pathname } = useRouter()

    useEffect(() => {
        if (!user && pathname !== '/' && !pathname.startsWith('/public')) {
            push('/')
        }
    }, [user, push, pathname])


    useEffect(() => {
        if (user && !pathname.startsWith('/home')) {
            push('/home')
        }
    }, [user, push, pathname])

    async function login(username: string, password: string) {
        startLoading()
        const result = await signInRequest(username, password)

        if (!result.success) {
            stopLoading()
            return result
        }

        const { token } = result.data

        localStorage.setItem(AUTH_TOKEN_KEY, token)
        await mutate()

        push('/home')

        stopLoading()
        return { success: true }
    }

    async function logout() {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        mutate()
    }

    return (
        <UserContext.Provider value={{
            user,
            login,
            logout
        }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)

    return {
        ...context,
        UserProvider
    }
}