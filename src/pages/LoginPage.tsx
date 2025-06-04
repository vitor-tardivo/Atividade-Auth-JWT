import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Container, Typography, Card, CardContent, Box, InputAdornment, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios'
import { useAuth } from '../utils/AuthContext'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'


export default function LoginPage() {
    //Dados login
    const [username, setUsername] = useState('mor_2314')//mor_2314
    const [password, setPassword] = useState('83r5^_')//83r5^_
    
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

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        console.log(isMobile ? '📱 Mobile' : '🖥️ Desktop')
    }, [isMobile])

    return (
        <Container sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: isMobile ? 'start' : 'center',
                width:"100%",
                height: '100%',
                padding: '16px'
            }}>
            <Card sx={{
            borderRadius: '16px',
            backgroundColor: 'rgb(244, 244, 244)',
            boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.37)',
            border: '1px solid rgb(164, 164, 164)',
            paddingY: '12px',
            paddingX: isMobile ? '18px' : '32px'
            }}>
                <CardContent>
                    <Box display="flex" justifyContent="center">
                        <Typography variant="h1" align='center' sx={{
                            fontWeight: 'bold',
                            fontSize: '2.4rem',
                            color: 'rgb(43, 43, 43)',
                            //textShadow: '0px 0px 6px rgba(0, 0, 0, 0.37)',
                        }}>Login do usuario</Typography>
                    </Box>

                    <Box display="flex" justifyContent="center" marginTop={'32px'}>
                        <TextField label="usuario" type='text' value={username} onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <PersonIcon />
                                </InputAdornment>
                            ),
                        }} 
                        sx={{
                            borderRadius: '12px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                fontSize: '1.2rem',
                            }
                        }}/>    
                    </Box>

                    <Box display="flex" justifyContent="center" marginTop={'22px'}>
                        <TextField label="senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            borderRadius: '12px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                fontSize: '1.2rem',
                            }
                        }}/>
                    </Box>

                    <Box display="flex" justifyContent="center" marginTop={'32px'}>
                        <Button variant="contained" onClick={handleLogin} sx={{
                            color: 'rgb(244, 244, 244)',
                            backgroundColor: 'rgb(40, 135, 230)',
                            '&:hover': {
                                backgroundColor: 'rgb(0, 77, 154)'
                            },
                            borderRadius: '32px',
                            paddingX: '36px',
                            fontSize: '1.3rem'
                        }}>LOGAR</Button>
                    </Box>

                    <Box display="flex" justifyContent="center" marginTop={'28px'}>
                        <Button align='center'sx={{
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            color: 'rgb(215, 16, 16)',
                            '&:hover': {
                                color: 'black',
                            }
                        }}>Problemas com login?</Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}
