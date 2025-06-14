import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './utils/AuthContext'
import LoginPage from './pages/LoginPage'
import ProductsPage from './pages/ProductsPage'
import ProtectedRoute from './routes/ProtectedRoute'
import { CssBaseline, GlobalStyles } from '@mui/material'

export default function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
          },
          html: {
            height: '100%',
          },
          body: {
            backgroundColor: 'rgb(195, 217, 240)',
            height: '100%',
          },
          '#root': {
            height: '100%',
          }
        }}
      />
      <AuthProvider /* Fornece dados de login a toda aplicação páginas */>
        <Routes /* Páginas */>
          <Route path="/" element={<LoginPage />} /* Página login *//> 
          <Route /* Página produtos */
            path="/produtos"
            element={
              <ProtectedRoute /* Valida a entrada na pagina produtos */>
                <ProductsPage /* Conteudo pagina produtos *//>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  )
}
