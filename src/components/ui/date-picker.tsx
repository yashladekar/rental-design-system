'use client';

import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
    DatePicker as MuiDatePicker,
    DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import { Calendar as CalendarIcon } from 'lucide-react';
import { InputAdornment, Box } from '@mui/material';
import { Dayjs } from 'dayjs';
import { cn } from "@/lib/utils"

// ----------------------------------------------------------------------
// Custom Styled Date Picker Wrapper
// ----------------------------------------------------------------------
// We use Emotion to aggressively style the complex internal structure of
// the MUI DatePicker, specifically targeting the Popper, Calendar header,
// and the individual day buttons to match the Shadcn aesthetic.

const StyledDatePicker = styled(MuiDatePicker<Dayjs>)(({ theme }) => ({
    // Style the Input field itself to match our custom Shadcn Input
    '& .MuiInputBase-root': {
        height: 40, // h-10
        borderRadius: theme.shape.borderRadius,
        border: '1px solid',
        borderColor: theme.palette.divider,
        backgroundColor: 'transparent',
        fontSize: '0.875rem', // text-sm
        paddingRight: '12px',
        transition: 'border-color 0.2s, box-shadow 0.2s',

        '&:hover': {
            borderColor: theme.palette.text.secondary,
        },

        // Focus ring
        '&.Mui-focused': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
        },

        // Remove the default MUI underline if variant="standard" accidentally slips in
        '&::before, &::after': {
            display: 'none',
        },
    },

    // Style the input text area
    '& .MuiInputBase-input': {
        padding: '8px 12px',
        height: 'auto',
        '&::placeholder': {
            color: theme.palette.text.secondary,
            opacity: 0.8,
        },
    },

    // Style the button that opens the calendar
    '& .MuiIconButton-root': {
        color: theme.palette.text.secondary,
        padding: 4,
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            color: theme.palette.text.primary,
        },
    },
}));

// ----------------------------------------------------------------------
// The Popover styling (The actual calendar popup)
// ----------------------------------------------------------------------
// MUI renders the calendar in a Portal, so we style it via slotProps.popper.sx

const popperSx = {
    // The popup container
    '& .MuiPaper-root': {
        mt: 1,
        borderRadius: 2, // rounded-md
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // shadow-md
        backgroundImage: 'none',
        p: 1.5, // Padding around the calendar

        // Animation
        animation: 'zoomIn 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        '@keyframes zoomIn': {
            '0%': { opacity: 0, transform: 'scale(0.95) translateY(-4px)' },
            '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
        },
    },

    // --- Calendar Header (Month/Year & Arrows) ---
    '& .MuiPickersCalendarHeader-root': {
        mt: 0,
        mb: 1,
        padding: 0,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center', // Center the month/year title
        alignItems: 'center',

        // The Month/Year Text
        '& .MuiPickersCalendarHeader-labelContainer': {
            margin: 0,
            fontSize: '0.875rem',
            fontWeight: 500,
        },

        // The previous/next arrow buttons
        '& .MuiIconButton-root': {
            position: 'absolute',
            padding: '4px', // Smaller hit area
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'transparent',
            '&:hover': {
                borderColor: 'divider',
                backgroundColor: 'action.hover',
            },
        },
        '& .MuiPickersArrowSwitcher-button[title="Previous month"]': {
            left: 0,
        },
        '& .MuiPickersArrowSwitcher-button[title="Next month"]': {
            right: 0,
        },
        // Hide the year dropdown switch (optional, Shadcn usually hides this)
        '& .MuiPickersCalendarHeader-switchViewButton': {
            display: 'none',
        },
    },

    // --- Days of the week row (Su, Mo, Tu...) ---
    '& .MuiDayCalendar-header': {
        justifyContent: 'space-between',
        mb: 1,
        '& .MuiDayCalendar-weekDayLabel': {
            width: 36,
            height: 36,
            fontSize: '0.8rem',
            color: 'text.secondary',
            fontWeight: 400,
            margin: 0,
        },
    },

    // --- The Calendar Grid ---
    '& .MuiDayCalendar-monthContainer': {
        '& .MuiDayCalendar-weekContainer': {
            justifyContent: 'space-between',
            margin: 0,
        },
    },

    // --- Individual Day Buttons ---
    '& .MuiPickersDay-root': {
        width: 36, // h-9 w-9
        height: 36,
        margin: 0,
        borderRadius: 1, // rounded-md (Shadcn aesthetic)
        fontSize: '0.875rem',
        fontWeight: 400,
        backgroundColor: 'transparent',
        color: 'text.primary',
        transition: 'background-color 0.2s, color 0.2s',
        border: 'none',

        // Hover state (Ghost button)
        '&:hover': {
            backgroundColor: 'action.hover',
        },

        // Focus state
        '&:focus.Mui-focusVisible': {
            backgroundColor: 'action.hover',
            boxShadow: (theme: any) => `0 0 0 2px #ffffff, 0 0 0 4px ${theme.palette.primary.main}`,
        },

        // Today highlight
        '&.MuiPickersDay-today': {
            backgroundColor: 'action.hover',
            fontWeight: 500,
            border: 'none', // Remove MUI's default border for today
        },

        // Selected state (Primary button style)
        '&.Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 500,
            '&:hover': {
                backgroundColor: 'primary.main',
                opacity: 0.9,
            },
            '&:focus.Mui-focusVisible': {
                backgroundColor: 'primary.main',
            },
        },

        // Days outside the current month (Muted)
        '&.MuiPickersDay-dayOutsideMonth': {
            color: 'text.disabled',
            opacity: 0.5,
            '&:hover': {
                backgroundColor: 'transparent',
            },
        },
    },
};

// ----------------------------------------------------------------------
// Exported Component
// ----------------------------------------------------------------------
export interface DatePickerProps extends Omit<MuiDatePickerProps<Dayjs>, 'slots' | 'slotProps'> {
    className?: string;
}

export function DatePicker({ className, sx, ...props }: DatePickerProps) {
    return (
        // The LocalizationProvider is required by MUI Pickers to know how to parse dates.
        // In a real app, you usually put this once at the root layout of your app.
        // For this component library, we wrap it here for easy plug-and-play.
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StyledDatePicker
                className={cn('ds-date-picker', className)}
                // Swap MUI's default calendar icon with Lucide
                slots={{
                    openPickerIcon: () => <CalendarIcon size={16} strokeWidth={2.5} />,
                }}
                slotProps={{
                    // Apply our complex Popper/Calendar CSS overrides
                    popper: { sx: popperSx },
                    // Ensure the input field doesn't have MUI's default label floating behavior
                    textField: {
                        variant: 'outlined',
                        InputProps: {
                            // We don't want the default notch border
                            notched: false,
                        }
                    }
                }}
                sx={{ ...sx }}
                {...props}
            />
        </LocalizationProvider>
    );
}