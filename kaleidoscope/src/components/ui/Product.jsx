// React
import { Link } from "react-router-dom";

// Hooks, Clients, Global States, etc.
import useCapitalize from "../../hooks/useCapitalize";

// Material UI
import {
    Stack,
    Typography,
    styled
} from "@mui/material";

// Colors, Imgs, Icons, etc.
import colors from "../../utils/colors";

const LinkNoStyles = styled(Link)({
    textDecoration: 'none',
});

const Product = ({ name, price }) => {
    return (
        <Stack
            border={`1px solid ${colors.primary}`}
            borderRadius='12px'
            padding='12px'
            minWidth='100px'
            spacing='3px'
        >
            <Typography
                variant="h3"
                color={colors.secondary}
                fontSize='20px'
                fontWeight={600}
            >
                {useCapitalize(name)}
            </Typography>
            <Typography
                variant="h5"
                color="initial"
                fontSize='17px'
                fontWeight={500}
            >
                {`$${price}`}
            </Typography>
        </Stack>
    );
}

export default Product;
