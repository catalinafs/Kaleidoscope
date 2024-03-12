// React
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hooks, Clients, Global States, Configs, etc.
import useValidations from '../../hooks/useValidations';
import { RegisterRegex } from '../../regex';
import axios from 'axios';

// Custom Components
import Layout from '../../components/layouts';
import Toast from '../../components/ui/Toast';
import SelectField from '../../components/forms/SelectField';

// Material UI
import {
    Container,
    Stack,
    Typography,
    TextField,
    Button,
    Backdrop,
    CircularProgress
} from '@mui/material';

// Colors, Imgs, Icons, etc.
import colors from '../../utils/colors';

const initForm = {
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
};

const Register = () => {
    const [form, setForm] = useState(initForm);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Register | Kaleidoscope";
    }, []);

    const { accionValidations, formError } = useValidations(initForm);

    const handleOnChange = (event) => {
        const { value, name } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleClick = async (event) => {
        event.preventDefault();

        const ok = accionValidations(form, RegisterRegex);

        if (ok) {
            return;
        }

        setLoading(true);

        try {
            const data = await axios.post('http://localhost:9283/users/register', form);

            setForm(initForm);

            Toast({
                text: 'Acceso concedido',
                icon: 'success',
            });

            navigate('/login');
        } catch (error) {
            console.log(error);
            return Toast({
                text: error.response.data.msg || error.message || 'Error 400',
                icon: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Container maxWidth="lg">
                <Stack alignItems='center' paddingTop='90px'>
                    <Typography
                        variant="h1"
                        color={colors.primary}
                        fontSize='25px'
                        fontWeight={600}
                        paddingBottom={3}
                    >Registro</Typography>

                    <Stack
                        width={{ xs: '100%', sm: '325px' }}
                        component='form'
                        role='form'
                    >
                        {/* Name */}
                        <TextField
                            id="name"
                            name='name'
                            label="Nombre"
                            variant='standard'
                            value={form?.name}
                            error={!!formError?.name}
                            helperText={formError?.name}
                            onChange={handleOnChange}
                        />

                        {/* Email */}
                        <TextField
                            id="email"
                            name='email'
                            label="Correo"
                            variant='standard'
                            value={form?.email}
                            error={!!formError?.email}
                            helperText={formError?.email}
                            onChange={handleOnChange}
                            sx={{ marginTop: 2 }}
                        />

                        {/* Phone */}
                        <TextField
                            id="phone"
                            name='phone'
                            label="Numero Telefonico"
                            variant='standard'
                            value={form?.phone}
                            error={!!formError?.phone}
                            helperText={formError?.phone}
                            onChange={handleOnChange}
                            sx={{ marginTop: 2 }}
                        />

                        {/* Role */}
                        <SelectField
                            label='Role'
                            nameFiled='role'
                            options={[
                                { id: 1, text: 'admin' },
                                { id: 2, text: 'client' },
                            ]}
                            eventOnChange={handleOnChange}
                            valueState={form?.role}
                            helper={formError?.role}
                            err={!!formError?.role}
                        />

                        {/* Password */}
                        <TextField
                            id="password"
                            name='password'
                            label="Contraseña"
                            variant='standard'
                            value={form?.password}
                            error={!!formError?.password}
                            helperText={formError?.password}
                            onChange={handleOnChange}
                            sx={{ marginTop: 2 }}
                        />

                        <Button
                            sx={{ marginTop: 4 }}
                            variant="contained"
                            onClick={handleClick}
                        >
                            Ingresar
                        </Button>
                    </Stack>
                </Stack>
            </Container>

            {/* Backdrop for the loading */}
            <Backdrop
                sx={{ color: colors.white, zIndex: '100' }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Layout>
    );
}

export default Register;
