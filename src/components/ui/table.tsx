'use client';

import * as React from 'react';
import {
    Table as MuiTable,
    TableProps as MuiTableProps,
    TableBody as MuiTableBody,
    TableBodyProps as MuiTableBodyProps,
    TableCell as MuiTableCell,
    TableCellProps as MuiTableCellProps,
    TableContainer as MuiTableContainer,
    TableContainerProps as MuiTableContainerProps,
    TableHead as MuiTableHead,
    TableHeadProps as MuiTableHeadProps,
    TableRow as MuiTableRow,
    TableRowProps as MuiTableRowProps,
    TableFooter as MuiTableFooter,
    TableFooterProps as MuiTableFooterProps,
    Box,
    Typography
} from '@mui/material';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// 1. Table Container & Root
// We wrap the table in a container to handle horizontal scrolling on mobile
// ----------------------------------------------------------------------
export interface TableProps extends MuiTableProps {
    className?: string;
    containerProps?: MuiTableContainerProps;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
    ({ className, sx, containerProps, ...props }, ref) => (
        <Box sx={{ width: '100%', overflow: 'auto' }}>
            <MuiTableContainer {...containerProps}>
                <MuiTable
                    ref={ref}
                    className={cn('ds-table', className)}
                    sx={{
                        width: '100%',
                        captionSide: 'bottom',
                        fontSize: '0.875rem', // text-sm
                        ...sx,
                    }}
                    {...props}
                />
            </MuiTableContainer>
        </Box>
    )
);
Table.displayName = 'Table';

// ----------------------------------------------------------------------
// 2. Table Header Group
// ----------------------------------------------------------------------
export interface TableHeaderProps extends MuiTableHeadProps {
    className?: string;
}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
    ({ className, sx, ...props }, ref) => (
        <MuiTableHead
            ref={ref}
            className={cn('ds-table-header', className)}
            sx={{
                '& th': {
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                },
                ...sx,
            }}
            {...props}
        />
    )
);
TableHeader.displayName = 'TableHeader';

// ----------------------------------------------------------------------
// 3. Table Body
// ----------------------------------------------------------------------
export interface TableBodyProps extends MuiTableBodyProps {
    className?: string;
}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ className, sx, ...props }, ref) => (
        <MuiTableBody
            ref={ref}
            className={cn('ds-table-body', className)}
            // Standard MUI Body is fine, the styling happens on the rows and cells
            sx={{ ...sx }}
            {...props}
        />
    )
);
TableBody.displayName = 'TableBody';

// ----------------------------------------------------------------------
// 4. Table Footer
// ----------------------------------------------------------------------
export interface TableFooterProps extends MuiTableFooterProps {
    className?: string;
}

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
    ({ className, sx, ...props }, ref) => (
        <MuiTableFooter
            ref={ref}
            className={cn('ds-table-footer', className)}
            sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'action.hover', // Subtle background for the footer
                fontWeight: 500,
                '& td': {
                    borderBottom: 'none', // Remove inner borders on the footer row
                },
                ...sx,
            }}
            {...props}
        />
    )
);
TableFooter.displayName = 'TableFooter';

// ----------------------------------------------------------------------
// 5. Table Row
// ----------------------------------------------------------------------
export interface TableRowProps extends MuiTableRowProps {
    className?: string;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
    ({ className, sx, ...props }, ref) => (
        <MuiTableRow
            ref={ref}
            className={cn('ds-table-row', className)}
            sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                transition: 'background-color 0.2s',
                '&:hover': {
                    backgroundColor: 'action.hover', // Shadcn hover effect
                },
                // Target specifically the header row to not have a hover effect
                '.ds-table-header &': {
                    '&:hover': { backgroundColor: 'transparent' },
                },
                ...sx,
            }}
            {...props}
        />
    )
);
TableRow.displayName = 'TableRow';

// ----------------------------------------------------------------------
// 6. Table Head (The <th> Cell)
// ----------------------------------------------------------------------
export interface TableHeadProps extends MuiTableCellProps {
    className?: string;
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
    ({ className, sx, ...props }, ref) => (
        <MuiTableCell
            ref={ref}
            component="th"
            className={cn('ds-table-head', className)}
            sx={{
                height: 48,
                padding: '0 16px', // px-4
                textAlign: 'left',
                verticalAlign: 'middle',
                fontWeight: 500, // font-medium
                color: 'text.secondary', // text-muted-foreground
                borderBottom: 'none', // Border is handled by the TableRow
                '&[align="right"]': { textAlign: 'right' },
                '&[align="center"]': { textAlign: 'center' },
                ...sx,
            }}
            {...props}
        />
    )
);
TableHead.displayName = 'TableHead';

// ----------------------------------------------------------------------
// 7. Table Cell (The <td> Cell)
// ----------------------------------------------------------------------
export interface TableCellProps extends MuiTableCellProps {
    className?: string;
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ className, sx, ...props }, ref) => (
        <MuiTableCell
            ref={ref}
            className={cn('ds-table-cell', className)}
            sx={{
                padding: '16px', // p-4
                verticalAlign: 'middle',
                borderBottom: 'none', // Border is handled by the TableRow
                '&[align="right"]': { textAlign: 'right' },
                '&[align="center"]': { textAlign: 'center' },
                ...sx,
            }}
            {...props}
        />
    )
);
TableCell.displayName = 'TableCell';

// ----------------------------------------------------------------------
// 8. Table Caption
// ----------------------------------------------------------------------
export const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
    ({ className, ...props }, ref) => (
        <Typography
            ref={ref}
            component="caption"
            className={cn('ds-table-caption', className)}
            sx={{
                paddingTop: 2,
                paddingBottom: 2,
                fontSize: '0.875rem',
                color: 'text.secondary',
                textAlign: 'center',
            }}
            {...props}
        />
    )
);
TableCaption.displayName = 'TableCaption';