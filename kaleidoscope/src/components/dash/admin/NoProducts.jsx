// Material UI
import { Stack, Typography } from '@mui/material';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';

// Colors, Imgs, Icons, etc.
import colors from '../../../utils/colors';

const NoProducts = ({ text = 'No productos encontrados' }) => {
    return (
        <Stack justifyContent='center' alignItems='center' minHeight='60vh'>
            <DraftsOutlinedIcon
                sx={{
                    color: colors.primary,
                    fontSize: '40px'
                }}
            />
            <Typography
                variant="h4"
                color={colors.primary}
                fontSize='25px'
                fontWeight={600}
            >
                {text}
            </Typography>
        </Stack>
    );
}

export default NoProducts;
