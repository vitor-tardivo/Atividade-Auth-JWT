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
            height: '100%',
          },
          '#root': {
            height: '100%',
          }
        }}
      />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/produtos"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  )
}
