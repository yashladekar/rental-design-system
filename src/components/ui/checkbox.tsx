'use client';

import * as React from 'react';
import { Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends MuiCheckboxProps {
    className?: string;
}

// ----------------------------------------------------------------------
// 1. Custom Styled Icons using Emotion (Robust Theme Access)
// ----------------------------------------------------------------------

const StyledUncheckedIcon = styled('div')(({ theme }) => ({
    width: 16,
    height: 16,
    borderRadius: 4,
    border: `1px solid ${theme.palette.divider}`, // Uses theme palette directly
    backgroundColor: 'transparent',
    transition: 'border-color 0.2s',
}));

const StyledCheckedIcon = styled('div')(({ theme }) => ({
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: theme.palette.primary.main, // Uses theme palette directly
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.contrastText,
}));

// ----------------------------------------------------------------------
// 2. The Checkbox Component
// ----------------------------------------------------------------------

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
    ({ className, sx, ...props }, ref) => (
        <MuiCheckbox
            ref={ref}
            className={cn('ds-checkbox', className)}
            // 1. Swap the default Material SVGs with our styled ones
            icon={<StyledUncheckedIcon className="ds-checkbox-unchecked" />}
            checkedIcon={
                <StyledCheckedIcon>
                    <Check size={12} strokeWidth={3} />
                </StyledCheckedIcon>
            }

            // 2. Kill the Material ripple effect
            disableRipple

            // 3. Style overrides for layout and focus
            sx={{
                padding: 0,

                // Hover state (target the unchecked icon via the class name)
                '&:hover:not(.Mui-checked):not(.Mui-disabled) .ds-checkbox-unchecked': {
                    borderColor: 'primary.main',
                },

                // Focus ring
                '&.Mui-focusVisible': {
                    boxShadow: (theme) => `0 0 0 2px #ffffff, 0 0 0 4px ${theme.palette.primary.main}`,
                    borderRadius: 1,
                },

                // Disabled state
                '&.Mui-disabled': {
                    opacity: 0.5,
                    cursor: 'not-allowed',
                },

                ...sx,
            }}
            {...props}
        />
    )
);

Checkbox.displayName = 'Checkbox';