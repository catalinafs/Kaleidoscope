// React
import { useEffect, useState } from "react";

// Hooks, Clients, Global States, Configs, etc.
import axios from "axios";

// Custom Components
import NoProducts from "../../../components/dash/admin/NoProducts";
import LayoutClient from "../../../components/layouts/LayoutClient";
import Toast from "../../../components/ui/Toast";
import Product from "../../../components/ui/Product";

// Material UI
import { Box, Container, IconButton, Stack } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Colors, Imgs, Icons, etc.
import colors from "../../../utils/colors";

const ClientProducts = () => {
    const [dataProducts, setDataProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAddCart = (event, productID) => {
        event.preventDefault();

        const cart = JSON.parse(localStorage.getItem('cart'));

        cart.push(Number(productID));

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    useEffect(() => {
        document.title = "Products | Kaleidoscope";

        setLoading(true);
        (async () => {
            try {
                const response = await axios.get('http://localhost:9283/products');
                setDataProducts(response.data);
            } catch (error) {
                return Toast({
                    text: error.response.data.msg || error.message || 'Error 400',
                    icon: 'error',
                });
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return (<NoProducts text='Cargando ...' />);

    return (
        <LayoutClient>
            <Container maxWidth="lg">
                {
                    dataProducts.length === 0 ?
                        <NoProducts text='No tiene productos hasta el momento' />
                        : (
                            <Stack
                                direction='row'
                                flexWrap='wrap'
                                justifyContent={{ xs: 'center', sm: 'left' }}
                                alignItems='left'
                                gap='14px'
                                paddingY='30px'
                            >
                                {
                                    dataProducts?.map((product, index) => {
                                        return (
                                            <Box
                                                key={index}
                                                sx={{ position: 'relative' }}
                                            >
                                                <Product
                                                    name={product.name}
                                                    price={product.price}
                                                />

                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={(event) => handleAddCart(event, product.id)}
                                                    sx={{
                                                        color: colors.primary,
                                                        position: 'absolute',
                                                        top: '0',
                                                        right: '0',
                                                        background: 'none',
                                                        padding: '6px 6px',
                                                    }}
                                                >
                                                    <AddShoppingCartIcon sx={{ fontSize: '19px' }} />
                                                </IconButton>
                                            </Box>
                                        );
                                    })
                                }
                            </Stack>
                        )
                }
            </Container>
        </LayoutClient>
    );
}

export default ClientProducts;
