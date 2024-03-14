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
import { Backdrop, Box, Button, CircularProgress, Container, IconButton, Stack, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Colors, Imgs, Icons, etc.
import colors from "../../../utils/colors";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [dataProducts, setDataProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingOrder, setLoadingOrder] = useState(false);

    const navigate = useNavigate();

    const cart = JSON.parse(localStorage.getItem('cart'));

    const handleCancelBuy = () => {
        localStorage.setItem('cart', JSON.stringify([]));

        navigate('/client');
    }

    const handleCartBuy = async (event) => {
        event.preventDefault();

        const { id: idClient } = JSON.parse(localStorage.getItem('user'));

        setLoadingOrder(true);
        try {
            const response = await axios.post(
                `http://localhost:9283/orders/create/${idClient}`,
                { id_products: cart }
            );

            Toast({
                text: 'Compra exitosa',
                icon: 'success',
            });

            localStorage.setItem('cart', JSON.stringify([]));
            navigate('/client');
        } catch (error) {
            return Toast({
                text: error?.response?.data?.msg || error?.message || 'Error 400',
                icon: 'error',
            });
        } finally {
            setLoadingOrder(false);
        }
    }

    useEffect(() => {
        document.title = "Cart | Kaleidoscope";

        setLoading(true);
        (async () => {
            try {
                const arrProCart = [];
                const response = await axios.get('http://localhost:9283/products');

                for (const productID of cart) {
                    const productDetails = response.data.find((product) => { return product.id === productID });
                    arrProCart.push(productDetails);
                }

                setDataProducts(arrProCart);
            } catch (error) {
                return Toast({
                    text: error?.response?.data?.msg || error?.message || 'Error 400',
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
                            <Stack alignItems='center' paddingTop={{ xs: '25px', md: '0px' }}>
                                <Stack
                                    minWidth={{ xs: '100%', sm: '400px' }}
                                    border={`2px solid ${colors.secondary}`}
                                    padding='20px'
                                    borderRadius='18px'
                                >
                                    {
                                        dataProducts.map((product) => {
                                            return (
                                                <Stack
                                                    direction='row'
                                                    justifyContent='space-between'
                                                    marginBottom='10px'
                                                >
                                                    <Typography variant="h5" color={colors.secondary}>
                                                        {product.name}
                                                    </Typography>

                                                    <Typography variant="h5" color={colors.primary}>
                                                        {`$${product.price}`}
                                                    </Typography>
                                                </Stack>
                                            );
                                        })
                                    }

                                    <Stack
                                        direction={{ xs: 'column-reverse', sm: 'row' }}
                                        alignItems='center'
                                        sx={{ marginTop: 1.5 }}
                                        spacing={{ xs: 1, sm: 2 }}
                                    >
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={handleCancelBuy}
                                            sx={{
                                                padding: '2px 13px'
                                            }}
                                        >
                                            Eliminar Compra
                                        </Button>

                                        <Button
                                            fullWidth
                                            variant="contained"
                                            onClick={handleCartBuy}
                                        >
                                            Comprar
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        )
                }
            </Container>

            {/* Backdrop for the loading */}
            <Backdrop
                sx={{ color: colors.white, zIndex: '100' }}
                open={loadingOrder}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </LayoutClient>
    );
}

export default Cart;
