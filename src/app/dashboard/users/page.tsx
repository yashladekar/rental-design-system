// src/app/dashboard/users/page.tsx
'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Pagination, PaginationContent } from '@/components/ui/pagination';

export default function UsersTablePage() {
    const [page, setPage] = React.useState(1);
    const totalPages = 10; // This would normally come from your API

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        // Here you would typically fetch the new data for the selected page
        console.log(`Fetching data for page ${value}`);
    };

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', mt: 8, p: 4 }}>

            <Box sx={{ mb: 6, p: 8, border: '1px dashed', borderColor: 'divider', borderRadius: 2, textAlign: 'center', color: 'text.secondary' }}>
                <Typography variant="h6">User Data Table (Page {page})</Typography>
                <Typography variant="body2">Simulated table content...</Typography>
            </Box>

            {/* The actual pagination component */}
            <Pagination>
                <PaginationContent
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
                // siblingCount={1} // Default: shows 1 page on each side of current
                // boundaryCount={1} // Default: always shows first and last page
                />
            </Pagination>

        </Box>
    );
}