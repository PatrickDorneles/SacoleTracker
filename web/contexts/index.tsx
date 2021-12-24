import { useUser } from "./UserContext"

export const GlobalContextProvider: React.FC = ({ children }) => {
    const { UserProvider } = useUser()
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}