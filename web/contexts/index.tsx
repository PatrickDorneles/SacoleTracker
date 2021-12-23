import { useUser } from "./user"

export const GlobalContextProvider: React.FC = ({ children }) => {
    const { UserProvider } = useUser()
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}