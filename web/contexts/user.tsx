import { useRouter } from "next/dist/client/router";
import { createContext, useContext, useState } from "react";
import { UserSchema } from "../schemas/user";

const UserContext = createContext({} as {
    user?: UserSchema,
    login: (username: string, password: string) => Promise<void>,
    logout: () => void
})

const UserProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState(undefined)
    const { push } = useRouter()

    async function login() {
        
    }

    async function logout() {
        localStorage.removeItem('auth')
        push('/')
    }

    return (
        <UserContext.Provider value={{
            user,
            login,
            logout
        }}>

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