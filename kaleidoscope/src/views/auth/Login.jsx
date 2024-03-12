// React
import { useEffect, useState } from 'react';

// Hooks, Clients, Global States, Configs, etc.
import useValidations from '../../hooks/useValidations';
import { LoginRegex } from '../../regex';
import axios from 'axios';

// Custom Components
import Layout from '../../components/layouts';
import Toast from '../../components/ui/Toast';

// Material UI
import { Container, Stack, Typography, TextField, Button } from '@mui/material';

// Colors, Imgs, Icons, etc.
import colors from '../../utils/colors';

const initForm = {
    email: '',
    password: '',
};

const Login = () => {
    const [form, setForm] = useState(initForm);

    useEffect(() => {
        document.title = "Login | Kaleidoscope";
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

        const ok = accionValidations(form, LoginRegex);

        if (ok) {
            return;
        }

        try {
            const data = await axios.post('http://localhost:9283/users/login', form);
            console.log(data)
            Toast({
                text: 'Acceso concedido',
                icon: 'success',
            });
        } catch (error) {
            return Toast({
                text: error.response.data.msg || error.message || 'Error 400',
                icon: 'error',
            });
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
                    >Iniciar Sesión</Typography>

                    <Stack
                        width={{ xs: '100%', sm: '325px' }}
                        component='form'
                        role='form'
                    >
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
                            sx={{ marginTop: 2 }}
                            onChange={handleOnChange}
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
        </Layout>
    );
}

export default Login;
