'use client';

import * as React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { cn } from '@/lib/utils'; // Assuming you have your clsx utility here

// 1. Restrict the MUI API
// We omit MUI's native 'color' and 'variant' so developers can't accidentally 
// use a default Material look (like color="secondary" or variant="contained").
type RestrictedMuiProps = Omit<MuiButtonProps, 'color' | 'variant'>;

// 2. Define Your Design System API
// We explicitly define only the variants that exist in your theme.ts
export interface ButtonProps extends RestrictedMuiProps {
    /**
     * The visual style of the button.
     * @default "default"
     */
    variant?: 'default' | 'destructive' | 'outline' | 'ghost';
    /**
     * An optional custom class name that will be merged with MUI's classes.
     */
    className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', ...props }, ref) => {

        // 3. Map our "default" variant to MUI's native "contained" variant.
        // MUI doesn't have a "default" variant, so we map it internally. 
        // The rest (destructive, outline, ghost) match the custom variants in theme.ts exactly.
        const muiVariant = variant === 'default' ? 'contained' : variant;

        return (
            <MuiButton
                ref={ref}
                variant={muiVariant}
                // Merge any external classes (like Tailwind or standard CSS) seamlessly
                className={cn(className)}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';