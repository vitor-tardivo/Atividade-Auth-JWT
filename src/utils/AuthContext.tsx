import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
    token: string | null
    setToken: (token: string | null) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token')
    )

    const saveToken = (newToken: string | null) => {
        if (newToken) {
            localStorage.setItem('token', newToken)
        } else {
            localStorage.removeItem('token')
        }
        setToken(newToken)
    }

    const logout = () => saveToken(null)

    return (
        <AuthContext.Provider value={{ token, setToken: saveToken, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth deve estar dentro de AuthProvider')
    return context
}
