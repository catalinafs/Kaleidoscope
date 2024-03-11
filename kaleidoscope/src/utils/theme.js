import { createTheme } from "@mui/material/styles";
import colors from "./colors";

const theme = createTheme({
    palette: {
        primary: {
            main: "#06091C",
            contrastText: "#DCDDF2",
        },
        secondary: {
            main: '#37718E'
        }
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
    components: {
        MuiTypography: {
            defaultProps: {
                fontWeight: 400,
            },
        },
        MuiSkeleton: {
            defaultProps: {
                animation: "wave",
            },
            styleOverrides: {
                root: {
                    "-webkit-transform": "scale(1)",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    color: '#444444ea',
                    '&::placeholder': {
                        color: '#444444ea',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInput-underline": {
                        fontSize: '14px',
                        fontWeight: 400,
                        color: colors.text,
                        borderColor: '#394898',
                        borderRadius: "6px",
                        "&.Mui-disabled": {
                            backgroundColor: "#394898",
                        },
                    },
                    '.MuiFormLabel-root': {
                        color: colors.primary,
                    },
                    ".css-1uktm3m-MuiInputBase-root-MuiInput-root:hover" : {
                        borderBottomColor: colors.primary,
                    },
                    ".css-1uktm3m-MuiInputBase-root-MuiInput-root::after": {
                        borderBottomColor: colors.primary,
                    },
                    '.css-1uktm3m-MuiInputBase-root-MuiInput-root::before': {
                        borderBottomColor: colors.primary,
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    color: "#5A5A5A",
                    fontSize: '14px',
                    border: '1px solid #fff',
                    ':hover': {
                        border: '1px solid #fff',
                    },
                    '.MuiSelect-select': {
                        border: '1px solid #fff',
                    }
                },
                filled: {
                    fontSize: '14px',
                    color: "#5A5A5A",
                    border: '1px solid #fff',
                    ':hover': {
                        border: '1px solid #fff',
                    },
                    '.MuiSelect-select': {
                        border: '1px solid #fff',
                    }
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    minWidth: 223,
                },
            },
        },
        MuiButton: {
            defaultProps: {
                variant: "outlined",
            },
            variants: [
                {
                    props: { variant: "outlined" },
                    style: {
                        borderColor: colors.primary,
                        color: colors.primary,
                        borderWidth: "2px",
                        ":hover": {
                            borderWidth: "2px",
                            borderColor: "#4a94b9",
                            color: '#4a94b9',
                        },
                    },
                },
                {
                    props: { variant: "contained" },
                    style: {
                        color: colors.white,
                        backgroundColor: colors.secondary,
                        border: 0,
                        boxShadow: 'none',
                        ":hover": {
                            boxShadow: 'none',
                            backgroundColor: "#3ea089",
                        },
                    },
                },
            ],
            styleOverrides: {
                root: {
                    fontSize: '15px',
                    fontWeight: 400,
                    borderRadius: "25px",
                    textTransform: "none",
                    padding: "4px 18px",
                },
            },
        },
        MuiPagination: {
            variants: [
                {
                    props: { variant: "text" },
                    style: {
                        color: '#ffffff',
                        '& .Mui-selected': {
                            backgroundColor: '#ffffff',
                            border: '1px solid #000',
                        },
                    },
                },
            ],
            styleOverrides: {
                root: {
                    color: '#ffffff',
                    '& .Mui-selected': {
                        backgroundColor: '#ffffff',
                        border: '1px solid #000',
                    },
                },
            },
        }
    },
});

export default theme;