// React
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

// Material UI
import {
    AppBar,
    Avatar,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

// Colors, Imgs, Icons, Css, etc.
import colors from "../../../utils/colors";

const NavBarClient = () => {
    const [anchorElUser, setAnchorElUser] = useState();
    const [anchorAccount, setAnchorAccount] = useState();

    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);
    const handleOpenAccount = (event) => setAnchorAccount(event.currentTarget);
    const handleCloseAccount = () => setAnchorAccount(null);

    return (
        <AppBar
            position='sticky'
            elevation={0}
            sx={{
                background: colors.background,
                boxShadow: 'none',
            }}
        >
            <Container
                maxWidth='lg'
                sx={{ padding: { xs: '0 15px', sm: '4px 23px' } }}
            >
                <Toolbar
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0px',
                    }}
                >
                    <Link
                        href='/'
                        style={{
                            fontSize: '25px',
                            fontWeight: 'bold',
                            width: '228px',
                            color: colors.secondary,
                            textDecoration: 'none',
                        }}
                    >
                        Kaleidoscope
                    </Link>

                    <Stack
                        display={{ xs: 'none', md: 'flex' }}
                        direction='row'
                        spacing='10px'
                        paddingRight='110px'
                    >
                        <Typography
                            variant="h3"
                            color={colors.primary}
                            fontSize='18px'
                            fontWeight={500}
                            component={Link}
                            sx={{
                                textDecoration: 'none',
                                ':hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Productos
                        </Typography>
                        <Typography
                            variant="h3"
                            color={colors.primary}
                            fontSize='18px'
                            fontWeight={500}
                            component={Link}
                            sx={{
                                textDecoration: 'none',
                                ':hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Carrito
                        </Typography>
                    </Stack>

                    <Box
                        sx={{
                            flexGrow: 0,
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        <Tooltip title="Open settings" onClick={handleOpenUserMenu}>
                            <MenuIcon sx={{ color: colors.secondary }} />
                        </Tooltip>
                        <Menu
                            sx={{ mt: '30px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem
                                sx={{ padding: { xs: '0px 5px', md: '2px 8px' } }}
                                onClick={() => { return navigate('/client/products') }}
                            >
                                <Typography
                                    variant="body1"
                                    color={colors.primary}
                                >
                                    Productos
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                sx={{ padding: { xs: '0px 5px', md: '2px 8px' } }}
                                onClick={() => { return navigate('/client/cart') }}
                            >
                                <Typography
                                    variant="body1"
                                    color={colors.primary}
                                >
                                    Carrito
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                sx={{ padding: { xs: '0px 5px', md: '2px 8px' } }}
                                onClick={() => { return navigate('/client') }}
                            >
                                <Typography
                                    variant="body1"
                                    color={colors.primary}
                                >
                                    Eliminar cuenta
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'block' } }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenAccount} sx={{ p: 0, }}>
                                <Avatar
                                    alt={`Catalina Forero`}
                                    src="/static/images/avatar/2.jpg"
                                    sx={{ backgroundColor: colors.primary }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorAccount}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorAccount)}
                            onClose={handleCloseAccount}
                        >
                            <MenuItem
                                sx={{ padding: { xs: '0px 5px', md: '2px 8px' } }}
                                onClick={() => { return navigate('/client') }}
                            >
                                <Typography textAlign="center">Eliminar cuenta</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBarClient;
