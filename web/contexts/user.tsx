import { useRouter } from "next/dist/client/router";
import { createContext, useContext, useState } from "react";
import useSWR from "swr";
import { UserSchema } from "../schemas/user";

const UserContext = createContext({} as {
    user?: UserSchema,
    login: (username: string, password: string) => Promise<{
        success: boolean,
        error?: string
    }>,
    logout: () => void
})


const UserProvider: React.FC = ({ children }) => {
    const { data, mutate } = useSWR<UserSchema | undefined>('/api/user/verify', async (url) => {
        const headers = new Headers()
        headers.append("authorization", localStorage.getItem('auth') ?? '')

        return fetch(url, { headers }).then(res => res.json())
    })
    const { push } = useRouter()

    async function login(username: string, password: string) {
        const response = await fetch(
            '/api/signin',
            {
                method: 'POST',
                body: JSON.stringify({ username, password })
            }
        )

        if(response.status !== 200) {
            const error = await response.text()
            return { success: false, error }
        }

        const { token } = await response.json()

        localStorage.setItem('auth', token)
        await mutate()
        
        push('/home')

        return { success: true }
    }

    async function logout() {
        localStorage.removeItem('auth')
        push('/')
        mutate()
    }

    return (
        <UserContext.Provider value={{
            user: data,
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