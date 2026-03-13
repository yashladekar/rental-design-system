'use client';

import * as React from 'react';
import { Paper, PaperProps, Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// 1. Card (Root Wrapper)
// ----------------------------------------------------------------------
export interface CardProps extends PaperProps { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, sx, ...props }, ref) => (
        <Paper
            ref={ref}
            className={cn('ds-card', className)}
            // We rely on the theme (MuiPaper) for the border and background.
            // We only enforce the internal border radius here if it differs from the global theme.
            sx={{
                borderRadius: 2, // Maps to theme.shape.borderRadius * 2 (e.g., 12px)
                overflow: 'hidden',
                ...sx,
            }}
            {...props}
        />
    )
);
Card.displayName = 'Card';

// ----------------------------------------------------------------------
// 2. Card Header
// ----------------------------------------------------------------------
export interface CardHeaderProps extends BoxProps { }

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, sx, ...props }, ref) => (
        <Box
            ref={ref}
            className={cn('ds-card-header', className)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5, // 12px gap between title and description
                p: 3,     // 24px padding
                ...sx,
            }}
            {...props}
        />
    )
);
CardHeader.displayName = 'CardHeader';

// ----------------------------------------------------------------------
// 3. Card Title
// ----------------------------------------------------------------------
export interface CardTitleProps extends TypographyProps { }

const CardTitle = React.forwardRef<HTMLSpanElement, CardTitleProps>(
    ({ className, sx, ...props }, ref) => (
        <Typography
            ref={ref}
            variant="h6"
            component="h3"
            className={cn('ds-card-title', className)}
            sx={{
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.025em',
                ...sx,
            }}
            {...props}
        />
    )
);
CardTitle.displayName = 'CardTitle';

// ----------------------------------------------------------------------
// 4. Card Description
// ----------------------------------------------------------------------
export interface CardDescriptionProps extends TypographyProps { }

const CardDescription = React.forwardRef<HTMLSpanElement, CardDescriptionProps>(
    ({ className, sx, ...props }, ref) => (
        <Typography
            ref={ref}
            variant="body2"
            color="text.secondary"
            className={cn('ds-card-description', className)}
            sx={{ ...sx }}
            {...props}
        />
    )
);
CardDescription.displayName = 'CardDescription';

// ----------------------------------------------------------------------
// 5. Card Content
// ----------------------------------------------------------------------
export interface CardContentProps extends BoxProps { }

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, sx, ...props }, ref) => (
        <Box
            ref={ref}
            className={cn('ds-card-content', className)}
            sx={{
                p: 3,
                pt: 0, // Top padding is 0 because the Header handles the top spacing
                ...sx,
            }}
            {...props}
        />
    )
);
CardContent.displayName = 'CardContent';

// ----------------------------------------------------------------------
// 6. Card Footer
// ----------------------------------------------------------------------
export interface CardFooterProps extends BoxProps { }

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, sx, ...props }, ref) => (
        <Box
            ref={ref}
            className={cn('ds-card-footer', className)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                p: 3,
                pt: 0,
                ...sx,
            }}
            {...props}
        />
    )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };