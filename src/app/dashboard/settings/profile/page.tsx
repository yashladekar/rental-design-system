// src/app/dashboard/settings/profile/page.tsx
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function ProfileSettingsPage() {
    return (
        <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>

            {/* 1. Standard Breadcrumb Navigation */}
            <Box sx={{ mb: 6 }}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                        </BreadcrumbItem>

                        {/* The separator is automatically handled by MUI, but in the Shadcn API 
                you explicitly add it for visual composition */}
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard/settings">Settings</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            {/* BreadcrumbPage indicates the current active route */}
                            <BreadcrumbPage>Profile</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Box>

            {/* 2. Breadcrumb with an Ellipsis (for deep hierarchies) */}
            <Box sx={{ mb: 6, mt: 8, p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                    Example of a deeply nested path:
                </Typography>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbEllipsis />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Box>

        </Box>
    );
}