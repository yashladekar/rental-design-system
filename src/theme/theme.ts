import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        destructive: true;
        outline: true;
        ghost: true;
    }
}

// ----------------------------------------------------------------------
// 1. DESIGN TOKENS (Your Brand DNA)
// ----------------------------------------------------------------------
const palette = {
    primary: { main: '#0f172a', contrastText: '#ffffff' }, // Slate 900
    secondary: { main: '#64748b', contrastText: '#ffffff' }, // Slate 500
    error: { main: '#ef4444', contrastText: '#ffffff' }, // Red 500
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#64748b' },
    divider: '#e2e8f0', // Slate 200
};

const typography = {
    fontFamily: 'var(--font-inter), sans-serif',
    button: {
        textTransform: 'none' as const, // Kills Material uppercase
        fontWeight: 500,
    },
};

const shape = {
    borderRadius: 6, // Global border radius
};

// ----------------------------------------------------------------------
// 2. THEME CREATION & OVERRIDES
// ----------------------------------------------------------------------
export const theme = createTheme({
    palette,
    typography,
    shape,
    components: {
        // --- GLOBAL BEHAVIORS ---
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true, // Kills the ripple effect globally
            },
        },

        // --- SURFACES (Cards, Dialogs, Menus) ---
        MuiPaper: {
            defaultProps: {
                elevation: 0, // Kills all drop shadows
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    border: `1px solid ${palette.divider}`, // Replaces shadow with a flat border
                },
            },
        },

        // --- BUTTONS ---
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    padding: '8px 16px',
                    transition: 'background-color 0.2s, color 0.2s',
                },
            },
            // Inject Custom Design System Variants
            variants: [
                {
                    props: { variant: 'destructive' },
                    style: {
                        backgroundColor: palette.error.main,
                        color: palette.error.contrastText,
                        '&:hover': {
                            backgroundColor: '#dc2626', // Red 600
                        },
                    },
                },
                {
                    props: { variant: 'outline' },
                    style: {
                        backgroundColor: 'transparent',
                        border: `1px solid ${palette.divider}`,
                        color: palette.text.primary,
                        '&:hover': {
                            backgroundColor: '#f8fafc', // Slate 50
                        },
                    },
                },
                {
                    props: { variant: 'ghost' },
                    style: {
                        backgroundColor: 'transparent',
                        color: palette.text.primary,
                        '&:hover': {
                            backgroundColor: '#f8fafc',
                        },
                    },
                },
            ],
        },

        // --- INPUTS & FORMS ---
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: shape.borderRadius,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: palette.divider,
                        transition: 'border-color 0.2s',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: palette.secondary.main,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px', // Prevents the border from getting thick on focus
                        borderColor: palette.primary.main,
                    },
                },
                input: {
                    padding: '10px 14px',
                    fontSize: '0.875rem',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                    color: palette.text.secondary,
                    '&.Mui-focused': {
                        color: palette.primary.main,
                    },
                },
            },
        },

        // --- LISTS & MENUS (Dropdowns) ---
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    margin: '0 4px',
                    '&.Mui-selected': {
                        backgroundColor: '#f1f5f9', // Slate 100
                        '&:hover': {
                            backgroundColor: '#e2e8f0',
                        },
                    },
                    '&:hover': {
                        backgroundColor: '#f8fafc',
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    border: `1px solid ${palette.divider}`,
                    borderRadius: shape.borderRadius,
                    padding: '8px 12px',
                    fontSize: '0.875rem',
                    backgroundColor: 'transparent',
                    transition: 'border-color 0.2s, box-shadow 0.2s',

                    // Hover state
                    '&:hover': {
                        borderColor: palette.secondary.main,
                    },

                    // Focus state (The Shadcn inner ring)
                    '&.Mui-focused': {
                        borderColor: palette.primary.main,
                        boxShadow: `0 0 0 1px ${palette.primary.main}`,
                    },

                    // Disabled state
                    '&.Mui-disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                        backgroundColor: '#f8fafc', // Light slate
                    },
                },
                input: {
                    padding: 0, // Reset internal padding so the root handles it
                    height: 'auto',
                    '&::placeholder': {
                        color: palette.text.secondary,
                        opacity: 1, // Override MUI's default placeholder opacity
                    },
                },
            },
        },
    },
});

