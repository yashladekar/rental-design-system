'use client';

import * as React from 'react';
import {
    Pagination as MuiPagination,
    PaginationProps as MuiPaginationProps,
    PaginationItem as MuiPaginationItem,
    PaginationItemProps as MuiPaginationItemProps,
    Box,
} from '@mui/material';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------
// 1. Pagination Root
// ----------------------------------------------------------------------
export const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn('ds-pagination mx-auto flex w-full justify-center', className)}
        style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        {...props}
    />
);
Pagination.displayName = 'Pagination';

// ----------------------------------------------------------------------
// 2. Pagination Content (The MUI <Pagination> wrapper)
// ----------------------------------------------------------------------
export interface PaginationContentProps extends MuiPaginationProps {
    className?: string;
}

const StyledPagination = styled(MuiPagination)(({ theme }) => ({
    '& .MuiPagination-ul': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '4px', // gap-1
        margin: 0,
        padding: 0,
        listStyle: 'none',
    },
}));

export const PaginationContent = React.forwardRef<HTMLDivElement, PaginationContentProps>(
    ({ className, sx, ...props }, ref) => (
        <StyledPagination
            ref={ref as any}
            className={cn('ds-pagination-content', className)}
            shape="rounded" // Shadcn uses rounded squares, not circles
            // We use the renderItem prop to map MUI's internal state to our custom PaginationItem
            renderItem={(item) => <PaginationItem {...item} />}
            sx={{ ...sx }}
            {...props}
        />
    )
);
PaginationContent.displayName = 'PaginationContent';

// ----------------------------------------------------------------------
// 3. Pagination Item (The individual button/link)
// ----------------------------------------------------------------------
// We extend MUI's PaginationItemProps to accept our custom Button variants
export interface PaginationItemProps extends MuiPaginationItemProps {
    className?: string;
    isActive?: boolean; // Maps to MUI's 'selected'
}

const StyledPaginationItem = styled(MuiPaginationItem)(({ theme }) => ({
    margin: 0,
    minWidth: '36px', // w-9
    height: '36px',   // h-9
    padding: '0',     // p-0
    borderRadius: theme.shape.borderRadius, // rounded-md
    fontSize: '0.875rem', // text-sm
    fontWeight: 500,
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
    transition: 'background-color 0.2s, color 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    // Hover state (ghost button style)
    '&:hover': {
        backgroundColor: theme.palette.action.hover, // bg-accent
        color: theme.palette.text.primary,
    },

    // Active state (outline button style)
    '&.Mui-selected': {
        backgroundColor: 'transparent',
        border: `1px solid ${theme.palette.divider}`, // border-input
        fontWeight: 500,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },

    // Disabled state
    '&.Mui-disabled': {
        opacity: 0.5,
    },

    // Focus ring
    '&.Mui-focusVisible': {
        boxShadow: `0 0 0 2px #ffffff, 0 0 0 4px ${theme.palette.primary.main}`,
    },

    // Specific styling for the Next/Previous buttons to make them wider if they have text
    '&.MuiPaginationItem-previousNext': {
        padding: '0 16px', // px-4
        minWidth: 'auto',
        gap: '4px', // Space between icon and text
    }
}));

// We map MUI's generic PaginationItem to specific Shadcn-style components based on item.type
export const PaginationItem = React.forwardRef<HTMLDivElement, PaginationItemProps>(
    ({ className, sx, type, page, selected, disabled, ...props }, ref) => {

        // 1. Render Ellipsis
        if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            return (
                <Box
                    component="span"
                    className={cn('ds-pagination-ellipsis flex h-9 w-9 items-center justify-center', className)}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36 }}
                >
                    <MoreHorizontal size={16} />
                    <span className="sr-only">More pages</span>
                </Box>
            );
        }

        // 2. Render Previous Button
        if (type === 'previous') {
            return (
                <StyledPaginationItem
                    {...props}
                    type={type}
                    disabled={disabled}
                    className={cn('ds-pagination-previous', className)}
                    sx={{ ...sx }}
                >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                </StyledPaginationItem>
            );
        }

        // 3. Render Next Button
        if (type === 'next') {
            return (
                <StyledPaginationItem
                    {...props}
                    type={type}
                    disabled={disabled}
                    className={cn('ds-pagination-next', className)}
                    sx={{ ...sx }}
                >
                    <span>Next</span>
                    <ChevronRight size={16} />
                </StyledPaginationItem>
            );
        }

        // 4. Render Standard Page Number
        return (
            <StyledPaginationItem
                {...props}
                type={type}
                page={page}
                selected={selected}
                disabled={disabled}
                className={cn('ds-pagination-link', className)}
                sx={{ ...sx }}
            >
                {page}
            </StyledPaginationItem>
        );
    }
);
PaginationItem.displayName = 'PaginationItem';

// ----------------------------------------------------------------------
// 4. Dummy components for Shadcn API compatibility
// ----------------------------------------------------------------------
// Shadcn explicitly exports these, but because we map MUI's `renderItem` 
// dynamically above, developers don't strictly need to use them. 
// We export them as generic wrappers to satisfy the API if they copy/paste.
export const PaginationLink = ({ className, isActive, ...props }: React.ComponentProps<'a'> & { isActive?: boolean }) => (
    <a className={cn('ds-pagination-link', className)} aria-current={isActive ? 'page' : undefined} {...props} />
);
export const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink className={cn('ds-pagination-previous', className)} {...props} />
);
export const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink className={cn('ds-pagination-next', className)} {...props} />
);
export const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
    <span className={cn('ds-pagination-ellipsis', className)} {...props} />
);