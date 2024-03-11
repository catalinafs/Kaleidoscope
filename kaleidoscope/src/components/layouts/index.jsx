// Custom Components
import Navbar from "../ui/navbar";

// Material UI
import { Stack } from "@mui/material";

// Colors, Imgs, Icons, Css, etc.
import colors from '../../utils/colors';

const Layout = ({ children }) => {
    return (
        <Stack
            minHeight='100vh'
            width='100%'
            bgcolor={colors.background}
        >
            <Navbar />
            {children}
        </Stack>
    );
}

export default Layout;
