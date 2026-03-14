// src/app/dashboard/loading.tsx
// (In Next.js App Router, this file automatically shows while page.tsx is fetching data)
'use client';

import * as React from 'react';
import { Box, Stack } from '@mui/material';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function DashboardLoading() {
    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 8 }}>
            <Card>

                {/* Loading Header */}
                <CardHeader>
                    <Stack spacing={1}>
                        {/* Title placeholder (approx 200px wide, matching h6 text size) */}
                        <Skeleton variant="text" width={200} height={24} />
                        {/* Description placeholder */}
                        <Skeleton variant="text" width={300} height={16} />
                    </Stack>
                </CardHeader>

                <CardContent>
                    <Stack spacing={3}>

                        {/* Loading Input Field 1 */}
                        <Box>
                            <Skeleton variant="text" width={60} height={16} sx={{ mb: 1 }} />
                            {/* Rectangular placeholder for the input box */}
                            <Skeleton variant="rounded" width="100%" height={36} />
                        </Box>

                        {/* Loading Input Field 2 */}
                        <Box>
                            <Skeleton variant="text" width={80} height={16} sx={{ mb: 1 }} />
                            <Skeleton variant="rounded" width="100%" height={36} />
                        </Box>

                    </Stack>
                </CardContent>

                {/* Loading Footer (Buttons) */}
                <CardFooter sx={{ justifyContent: 'flex-end', gap: 2 }}>
                    <Skeleton variant="rounded" width={80} height={36} />
                    <Skeleton variant="rounded" width={100} height={36} />
                </CardFooter>

            </Card>

            {/* Example: Loading a User Profile Row */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 4, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                {/* Circular placeholder for the Avatar */}
                <Skeleton variant="circular" width={48} height={48} />
                <Box sx={{ flexGrow: 1 }}>
                    <Skeleton variant="text" width={120} height={20} />
                    <Skeleton variant="text" width={180} height={16} sx={{ mt: 0.5 }} />
                </Box>
            </Stack>

        </Box>
    );
}