// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Hooks, Clients, Global States, Configs, etc.
import axios from "axios";
import { CreateProductRegex } from "../../../regex";
import useValidations from "../../../hooks/useValidations";

// Custom Components
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import Toast from "../../../components/ui/Toast";
import NoProducts from "../../../components/dash/admin/NoProducts";
import Modal from "../../../components/ui/Modal";

// Material UI
import { Stack, Typography, Button, Container, TextField, Box } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

// Colors, Imgs, Icons, etc.    
import colors from "../../../utils/colors";
import Product from "../../../components/ui/Product";

const initForm = {
    name: '',
    price: '',
};

const AdminDash = () => {
    const [form, setForm] = useState(initForm);
    const [dataProducts, setDataProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [createProduct, setCreateProduct] = useState(false);

    const navigate = useNavigate();

    const { accionValidations, formError } = useValidations(initForm);

    const handleCreateProductClose = () => setCreateProduct(false);
    const handleCancel = () => {
        setForm(initForm);
        setCreateProduct(false);
    };

    const handleOnChange = (event) => {
        const { value, name } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleClick = async (event) => {
        event.preventDefault();

        const ok = accionValidations(form, CreateProductRegex);

        if (ok) {
            return;
        }

        try {
            const access_token = localStorage.getItem("access_token");

            const data = await axios.post(
                'http://localhost:9283/products/create',
                form,
                {
                    headers: {
                        'access-token': access_token,
                    }
                }
            );

            Toast({
                text: 'Producto creado exitosamente',
                icon: 'success',
            });

            setForm(initForm);
            setCreateProduct(false);

            window.location.reload();
        } catch (error) {
            return Toast({
                text: error?.response?.data?.msg || error?.message || 'Error al crear el producto',
                icon: 'error',
            });
        }
    };

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
        <LayoutAdmin>
            <Container maxWidth="lg" sx={{ paddingY: '20px' }}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ xs: 'left', sm: 'center' }}
                    spacing={{ xs: '8px', sm: '0' }}
                    justifyContent={{ xs: 'flex-start', sm:'space-between'}}
                >
                    <Typography
                        variant="h2"
                        color={colors.text}
                        fontSize='30px'
                        fontWeight={600}
                    >
                        Productos
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={
                            <AddOutlinedIcon
                                sx={{
                                    color: colors.white,
                                }}
                            />
                        }
                        onClick={() => setCreateProduct(true)}
                        sx={{ width:'200px' }}
                    >
                        Agregar producto
                    </Button>
                </Stack>

                {
                    dataProducts.length === 0 ?
                        <NoProducts text='No tiene productos hasta el momento' />
                        : (
                            <Stack
                                direction='row'
                                flexWrap='wrap'
                                justifyContent={{ xs: 'center', sm: 'left' }}
                                alignItems='left'
                                // spacing='14px'
                                gap='14px'
                                paddingY='30px'
                            >
                                {
                                    dataProducts?.map((product, index) => {
                                        return (
                                            <Box key={index}>
                                                <Product
                                                    name={product.name}
                                                    price={product.price}
                                                />
                                            </Box>
                                        );
                                    })
                                }
                            </Stack>
                        )
                }
            </Container>

            {/* Create Product */}
            <Modal
                modalState={createProduct}
                handleModalClose={handleCreateProductClose}
                containerWidth="xs"
                styles={{
                    padding: '22px',
                }}
            >
                <Stack
                    component='form'
                    role='form'
                >
                    {/* Name */}
                    <TextField
                        id="name"
                        name='name'
                        label="Nombre del Producto"
                        variant='standard'
                        value={form?.name}
                        error={!!formError?.name}
                        helperText={formError?.name}
                        onChange={handleOnChange}
                    />

                    {/* Price */}
                    <TextField
                        id="price"
                        name='price'
                        label="Precio"
                        variant='standard'
                        value={form?.price}
                        error={!!formError?.price}
                        helperText={formError?.price}
                        onChange={handleOnChange}
                        sx={{ marginTop: 2 }}
                    />

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems='center'
                        sx={{ marginTop: 4.5 }}
                        spacing={{ xs: 3, sm: 2 }}
                    >
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={handleCancel}
                            sx={{
                                padding: '2px 13px'
                            }}
                        >
                            Cancelar
                        </Button>

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleClick}
                        >
                            Crear
                        </Button>
                    </Stack>
                </Stack>
            </Modal>
        </LayoutAdmin>
    );
}

export default AdminDash;
