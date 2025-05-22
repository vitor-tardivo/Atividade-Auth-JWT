import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Container, Typography, Card, CardContent, Box } from '@mui/material'
import axios from 'axios'
import { useAuth } from '../utils/AuthContext'

export default function LoginPage() {
    //Dados login
    const [username, setUsername] = useState('')//mor_2314 
    const [password, setPassword] = useState('')//83r5^_
    
    const { setToken } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await axios.post('https://fakestoreapi.com/auth/login', {//Requesição
                username,
                password,
            })
            setToken(res.data.token)//Salva o Token
            console.log(res)
            console.log(`Token:\nBearer ${res.data.token}`)
            navigate('/produtos')//Redireciona a Página produtos
        } catch (e) {
            alert(`Error ao Logar:\n${e}`)
            console.error(`Error ao Logar:\n${e}`)
        }
    }

    return (
        <Container maxWidth="sm" sx={{ 
                marginTop: '6vw', 
            }}>
            <Card sx={{
            borderRadius: '16px',
            boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.37)',
            paddingY: '12px'
            }}>
                <CardContent>
                    <Typography variant="h1" align='center' sx={{
                        fontWeight: 'bold',
                        fontSize: '2.4rem'
                    }}>Login</Typography>

                    <Box display="flex" justifyContent="center" marginTop={'32px'}>
                        <TextField label="user" value={username} onChange={(e) => setUsername(e.target.value)} sx={{
                            borderRadius: '12px',
                            boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.37)',
                            transformOrigin: 'center',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                fontSize: '1.2rem',
                                width: '370px'
                            }
                        }}/>    
                    </Box>

                    <Box display="flex" justifyContent="center" marginTop={'22px'}>
                        <TextField label="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{
                            borderRadius: '12px',
                            boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.37)',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                fontSize: '1.2rem',
                                width: '370px'
                            }
                        }}/>
                    </Box>

                    <Box display="flex" justifyContent="center" marginTop={'32px'}>
                        <Button variant="contained" onClick={handleLogin} sx={{
                            backgroundColor: '#b388ff',
                            '&:hover': {
                                backgroundColor: '#9c66ff'
                            },
                            borderRadius: '32px',
                            boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.37)',
                            paddingX: '36px',
                            fontSize: '1.3rem'
                        }}>LOGIN</Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}
