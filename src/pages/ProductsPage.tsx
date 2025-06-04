import { useEffect, useState } from 'react'
import { Box, Typography, Avatar, Button, useTheme, useMediaQuery, Card, CardContent, CardMedia } from '@mui/material'
import axios from 'axios'
import { useAuth } from '../utils/AuthContext'
import StoreIcon from '@mui/icons-material/Store'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

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

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        console.log(isMobile ? '📱 Mobile' : '🖥️ Desktop')
    }, [isMobile])

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products', {//Requesição
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => setProducts(res.data))
        .catch((e) => console.error(`Error ao acessar /products:\n${e}`))
    }, [])

    const [selectedProductId, setSelectedProductId] = useState<number | null>(null)

    useEffect(() => {
    const handleClickOutside = () => setSelectedProductId(null)
    window.addEventListener('click', handleClickOutside)

    return () => {
        window.removeEventListener('click', handleClickOutside)
    }
    }, [])

    const userInfo = (
        <>
            <Avatar sx={{ width: isMobile ? '40px' : '80px', height: isMobile ? '40px' : '80px', marginBottom: '16px', color: "rgb(244, 244, 244)" }} />
            <Typography
            variant="h2"
            fontWeight="bold"
            marginBottom="16px"
            sx={{ color: 'rgb(0, 43, 86)', fontSize: isMobile ? '1.6rem' : '2rem' }}
            >
            Usuario
            </Typography>
        </>
    )

    return (
        <Box display="flex" height="100vh" flexDirection={isMobile ? 'column' : 'row'}>
        <Box
            width={isMobile ? '100%' : '280px'}
            bgcolor="rgb(244, 244, 244)"
            paddingTop={isMobile ? '16px' : '28px'}
            paddingX={isMobile ? '0px' : '18px'}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ 
                boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.37)',
                border: '1px solid rgb(164, 164, 164)',
            }}
        >
            <Box width="100%" display="flex" flexDirection={isMobile ? 'row' : 'column'} alignItems="center" justifyContent={isMobile ? 'space-between' : 'center'} paddingX={'24px'} >
                {isMobile ? (
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                        {userInfo}
                    </Box>
                ) : (
                    <>
                        {userInfo}
                    </>
                )}
                <Button variant="contained" color="secondary" onClick={logout} sx={{ 
                    marginBottom: '24px',
                    fontSize: '1rem',
                    borderRadius: '32px',
                    color: "rgb(244, 244, 244)",
                    backgroundColor: 'rgb(40, 135, 230)',
                    '&:hover': {
                        backgroundColor: 'rgb(0, 77, 154)'
                    },
                }}>
                DESLOGAR
                </Button>
            </Box>

            <Box width="100%" borderTop="1px solid #ddd"  />

            <Box display={"flex"} width="100%" alignItems={'start'} flexDirection={isMobile ? 'row' : 'column'} gap={isMobile ? '0px' : '14px'}
            sx={{
                overflowX: "auto",
                paddingX: '16px',
                paddingY: isMobile ? '8px' : '20px'
            }}
            >
                <Button fontWeight="bold" sx={{
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'rgb(0, 77, 154)',
                    '&:hover': {
                        color: 'rgb(40, 135, 230)',
                    }, 
                }}>
                    <StoreIcon fontSize="small" />
                    Produtos
                </Button>

                <Button fontWeight="bold" sx={{
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'rgb(0, 77, 154)',
                    '&:hover': {
                        color: 'rgb(40, 135, 230)',
                    },
                }}>
                    <ShoppingCartIcon fontSize="small" />
                    Carrinho
                </Button>
            </Box>
        </Box>

        <Box flex={1} overflow="auto" padding={'36px'} sx={{
            backgroundColor: 'rgb(195, 217, 240)',
        }}>
            <Box display="grid" gap={3}  gridTemplateColumns={isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))'}>
                {products.map((product) => (
                <Card key={product.id} onClick={(e) => {
                e.stopPropagation()
                setSelectedProductId(prev => prev === product.id ? null : product.id)
                }}
                sx={{ display: 'flex', flexDirection: 'column', height: '100%', boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.37)', border: '1px solid rgb(164, 164, 164)', cursor: 'pointer', }}>
                    <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    sx={{
                        padding: '12px',
                        margin: 'auto',
                        height: '100%',
                        width: '200px',
                        objectFit: 'contain',
                    }}
                    />
                    <Box>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Typography variant="h6" sx={{ color: 'rgb(0, 43, 86)', }}>{product.id} - {product.title}</Typography>

                            {selectedProductId === product.id && (
                                <>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>

                                    <Button fontWeight="bold" sx={{
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: 'rgb(0, 77, 154)',
                                        '&:hover': {
                                            color: 'rgb(40, 135, 230)',
                                        },
                                    }}>
                                        + <ShoppingCartIcon fontSize="small" />
                                    </Button>
                                </>
                            )}

                            <Typography fontWeight="bold" sx={{ color: 'rgb(0, 43, 86)', }}>
                                R$ {product.price.toFixed(2)} - {product.category}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
                ))}
            </Box>
        </Box>
        </Box>
    )
}
