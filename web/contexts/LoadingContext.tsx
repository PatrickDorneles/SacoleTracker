import { createContext, useContext, useState } from "react";

const LoadingContext = createContext({} as {
    loading: boolean,
    startLoading: () => void,
    stopLoading: () => void
})

const LoadingProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(false)

    return <LoadingContext.Provider
        value={{
            loading,
            startLoading() {
                setLoading(true)
            },
            stopLoading() {
                setLoading(false)
            }
        }}
    >
        {children}
    </LoadingContext.Provider>
}

export function useLoading() {
    const context = useContext(LoadingContext)

    return {
        ...context,
        LoadingProvider
    }
}