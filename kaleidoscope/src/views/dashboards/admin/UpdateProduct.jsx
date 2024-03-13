// React
import { useEffect, useState } from "react";

// Hooks, Clients, Global States, Configs, etc.
import axios from "axios";

// Custom Components
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import NoProducts from "../../../components/dash/admin/NoProducts";
import Product from "../../../components/ui/Product";
import Toast from "../../../components/ui/Toast";

// Material UI
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

// Colors, Imgs, Icons, etc.
import colors from "../../../utils/colors";
import Modal from "../../../components/ui/Modal";
import useValidations from "../../../hooks/useValidations";
import { CreateProductRegex } from "../../../regex";

const initForm = {
    name: '',
    price: '',
};

const UpdateProduct = () => {
    const [dataProducts, setDataProducts] = useState([]);
    const [form, setForm] = useState(initForm);
    const [productId, setProductId] = useState([]);
    const [updateModal, setUpdateModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const { accionValidations, formError } = useValidations(initForm);

    const handleUpdate = async (event, productID) => {
        event.preventDefault();

        setProductId(productID);

        const product = dataProducts.find(product => product.id === productID);

        setForm({
            name: product.name,
            price: product.price,
        });

        setUpdateModal(true);
    }

    const updateModalClose = () => {
        setForm(initForm);
        setUpdateModal(false);
    }

    const handleOnChange = (event) => {
        const { value, name } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    }

    const handleUpdateForm = async (event) => {
        event.preventDefault();

        const ok = accionValidations(form, CreateProductRegex);

        if (ok) {
            return;
        }

        setLoadingUpdate(true);

        try {
            const access_token = localStorage.getItem("access_token");

            const responseUpdate = await axios.patch(
                `http://localhost:9283/products/update/${productId}`,
                form,
                {
                    headers: {
                        'access-token': access_token,
                    },
                }
            );

            const response = await axios.get('http://localhost:9283/products');
            setDataProducts(response.data);

            setUpdateModal(false);
            Toast({
                text: 'Producto actualizado correctamente',
                icon: 'success',
            });
        } catch (error) {
            return Toast({
                text: error?.response?.data?.msg || error?.message || 'Error al actualizar el producto',
                icon: 'error',
            });
        } finally {
            setLoadingUpdate(false);
        }
    }

    useEffect(() => {
        document.title = "Update Product | Kaleidoscope";

        setLoading(true);
        (async () => {
            try {
                const response = await axios.get('http://localhost:9283/products');
                setDataProducts(response.data);
            } catch (error) {
                return Toast({
                    text: error?.response?.data?.msg || error?.message || 'Error al traer los productos',
                    icon: 'error',
                });
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return (<NoProducts text='Cargando ...' />);

    return (
        <LayoutAdmin>
            <Container maxWidth="lg" sx={{ paddingY: '18px' }}>
                <Typography
                    variant="h2"
                    color={colors.text}
                    fontSize='30px'
                    fontWeight={600}
                >
                    Actualizar un producto
                </Typography>

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
                                                    onClick={(event) => handleUpdate(event, product.id)}
                                                    sx={{
                                                        color: colors.primary,
                                                        position: 'absolute',
                                                        top: '0',
                                                        right: '0',
                                                        background: 'none',
                                                        padding: '3px 4px',
                                                    }}
                                                >
                                                    <UpdateIcon />
                                                </IconButton>
                                            </Box>
                                        );
                                    })
                                }
                            </Stack>
                        )
                }
            </Container>

            {/* Update Modal */}
            <Modal
                modalState={updateModal}
                handleModalClose={updateModalClose}
                containerWidth="xs"
            >
                <Stack>
                    {/* Product Name */}
                    <TextField
                        id="name"
                        name='name'
                        label="Nombre del producto"
                        variant='standard'
                        value={form?.name}
                        error={!!formError?.name}
                        helperText={formError?.name}
                        onChange={handleOnChange}
                        sx={{ marginTop: 2 }}
                    />

                    {/* Product Price */}
                    <TextField
                        id="price"
                        name='price'
                        label="Precio del producto"
                        variant='standard'
                        value={form?.price}
                        error={!!formError?.price}
                        helperText={formError?.price}
                        onChange={handleOnChange}
                        sx={{ marginTop: 2 }}
                    />

                    <Button
                        sx={{ marginTop: 4 }}
                        variant="contained"
                        onClick={handleUpdateForm}
                    >
                        Ingresar
                    </Button>
                </Stack>
            </Modal>

            {/* Backdrop for the loading */}
            <Backdrop
                sx={{ color: colors.white, zIndex: '100' }}
                open={loadingUpdate}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </LayoutAdmin>
    );
}

export default UpdateProduct;
