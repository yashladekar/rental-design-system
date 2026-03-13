'use client';

import * as React from 'react';
import {
    Dialog as MuiDialog,
    DialogProps as MuiDialogProps,
    DialogTitle as MuiDialogTitle,
    DialogTitleProps as MuiDialogTitleProps,
    DialogContent as MuiDialogContent,
    DialogContentProps as MuiDialogContentProps,
    DialogActions as MuiDialogActions,
    DialogActionsProps as MuiDialogActionsProps,
    Box,
    BoxProps,
    Typography,
    TypographyProps,
    IconButton
} from '@mui/material';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// 1. Dialog (Root Wrapper)
// ----------------------------------------------------------------------
export interface DialogProps extends MuiDialogProps {
    className?: string;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
    ({ className, sx, PaperProps, ...props }, ref) => (
        <MuiDialog
            ref={ref}
            className={cn('ds-dialog', className)}
            // 1. We strip the default Material backdrop to make it Shadcn-style (darker, blurred)
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(4px)',
                    },
                },
            }}
            // 2. We strictly style the internal Paper component to look like a modern card
            PaperProps={{
                ...PaperProps,
                sx: {
                    width: '100%',
                    maxWidth: '512px', // Shadcn sm:max-w-[425px] equivalent
                    borderRadius: 2,   // Matches theme shape
                    p: 0,              // Reset padding, handled by inner components
                    m: 2,              // Margin for mobile
                    backgroundImage: 'none',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                    border: '1px solid',
                    borderColor: 'divider',
                    ...PaperProps?.sx,
                },
            }}
            sx={{ ...sx }}
            {...props}
        />
    )
);
Dialog.displayName = 'Dialog';

// ----------------------------------------------------------------------
// 2. Dialog Header (Custom Box for Layout)
// ----------------------------------------------------------------------
export interface DialogHeaderProps extends BoxProps { }

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
    ({ className, sx, ...props }, ref) => (
        <Box
            ref={ref}
            className={cn('ds-dialog-header', className)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                p: 3,
                textAlign: { xs: 'center', sm: 'left' }, // Center on mobile, left on desktop
                ...sx,
            }}
            {...props}
        />
    )
);
DialogHeader.displayName = 'DialogHeader';

// ----------------------------------------------------------------------
// 3. Dialog Title
// ----------------------------------------------------------------------
export interface DialogTitleProps extends MuiDialogTitleProps {
    className?: string;
    onClose?: () => void; // Optional close button support
}

export const DialogTitle = React.forwardRef<HTMLSpanElement, DialogTitleProps>(
    ({ className, sx, children, onClose, ...props }, ref) => (
        <MuiDialogTitle
            ref={ref}
            className={cn('ds-dialog-title', className)}
            sx={{
                p: 0, // Reset MUI padding
                m: 0,
                fontWeight: 600,
                fontSize: '1.125rem', // text-lg
                lineHeight: 1,
                letterSpacing: '-0.025em',
                ...sx,
            }}
            {...props}
        >
            {children}
            {/* Shadcn auto-includes a close 'X' button in the top right. 
        If onClose is provided, we render it here to match that behavior.
      */}
            {onClose && (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        color: 'text.secondary',
                        opacity: 0.7,
                        transition: 'opacity 0.2s',
                        p: 0.5, // Smaller padding for the icon
                        '&:hover': {
                            opacity: 1,
                            backgroundColor: 'action.hover',
                        },
                        '&.Mui-focusVisible': {
                            boxShadow: (theme) => `0 0 0 2px #ffffff, 0 0 0 4px ${theme.palette.primary.main}`,
                        },
                    }}
                >
                    <X size={16} />
                </IconButton>
            )}
        </MuiDialogTitle>
    )
);
DialogTitle.displayName = 'DialogTitle';

// ----------------------------------------------------------------------
// 4. Dialog Description (Custom Typography)
// ----------------------------------------------------------------------
export interface DialogDescriptionProps extends TypographyProps { }

export const DialogDescription = React.forwardRef<HTMLSpanElement, DialogDescriptionProps>(
    ({ className, sx, ...props }, ref) => (
        <Typography
            ref={ref}
            className={cn('ds-dialog-description', className)}
            variant="body2"
            color="text.secondary"
            sx={{ ...sx }}
            {...props}
        />
    )
);
DialogDescription.displayName = 'DialogDescription';

// ----------------------------------------------------------------------
// 5. Dialog Content
// ----------------------------------------------------------------------
export interface DialogContentProps extends MuiDialogContentProps {
    className?: string;
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
    ({ className, sx, ...props }, ref) => (
        <MuiDialogContent
            ref={ref}
            className={cn('ds-dialog-content', className)}
            sx={{
                p: 3,
                pt: 0, // Top padding is 0 because Header handles it
                // MUI adds padding to the top if there is no title. We disable that override.
                '&.MuiDialogContent-root': {
                    paddingTop: 0,
                },
                ...sx,
            }}
            {...props}
        />
    )
);
DialogContent.displayName = 'DialogContent';

// ----------------------------------------------------------------------
// 6. Dialog Footer
// ----------------------------------------------------------------------
export interface DialogFooterProps extends MuiDialogActionsProps {
    className?: string;
}

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
    ({ className, sx, ...props }, ref) => (
        <MuiDialogActions
            ref={ref}
            className={cn('ds-dialog-footer', className)}
            sx={{
                p: 3,
                pt: 0,
                display: 'flex',
                flexDirection: { xs: 'column-reverse', sm: 'row' }, // Stack on mobile
                justifyContent: { sm: 'flex-end' },
                gap: 1, // Space between buttons
                // MUI automatically targets direct children buttons to add margins. 
                // We kill that so our Stack/gap logic works predictably.
                '& > :not(style) ~ :not(style)': {
                    marginLeft: { sm: 1 },
                },
                ...sx,
            }}
            {...props}
        />
    )
);
DialogFooter.displayName = 'DialogFooter';