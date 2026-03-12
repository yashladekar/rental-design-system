"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

type ThemeProviderProps = {
    children: React.ReactNode;
};

export default function MuiThemeProvider({ children }: ThemeProviderProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}