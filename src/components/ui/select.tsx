'use client';

import * as React from 'react';
import {
    Select as MuiSelect,
    SelectProps as MuiSelectProps,
    MenuItem,
    MenuItemProps,
    ListSubheader,
    ListSubheaderProps
} from '@mui/material';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------
// 1. Custom Icon Wrapper
// We wrap the Lucide icon so it properly accepts MUI's internal classes
// ----------------------------------------------------------------------
const DropdownIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
    <ChevronDown ref={ref} {...props} />
));
DropdownIcon.displayName = 'DropdownIcon';

// ----------------------------------------------------------------------
// 2. Select (The Root & Trigger combined)
// ----------------------------------------------------------------------
export interface SelectProps<Value = unknown> extends Omit<MuiSelectProps<Value>, 'variant'> {
    className?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps<any>>(
    ({ className, sx, children, ...props }, ref) => {
        const isControlled = Object.prototype.hasOwnProperty.call(props, 'value');
        const normalizedValue = isControlled ? (props.value ?? '') : undefined;

        return (
            <MuiSelect
                ref={ref}
                className={cn('ds-select', className)}
                IconComponent={DropdownIcon}
                displayEmpty // Allows us to show a placeholder
                // 1. Style the internal Trigger / Input area
                sx={{
                    '& .MuiSelect-select': {
                        padding: '8px 12px',
                        paddingRight: '32px !important', // Leave room for the chevron
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.875rem',
                        minHeight: '20px',
                    },
                    '& .MuiSelect-icon': {
                        right: '12px',
                        width: '16px',
                        height: '16px',
                        color: 'text.secondary',
                    },
                    ...sx,
                }}
                // 2. Style the Popover / Dropdown Menu (Shadcn SelectContent equivalent)
                MenuProps={{
                    PaperProps: {
                        sx: {
                            mt: 1, // Margin top to separate from the input
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1.5,
                            '& .MuiList-root': {
                                p: 0.5, // Padding inside the popup
                            },
                        },
                    },
                    elevation: 0, // Kill default Material shadows
                }}
                {...props}
                {...(isControlled ? { value: normalizedValue } : {})}
            >
                {children}
            </MuiSelect>
        );
    }
);
Select.displayName = 'Select';

// ----------------------------------------------------------------------
// 3. Select Item (The Options)
// ----------------------------------------------------------------------
export interface SelectItemProps extends MenuItemProps {
    className?: string;
}

export const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>(
    ({ className, sx, ...props }, ref) => (
        <MenuItem
            ref={ref}
            className={cn('ds-select-item', className)}
            sx={{
                borderRadius: 0.75, // Rounded corners inside the menu
                typography: 'body2',
                fontSize: '0.875rem',
                px: 1.5,
                py: 1,
                mx: 0.5,
                my: 0.25,
                '&.Mui-selected': {
                    backgroundColor: 'action.selected',
                    fontWeight: 600, // Make selected item bold
                },
                ...sx,
            }}
            {...props}
        />
    )
);
SelectItem.displayName = 'SelectItem';

// ----------------------------------------------------------------------
// 4. Select Label (For Grouping Options)
// ----------------------------------------------------------------------
export interface SelectLabelProps extends ListSubheaderProps {
    className?: string;
}

export const SelectLabel = React.forwardRef<HTMLLIElement, SelectLabelProps>(
    ({ className, sx, ...props }, ref) => (
        <ListSubheader
            ref={ref}
            className={cn('ds-select-label', className)}
            sx={{
                typography: 'body2',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: 'text.secondary',
                px: 2,
                py: 1.5,
                lineHeight: 1,
                backgroundColor: 'transparent',
                ...sx,
            }}
            {...props}
        />
    )
);
SelectLabel.displayName = 'SelectLabel';