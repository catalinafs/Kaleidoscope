import { createTheme } from "@mui/material/styles";

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
                    "& .MuiOutlinedInput-root": {
                        fontSize: '14px',
                        fontWeight: 400,
                        color: "#444444ea",
                        borderRadius: "6px",
                        "&.Mui-disabled": {
                            backgroundColor: "#180f0c",
                        },
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
                        borderWidth: "2px",
                        ":hover": {
                            borderWidth: "2px",
                        },
                    },
                },
                {
                    props: { variant: "contained" },
                    style: {
                        color: '#ffffff',
                        backgroundColor: "#000000",
                        border: 0,
                        ":hover": {
                            backgroundColor: "#252525",
                        },
                    },
                },
            ],
            styleOverrides: {
                root: {
                    fontSize: '14px',
                    fontWeight: 400,
                    borderRadius: "6px",
                    textTransform: "none",
                    padding: "8px 16px",
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