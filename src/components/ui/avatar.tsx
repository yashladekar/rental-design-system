'use client';

import * as React from 'react';
import {
    Avatar as MuiAvatar,
    AvatarProps as MuiAvatarProps,
    AvatarGroup as MuiAvatarGroup,
    AvatarGroupProps as MuiAvatarGroupProps,
} from '@mui/material';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// 1. Avatar (Root)
// ----------------------------------------------------------------------
export interface AvatarProps extends MuiAvatarProps {
    className?: string;
    // We explicitly add src and alt here to remind developers they are expected
    src?: string;
    alt?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, sx, src, alt, children, ...props }, ref) => (
        <MuiAvatar
            ref={ref}
            src={src}
            alt={alt}
            className={cn('ds-avatar', className)}
            sx={{
                width: 40, // default size (h-10 w-10)
                height: 40,
                backgroundColor: 'action.hover', // Muted background for the fallback
                color: 'text.primary', // Dark text for the fallback initials
                fontSize: '1rem', // font-medium
                fontWeight: 500,
                border: '1px solid',
                borderColor: 'divider', // Subtle border, especially useful if background is white
                ...sx,
            }}
            {...props}
        >
            {/* If an image src fails to load or isn't provided, MUI automatically renders the children (the fallback) */}
            {children}
        </MuiAvatar>
    )
);
Avatar.displayName = 'Avatar';

// ----------------------------------------------------------------------
// 2. Avatar Fallback (Optional helper, MUI handles this natively via children)
// ----------------------------------------------------------------------
// In Shadcn, you explicitly write <AvatarFallback>. In our MUI wrapper,
// you can just pass text as children to <Avatar>. But for API consistency,
// we can export a simple span wrapper.
export const AvatarFallback = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    ({ className, children, ...props }, ref) => (
        <span
            ref={ref}
            className={cn('ds-avatar-fallback', className)}
            {...props}
        >
            {children}
        </span>
    )
);
AvatarFallback.displayName = 'AvatarFallback';

// ----------------------------------------------------------------------
// 3. Avatar Group (For overlapping stacks)
// ----------------------------------------------------------------------
export interface AvatarGroupProps extends MuiAvatarGroupProps {
    className?: string;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
    ({ className, sx, max = 4, ...props }, ref) => (
        <MuiAvatarGroup
            ref={ref}
            max={max}
            className={cn('ds-avatar-group', className)}
            sx={{
                // Style the "+X" surplus avatar that MUI auto-generates
                '& .MuiAvatar-root': {
                    width: 40,
                    height: 40,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    backgroundColor: 'action.hover',
                    color: 'text.primary',
                    border: '2px solid',
                    borderColor: 'background.paper', // Creates the overlapping "cutout" effect
                },
                ...sx,
            }}
            {...props}
        />
    )
);
AvatarGroup.displayName = 'AvatarGroup';