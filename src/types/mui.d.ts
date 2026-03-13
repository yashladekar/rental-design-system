// src/types/mui.d.ts
import '@mui/material/Button';

declare module '@mui/material/Button' {
    // This interface allows you to add custom variants to the MUI Button component
    // We match the exact names of the variants we defined in src/theme/theme.ts
    interface ButtonPropsVariantOverrides {
        destructive: true;
        outline: true;
        ghost: true;
    }
}