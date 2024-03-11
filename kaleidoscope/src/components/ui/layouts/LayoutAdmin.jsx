// Custom Components
import Navbar from "../navbar";

// Material UI
import { Stack } from "@mui/material";

// Colors, Imgs, Icons, Css, etc.
import colors from '../../../utils/colors';

const LayoutAdmin = ({ children }) => {
    return (
        <Stack
            minHeight='100vh'
            width='100%'
            bgcolor={colors.background}
            paddingLeft={{ xs: '58px', md: '260px' }}
        >
            <Navbar />
            {children}
        </Stack>
    );
}

export default LayoutAdmin;
