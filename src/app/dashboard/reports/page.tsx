// src/app/dashboard/reports/page.tsx
'use client';

import * as React from 'react';
import { Box, Stack } from '@mui/material';
import { DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import dayjs, { Dayjs } from 'dayjs';

export default function ReportsForm() {
    // State holds a Dayjs object or null
    const [date, setDate] = React.useState<Dayjs | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (date) {
            // You can easily format the Dayjs object before sending to an API
            alert(`Selected Date: ${date.format('YYYY-MM-DD')}`);
        } else {
            alert('Please select a date.');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 8, p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>

            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>

                    <Box>
                        <Label htmlFor="dob">Date of birth</Label>

                        {/* The Date Picker */}
                        <DatePicker
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            // Optional: Provide a custom format for the input field
                            format="MMM DD, YYYY"
                            // Optional: Restrict dates (e.g., must be 18+)
                            maxDate={dayjs().subtract(18, 'year')}
                            sx={{ width: '100%' }}
                        />

                        <Box sx={{ fontSize: '0.875rem', color: 'text.secondary', mt: 1 }}>
                            Your date of birth is used to calculate your age.
                        </Box>
                    </Box>

                    <Button type="submit">Submit</Button>

                </Stack>
            </form>

        </Box>
    );
}