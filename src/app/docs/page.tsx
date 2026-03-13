// src/app/docs/page.tsx
'use client';

import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Separator } from '@/components/ui/separator';

export default function DocsLayout() {
    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 8, p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>

            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" component="h1" fontWeight={600} gutterBottom>
                    Radix Primitives
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    An open-source UI component library for building high-quality, accessible design systems and web apps.
                </Typography>
            </Box>

            {/* Horizontal Separator */}
            <Separator sx={{ my: 4 }} />

            {/* Content Section with Vertical Separators */}
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ height: 24, fontSize: '0.875rem' }}
            >
                <Box>Blog</Box>

                {/* Vertical Separator */}
                <Separator orientation="vertical" />

                <Box>Docs</Box>

                {/* Vertical Separator */}
                <Separator orientation="vertical" />

                <Box>Source</Box>
            </Stack>

        </Box>
    );
}