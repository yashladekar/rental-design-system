'use client';

import * as React from 'react';
import {
    Alert as MuiAlert,
    AlertProps as MuiAlertProps,
    AlertTitle as MuiAlertTitle,
    AlertTitleProps as MuiAlertTitleProps,
    Typography,
    TypographyProps
} from '@mui/material';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

// ----------------------------------------------------------------------
// 1. Alert (Root Wrapper)
// ----------------------------------------------------------------------

// We redefine the variants to match our Shadcn-style design system
export type AlertVariant = 'default' | 'destructive' | 'success' | 'warning';

export interface AlertProps extends Omit<MuiAlertProps, 'variant' | 'severity'> {
    className?: string;
    variant?: AlertVariant;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, variant = 'default', icon, sx, children, ...props }, ref) => {

        // Map our variants to specific styling and default icons
        const variantConfig: Record<
            AlertVariant,
            { defaultIcon: React.ReactNode; styles: Record<string, unknown> }
        > = {
            default: {
                defaultIcon: <Info size={20} />,
                styles: {
                    backgroundColor: '#f8fafc', // Slate 50
                    color: 'text.primary',
                    borderColor: 'divider',
                },
            },
            destructive: {
                defaultIcon: <AlertCircle size={20} />,
                styles: {
                    backgroundColor: '#fef2f2', // Red 50
                    color: 'error.main',
                    borderColor: '#fca5a5', // Red 300
                    '& .MuiAlert-icon': {
                        color: 'error.main',
                    },
                },
            },
            success: {
                defaultIcon: <CheckCircle2 size={20} />,
                styles: {
                    backgroundColor: '#f0fdf4', // Green 50
                    color: '#166534', // Green 800
                    borderColor: '#86efac', // Green 300
                    '& .MuiAlert-icon': {
                        color: '#16a34a', // Green 600
                    },
                },
            },
            warning: {
                defaultIcon: <AlertTriangle size={20} />,
                styles: {
                    backgroundColor: '#fffbeb', // Amber 50
                    color: '#92400e', // Amber 800
                    borderColor: '#fcd34d', // Amber 300
                    '& .MuiAlert-icon': {
                        color: '#d97706', // Amber 600
                    },
                },
            },
        };

        const currentVariant = variantConfig[variant];

        return (
            <MuiAlert
                ref={ref}
                className={cn('ds-alert', className)}
                // Provide our custom default icon if one isn't explicitly passed
                icon={icon !== undefined ? icon : currentVariant.defaultIcon}
                sx={{
                    borderRadius: 2, // theme.shape.borderRadius
                    border: '1px solid',
                    padding: '12px 16px',
                    alignItems: 'flex-start',

                    // Apply the variant-specific colors
                    ...currentVariant.styles,

                    // Style the icon container
                    '& .MuiAlert-icon': {
                        padding: 0,
                        marginRight: 1.5,
                        opacity: 1, // Ensure the icon is fully opaque
                    },

                    // Style the message container
                    '& .MuiAlert-message': {
                        padding: 0,
                        overflow: 'hidden',
                    },

                    ...sx,
                }}
                {...props}
            >
                {children}
            </MuiAlert>
        );
    }
);
Alert.displayName = 'Alert';

// ----------------------------------------------------------------------
// 2. Alert Title
// ----------------------------------------------------------------------
export interface AlertTitleProps extends MuiAlertTitleProps {
    className?: string;
}

export const AlertTitle = React.forwardRef<HTMLDivElement, AlertTitleProps>(
    ({ className, sx, ...props }, ref) => (
        <MuiAlertTitle
            ref={ref}
            className={cn('ds-alert-title', className)}
            sx={{
                fontWeight: 600,
                fontSize: '0.875rem', // text-sm
                lineHeight: 1,
                letterSpacing: '-0.025em',
                marginTop: 0,
                marginBottom: 1, // Space below the title
                color: 'inherit', // Inherits color from the parent Alert variant
                ...sx,
            }}
            {...props}
        />
    )
);
AlertTitle.displayName = 'AlertTitle';

// ----------------------------------------------------------------------
// 3. Alert Description
// ----------------------------------------------------------------------
export interface AlertDescriptionProps extends TypographyProps {
    className?: string;
}

export const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
    ({ className, sx, ...props }, ref) => (
        <Typography
            ref={ref}
            component="div"
            className={cn('ds-alert-description', className)}
            variant="body2"
            sx={{
                fontSize: '0.875rem', // text-sm
                lineHeight: 1.5, // relaxed
                color: 'inherit', // Inherits color from the parent Alert variant
                '& p': { margin: 0 }, // Strip margins from nested paragraph tags if used
                ...sx,
            }}
            {...props}
        />
    )
);
AlertDescription.displayName = 'AlertDescription';