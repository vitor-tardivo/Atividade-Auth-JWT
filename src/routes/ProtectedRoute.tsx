import { Navigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { token } = useAuth()
    return token ? children : <Navigate to="/" />
}
