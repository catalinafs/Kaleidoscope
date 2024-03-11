// React
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Material UI
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Stack,
    useMediaQuery,
    useTheme,
    Tooltip,
    Button,
    Menu,
    MenuItem,
} from '@mui/material';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import OutputIcon from '@mui/icons-material/Output';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import RocketOutlinedIcon from '@mui/icons-material/RocketOutlined';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';

// Colors, Imgs, Icons, etc.
import colors from '../../../utils/colors';

const Links = [
    {
        id: 1,
        icon: <RocketOutlinedIcon sx={{ fontSize: { xs: '22px', md: '24px' } }} />,
        text: 'Dashboard',
        linkNav: '/login',
    },
    {
        id: 2,
        icon: <PaymentRoundedIcon sx={{ fontSize: { xs: '22px', md: '24px' } }} />,
        text: 'Facturación y pagos',
        linkNav: '/admin/payments',
    },
    {
        id: 3,
        icon: <UpdateRoundedIcon sx={{ fontSize: { xs: '22px', md: '24px' } }} />,
        text: 'Reportes de visita',
        linkNav: '/admin/records',
    },
];

const NavBarAdmin = () => {
    const [anchorElUser, setAnchorElUser] = useState();

    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const drawerWidth = md ? 260 : 58;

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (
        <>
            <Drawer
                sx={{
                    backgroundColor: colors.primary,
                    width: drawerWidth,
                    overflow: 'hidden',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '& .MuiDrawer-paper': {
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        backgroundColor: colors.primary,
                        borderRight: '0px solid transparent',
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    zIndex: '1',
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    {
                        Links.map(({ id, icon, text, linkNav }) => {
                            const isActive = window.location.pathname.startsWith(linkNav) ? {
                                borderRight: `4px solid ${colors.accent}`,
                                color: colors.background,
                            } : {
                                color: colors.background,
                            };

                            return (
                                <Link
                                    key={id}
                                    href={linkNav}
                                    style={{
                                        textDecoration: 'none',
                                    }}
                                >
                                    <ListItem
                                        disablePadding
                                        sx={isActive}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon sx={{ color: isActive.color }}>
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                sx={{
                                                    display: { xs: 'none', md: 'block' }
                                                }}
                                                primary={
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontSize: '15px',
                                                            fontWeight: 500,
                                                            color: isActive.color,
                                                        }}
                                                    >
                                                        {text}
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            );
                        })
                    }
                </List>

                <Tooltip
                    title="Menu"
                    placement="right-start"
                    onClick={handleOpenUserMenu}
                >
                    <Stack
                        paddingX={{ xs: 1, lg: 2 }}
                        paddingY={3}
                        direction='row'
                        justifyContent='space-between'
                        alignItems='flex-start'
                    >
                        <Stack spacing='4px' display={{ xs: 'none', md: 'flex' }}>
                            <Typography
                                variant="h6"
                                color={colors.background}
                                fontSize='15px'
                                fontWeight='600'
                            >
                                Catalina Forero
                            </Typography>
                            <Typography
                                variant="h6"
                                color={colors.background}
                                fontSize='14px'
                            >
                                catalinaforerosuarez@gmail.com
                            </Typography>
                        </Stack>

                        <NavigateNextRoundedIcon
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                color: colors.background,
                            }}
                        />
                    </Stack>
                </Tooltip>
                <Menu
                    sx={{ ml: '115px', mt: '8px' }}
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
                    <MenuItem sx={{ padding: 0 }}>
                        <Button
                            variant="text"
                            startIcon={<OutputIcon />}
                            sx={{
                                color: colors.error,
                                paddingTop: 0,
                                paddingBottom: 0,
                            }}
                        >
                            Log Out
                        </Button>
                    </MenuItem>
                </Menu>
            </Drawer >
        </>
    );
}

export default NavBarAdmin;