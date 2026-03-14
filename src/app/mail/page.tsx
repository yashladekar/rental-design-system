// src/app/mail/page.tsx
'use client';

import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';

export default function MailLayout() {
    const [form, setForm] = React.useState({
        name: 'Jane Cooper',
        email: 'jane@example.com',
        subject: 'Rental agreement update',
        message:
            'Hi team, please update the move-in date to next Monday and confirm parking availability.',
    });

    const updateField = (field: keyof typeof form) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm((prev) => ({ ...prev, [field]: event.target.value }));
        };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                p: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.default',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 1100,
                    height: 640,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    overflow: 'hidden',
                    backgroundColor: 'background.paper',
                }}
            >
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={56} minSize={35}>
                        <Box sx={{ height: '100%', p: 3 }}>
                            <Typography variant="h6" sx={{ mb: 0.5 }}>
                                Tenant Contact Form
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Drag the divider to resize this form panel.
                            </Typography>

                            <Stack spacing={2.5}>
                                <Box>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={form.name}
                                        onChange={updateField('name')}
                                        placeholder="Enter full name"
                                    />
                                </Box>

                                <Box>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={form.email}
                                        onChange={updateField('email')}
                                        placeholder="name@company.com"
                                    />
                                </Box>

                                <Box>
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        value={form.subject}
                                        onChange={updateField('subject')}
                                        placeholder="Message subject"
                                    />
                                </Box>

                                <Box>
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        minRows={6}
                                        value={form.message}
                                        onChange={updateField('message')}
                                        placeholder="Write your message"
                                    />
                                </Box>

                                <Stack direction="row" spacing={1.5}>
                                    <Button variant="default">Send</Button>
                                    <Button variant="outline">Save Draft</Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    <ResizablePanel defaultSize={44} minSize={28}>
                        <ResizablePanelGroup direction="vertical">
                            <ResizablePanel defaultSize={62} minSize={35}>
                                <Box
                                    sx={{
                                        height: '100%',
                                        p: 3,
                                        backgroundColor: '#f8fafc',
                                        borderBottom: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                        Live Preview
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 0.75 }}>
                                        <strong>From:</strong> {form.name} ({form.email})
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 0.75 }}>
                                        <strong>Subject:</strong> {form.subject || 'Untitled'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                        {form.message || 'Your message preview will appear here.'}
                                    </Typography>
                                </Box>
                            </ResizablePanel>

                            <ResizableHandle />

                            <ResizablePanel defaultSize={38} minSize={25}>
                                <Box sx={{ height: '100%', p: 3, backgroundColor: '#f1f5f9' }}>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                        Form Metadata
                                    </Typography>
                                    <Typography variant="body2">Characters: {form.message.length}</Typography>
                                    <Typography variant="body2">Words: {form.message.trim() ? form.message.trim().split(/\s+/).length : 0}</Typography>
                                    <Typography variant="body2">Email Valid: {form.email.includes('@') ? 'Yes' : 'No'}</Typography>
                                </Box>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </Box>
        </Box>
    );
}