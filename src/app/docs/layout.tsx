// src/app/docs/layout.tsx
'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Rocket } from 'lucide-react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

// Helper component for the complex link items inside the mega menu
const ListItem = React.forwardRef<
    React.ElementRef<typeof NavigationMenuLink>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuLink> & { title: string; children: React.ReactNode }
>(({ title, children, style, ...props }, ref) => {
    return (
        <li style={{ listStyle: 'none' }}>
            <NavigationMenuLink
                ref={ref}
                style={{
                    display: 'block',
                    padding: '12px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    outline: 'none',
                    transition: 'background-color 0.2s, color 0.2s',
                    ...style,
                }}
                {...props}
            >
                <Typography variant="body2" fontWeight={500} sx={{ lineHeight: 1, mb: 0.5, color: 'text.primary' }}>
                    {title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.2, display: 'block' }}>
                    {children}
                </Typography>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

export default function HeaderLayout() {
    return (
        <Box sx={{ width: '100%', borderBottom: '1px solid', borderColor: 'divider', px: 4, py: 2, display: 'flex', justifyContent: 'center' }}>

            <NavigationMenu>
                <NavigationMenuList>

                    {/* Menu Item 1: Getting Started (Complex Layout) */}
                    <NavigationMenuItem value="getting-started">
                        <NavigationMenuTrigger value="getting-started">Getting started</NavigationMenuTrigger>
                        <NavigationMenuContent value="getting-started">
                            <Box
                                component="ul"
                                sx={{
                                    display: 'grid',
                                    gap: 2,
                                    p: 2,
                                    m: 0,
                                    listStyle: 'none',
                                    width: { xs: 280, md: 400, lg: 500 },
                                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                                }}
                            >
                                <li style={{ gridRow: 'span 3', listStyle: 'none' }}>
                                    <NavigationMenuLink
                                        href="/"
                                        style={{
                                            display: 'flex',
                                            height: '100%',
                                            width: '100%',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-end',
                                            borderRadius: '8px',
                                            backgroundImage: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
                                            padding: '24px',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <Rocket size={24} />
                                        <Typography variant="body1" fontWeight={500} sx={{ mt: 2, mb: 1, color: 'text.primary' }}>
                                            Design System
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            Beautifully designed components built with Material UI and styled with Emotion.
                                        </Typography>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/docs/installation" title="Installation">
                                    How to install dependencies and structure your app.
                                </ListItem>
                                <ListItem href="/docs/typography" title="Typography">
                                    Styles for headings, paragraphs, lists, and more.
                                </ListItem>
                            </Box>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Menu Item 2: Components (Grid Layout) */}
                    <NavigationMenuItem value="components">
                        <NavigationMenuTrigger value="components">Components</NavigationMenuTrigger>
                        <NavigationMenuContent value="components">
                            <Box
                                component="ul"
                                sx={{
                                    display: 'grid',
                                    width: { xs: 300, md: 400, lg: 500 },
                                    gap: 2,
                                    p: 2,
                                    m: 0,
                                    listStyle: 'none',
                                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                                }}
                            >
                                <ListItem href="/docs/components/alert" title="Alert">
                                    Displays a callout for user attention.
                                </ListItem>
                                <ListItem href="/docs/components/hover-card" title="Hover Card">
                                    For sighted users to preview content available behind a link.
                                </ListItem>
                                <ListItem href="/docs/components/progress" title="Progress">
                                    Displays an indicator showing the completion progress of a task.
                                </ListItem>
                                <ListItem href="/docs/components/scroll-area" title="Scroll-area">
                                    Visually or semantically separates content.
                                </ListItem>
                            </Box>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Menu Item 3: Simple Link */}
                    <NavigationMenuItem value="documentation">
                        <NavigationMenuLink href="/docs">
                            Documentation
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>

        </Box>
    );
}