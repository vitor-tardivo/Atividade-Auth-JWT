import { useEffect, useState } from 'react'
import { Box, Typography, Avatar, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import axios from 'axios'
import { useAuth } from '../utils/AuthContext'

interface Product {
    id: number
    title: string
    price: number
    description: string
    image: string
    category: string
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const { token, logout } = useAuth()

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => setProducts(res.data))
        .catch((e) => console.error(`Error ao acessar /products:\n${e}`))
    }, [])


    return (
        <Box display="flex" height="100vh">
        <Box
            width="280px"
            bgcolor="#f5f5f5"
            paddingTop={'32px'}
            paddingX={'18px'}
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Box width="100%" display="flex" flexDirection="column" alignItems="center">
                <Avatar sx={{ width: '80px', height: '80px', marginBottom: '16px' }} />
                <Typography variant="h2" fontWeight="bold" marginBottom={'16px'} sx={{
                    color: '#594d6f',
                    fontSize: '2rem'
                }}>Username</Typography>
                <Button variant="contained" color="secondary" onClick={logout} sx={{ 
                    marginBottom: '24px',
                    fontSize: '1rem',
                    backgroundColor: '#b388ff',
                    '&:hover': {
                        backgroundColor: '#9c66ff'
                    } 
                }}>
                LOGOUT
                </Button>
            </Box>

            <Box width="100%" borderTop="1px solid #ddd" marginY={'24px'} />

            <Box width="100%" paddingLeft={'24px'}>
                <Typography variant="subtitle2" fontWeight="bold" sx={{
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    color: '#9c66ff',
                    '&:hover': {
                        color: '#b388ff',
                    } 
                }}>
                Produtos
                </Typography>
            </Box>
        </Box>

        <Box flex={1} overflow="auto" padding={'36px'} sx={{
                backgroundColor: '#eee8f5',
            
        }}>
            <TableContainer component={Paper}>
            <Table stickyHeader>
                <TableHead>
                <TableRow>
                    <TableCell sx={{
                        backgroundColor: '#f8f5fd',
                        color: '#594d6f'
                    }}>ID</TableCell>
                    <TableCell sx={{
                        backgroundColor: '#f8f5fd',
                        color: '#594d6f'
                    }}>Título</TableCell>
                    <TableCell sx={{
                        backgroundColor: '#f8f5fd',
                        color: '#594d6f'
                    }}>Preço</TableCell>
                    <TableCell sx={{
                        backgroundColor: '#f8f5fd',
                        color: '#594d6f'
                    }}>Categoria</TableCell>
                    <TableCell sx={{
                        backgroundColor: '#f8f5fd',
                        color: '#594d6f'
                    }}>Descrição</TableCell>
                    <TableCell sx={{
                        backgroundColor: '#f8f5fd',
                        color: '#594d6f'
                    }}>Imagem</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {products.map((product) => (
                    <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.description.slice(0, 80)}...</TableCell>
                    <TableCell>
                        <img src={product.image} alt={product.title} width={'50px'} />
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
        </Box>
    )
}
