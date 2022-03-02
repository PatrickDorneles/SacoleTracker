import { useLoading } from "./LoadingContext"
import { useUser } from "./UserContext"

export const GlobalContextProvider: React.FC = ({ children }) => {
    const { UserProvider } = useUser()
    const { LoadingProvider } = useLoading()

    return (
        <LoadingProvider>
            <UserProvider>
                    {children}
            </UserProvider>
        </LoadingProvider>
    )
}