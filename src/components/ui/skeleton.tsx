'use client';

import * as React from 'react';
import { Skeleton as MuiSkeleton, SkeletonProps as MuiSkeletonProps } from '@mui/material';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends MuiSkeletonProps {
    className?: string;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, sx, variant = 'rounded', animation = 'pulse', ...props }, ref) => {
        const sxObject =
            typeof sx === 'object' && sx !== null && !Array.isArray(sx) ? sx : null;

        const hasExplicitSize =
            (sxObject !== null && ('width' in sxObject || 'height' in sxObject)) ||
            props.width !== undefined ||
            props.height !== undefined;

        return (
            <MuiSkeleton
                ref={ref}
                variant={variant}
                animation={animation}
                className={cn('ds-skeleton', className)}
                sx={{
                    // Shadcn styling: slightly darker/more muted background than MUI default
                    backgroundColor: 'action.hover', // Muted slate color

                    // If the developer doesn't provide a specific width/height, 
                    // MUI often collapses to 0. We provide sensible defaults for blocks,
                    // but respect explicit sx props if passed.
                    ...(variant === 'circular' && !hasExplicitSize
                        ? { width: 40, height: 40 } // Default avatar size
                        : {}),

                    // Ensure rounded variant matches our global border radius (e.g., 6px)
                    ...(variant === 'rounded'
                        ? { borderRadius: 1.5 }
                        : {}),

                    ...sx,
                }}
                {...props}
            />
        );
    }
);

Skeleton.displayName = 'Skeleton';