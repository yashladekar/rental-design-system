'use client';

import * as React from 'react';
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';
import { cn } from '@/lib/utils';

// 1. Restrict the MUI API
type RestrictedMuiProps = Omit<MuiChipProps, 'color' | 'variant' | 'size'>;

// 2. Define Your Design System API
export interface BadgeProps extends RestrictedMuiProps {
    /**
     * The visual style of the badge.
     * @default "default"
     */
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    className?: string;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant = 'default', sx, ...props }, ref) => {

        // 3. Map our custom variants to MUI styling
        const variantStyles = {
            default: {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                border: '1px solid transparent',
                '&:hover': {
                    backgroundColor: '#334155', // Slate 700 hover
                },
            },
            secondary: {
                backgroundColor: '#f1f5f9', // Slate 100
                color: '#0f172a',           // Slate 900
                border: '1px solid transparent',
                '&:hover': {
                    backgroundColor: '#e2e8f0', // Slate 200 hover
                },
            },
            destructive: {
                backgroundColor: 'error.main',
                color: 'error.contrastText',
                border: '1px solid transparent',
                '&:hover': {
                    backgroundColor: '#dc2626', // Red 600 hover
                },
            },
            outline: {
                backgroundColor: 'transparent',
                color: 'text.primary',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                    backgroundColor: 'transparent', // Outlines usually don't have bg hovers in Shadcn
                },
            },
        };

        return (
            <MuiChip
                ref={ref}
                className={cn(
                    'ds-badge',
                    // If a developer tries to make it clickable by passing onClick, 
                    // we ensure it gets a pointer cursor.
                    props.onClick && 'cursor-pointer',
                    className
                )}
                // We set size small by default to match Shadcn's compact look
                size="small"
                sx={{
                    borderRadius: 4, // 16px radius for a pill shape
                    fontWeight: 600,
                    fontSize: '0.75rem', // text-xs
                    height: '22px',      // Fixed height for consistency

                    // Override MUI's internal label padding
                    '& .MuiChip-label': {
                        paddingX: 1.25, // 10px horizontal padding
                    },

                    // Apply the selected variant styles
                    ...variantStyles[variant],
                    ...sx,
                }}
                {...props}
            />
        );
    }
);

Badge.displayName = 'Badge';