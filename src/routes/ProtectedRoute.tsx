import { Navigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

//Verifica se existe o token, se sim roda children o corpo da página produtos, se não redireciona para pagina login de volta (/)
export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { token } = useAuth()//Pega o token armazenado
    return token ? children : <Navigate to="/" />
}
