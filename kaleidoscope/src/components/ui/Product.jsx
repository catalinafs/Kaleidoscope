// Hooks, Clients, Global States, etc.
import useCapitalize from "../../hooks/useCapitalize";

// Material UI
import {
    Stack,
    Typography,
} from "@mui/material";

// Colors, Imgs, Icons, etc.
import colors from "../../utils/colors";

const Product = ({ name, price }) => {
    return (
        <Stack
            border={`1px solid ${colors.primary}`}
            borderRadius='12px'
            padding='12px 30px 12px 12px'
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
