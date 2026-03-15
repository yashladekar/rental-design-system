'use client';

import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import {
    Bell, Search, Settings, MoreVertical, Plus, User, CreditCard,
    LayoutDashboard, Users, FileText, ChevronRight
} from 'lucide-react';

// --- UI Component Imports ---
import { Accordion, AccordionContent, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarGroup } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Checkbox } from '@/components/ui/checkbox';
import { CommandMenu } from '@/components/global/command-menu';
import { DatePicker } from '@/components/ui/date-picker';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent } from '@/components/ui/pagination';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { Radio, RadioGroup } from '@/components/ui/radio-group';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Select, SelectItem, SelectLabel } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip } from '@/components/ui/tooltip';

export default function MasterDashboard() {
    const [activeTab, setActiveTab] = React.useState('overview');
    const [date, setDate] = React.useState<Dayjs | null>(dayjs());
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [sheetOpen, setSheetOpen] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const [dropdownAnchorEl, setDropdownAnchorEl] = React.useState<HTMLElement | null>(null);
    const dropdownOpen = Boolean(dropdownAnchorEl);

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', bgcolor: 'background.default' }}>

            {/* Global Command Menu (Cmd+K) */}
            <CommandMenu />

            {/* Top Navigation Bar */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 4, py: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem><BreadcrumbLink href="#">Acme Corp</BreadcrumbLink></BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbPage>Dashboard</BreadcrumbPage></BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <Stack direction="row" spacing={2} alignItems="center">
                    <Tooltip content="Notifications">
                        <Button variant="ghost" sx={{ p: 1, minWidth: 'auto' }}><Bell size={20} /></Button>
                    </Tooltip>

                    <DropdownMenuTrigger>
                        <Avatar
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                            sx={{ cursor: 'pointer' }}
                            onClick={(event) => setDropdownAnchorEl(event.currentTarget)}
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        open={dropdownOpen}
                        anchorEl={dropdownAnchorEl}
                        onClose={() => setDropdownAnchorEl(null)}
                        align="end"
                    >
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setDropdownAnchorEl(null)}><User size={16} /><span>Profile</span></DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDropdownAnchorEl(null)}><CreditCard size={16} /><span>Billing</span></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem sx={{ color: 'error.main' }} onClick={() => setDropdownAnchorEl(null)}>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </Stack>
            </Box>

            {/* Main Resizable Layout */}
            <ResizablePanelGroup direction="vertical" style={{ height: '100%' }}>

                {/* Sidebar Panel */}
                <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                    <ScrollArea sx={{ height: '100%', p: 3, bgcolor: 'background.paper' }}>
                        <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: 'block' }}>Navigation</Typography>
                        <Accordion>
                            <AccordionTrigger><Stack direction="row" spacing={1}><LayoutDashboard size={18} /><span>Dashboards</span></Stack></AccordionTrigger>
                            <AccordionContent>
                                <Stack spacing={1} sx={{ pl: 4 }}>
                                    <BreadcrumbLink href="#">Analytics</BreadcrumbLink>
                                    <BreadcrumbLink href="#">Finance</BreadcrumbLink>
                                </Stack>
                            </AccordionContent>
                        </Accordion>
                        <Accordion>
                            <AccordionTrigger><Stack direction="row" spacing={1}><Users size={18} /><span>Users</span></Stack></AccordionTrigger>
                            <AccordionContent>Manage team access.</AccordionContent>
                        </Accordion>
                    </ScrollArea>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Main Content Panel */}
                <ResizablePanel defaultSize={80}>
                    <ScrollArea sx={{ height: '100%' }}>
                        <Box sx={{ p: { xs: 4, md: 8 }, maxWidth: 1200, margin: '0 auto' }}>

                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                                <Typography variant="h4" fontWeight={600}>Overview</Typography>
                                <Button variant="default" onClick={() => setSheetOpen(true)}><Plus size={16} className="mr-2" /> New Project</Button>
                            </Stack>

                            <Tabs>
                                <TabsList value={activeTab} onChange={(_, val) => setActiveTab(val)}>
                                    <TabsTrigger value="overview" label="Overview" />
                                    <TabsTrigger value="data" label="Data Table" />
                                    <TabsTrigger value="settings" label="Settings & Forms" />
                                </TabsList>

                                {/* --- TAB 1: OVERVIEW --- */}
                                <TabsContent value="overview" currentValue={activeTab}>
                                    <Stack spacing={4}>
                                        <Alert variant="default">
                                            <AlertTitle>Welcome back!</AlertTitle>
                                            <AlertDescription>Your system is fully up to date. You have 3 new notifications.</AlertDescription>
                                        </Alert>

                                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
                                            <Card sx={{ flex: 1 }}>
                                                <CardHeader>
                                                    <CardTitle>Storage Usage</CardTitle>
                                                    <CardDescription>You are nearing your plan limit.</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <Stack spacing={2}>
                                                        <Stack direction="row" justifyContent="space-between">
                                                            <Typography variant="body2" fontWeight={500}>80% Used</Typography>
                                                            <Badge variant="destructive" label="Action Required" />
                                                        </Stack>
                                                        <Progress value={80} sx={{ '& .MuiLinearProgress-bar': { backgroundColor: 'error.main' } }} />
                                                    </Stack>
                                                </CardContent>
                                            </Card>

                                            <Card sx={{ flex: 1 }}>
                                                <CardHeader>
                                                    <CardTitle>Active Team</CardTitle>
                                                    <CardDescription>Collaborators currently online.</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <HoverCard>
                                                        <HoverCardTrigger asChild>
                                                            <Box sx={{ display: 'inline-block' }}>
                                                                <AvatarGroup max={4}>
                                                                    <Avatar src="https://github.com/shadcn.png" />
                                                                    <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
                                                                    <Avatar src="https://mui.com/static/images/avatar/3.jpg" />
                                                                </AvatarGroup>
                                                            </Box>
                                                        </HoverCardTrigger>
                                                        <HoverCardContent align="start">
                                                            <Typography variant="body2" fontWeight={600}>Team Alpha</Typography>
                                                            <Typography variant="body2" color="text.secondary">Currently working on Project X.</Typography>
                                                        </HoverCardContent>
                                                    </HoverCard>
                                                </CardContent>
                                            </Card>
                                        </Stack>

                                        <Box sx={{ mt: 4 }}>
                                            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Featured Updates</Typography>
                                            <Carousel opts={{ align: 'start' }}>
                                                <CarouselContent>
                                                    {[1, 2, 3, 4, 5].map((i) => (
                                                        <CarouselItem key={i} sx={{ flexBasis: { xs: '100%', md: '50%', lg: '33.333%' } }}>
                                                            <Card sx={{ p: 2, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <Typography variant="h5" color="text.secondary">Update Feature {i}</Typography>
                                                            </Card>
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                                <CarouselPrevious />
                                                <CarouselNext />
                                            </Carousel>
                                        </Box>
                                    </Stack>
                                </TabsContent>

                                {/* --- TAB 2: DATA TABLE --- */}
                                <TabsContent value="data" currentValue={activeTab}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Recent Transactions</CardTitle>
                                            <CardDescription>A list of your recent invoices.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Invoice</TableHead>
                                                        <TableHead>Status</TableHead>
                                                        <TableHead>Method</TableHead>
                                                        <TableHead align="right">Amount</TableHead>
                                                        <TableHead align="right">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 500 }}>INV001</TableCell>
                                                        <TableCell><Badge variant="default" label="Paid" /></TableCell>
                                                        <TableCell>Credit Card</TableCell>
                                                        <TableCell align="right">$250.00</TableCell>
                                                        <TableCell align="right">
                                                            <Button variant="ghost" size="small" onClick={() => setDialogOpen(true)}>Edit</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{ fontWeight: 500 }}>INV002</TableCell>
                                                        <TableCell><Badge variant="secondary" label="Pending" /></TableCell>
                                                        <TableCell>PayPal</TableCell>
                                                        <TableCell align="right">$150.00</TableCell>
                                                        <TableCell align="right">
                                                            <Button variant="ghost" size="small" onClick={() => setDialogOpen(true)}>Edit</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                            <Box sx={{ mt: 4 }}>
                                                <Pagination>
                                                    <PaginationContent count={5} page={1} />
                                                </Pagination>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* --- TAB 3: SETTINGS & FORMS --- */}
                                <TabsContent value="settings" currentValue={activeTab}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Preferences</CardTitle>
                                            <CardDescription>Manage your account settings and preferences.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Stack spacing={6}>

                                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Label htmlFor="email">Email Address</Label>
                                                        <Input id="email" placeholder="m@example.com" />
                                                    </Box>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Label>Date of Birth</Label>
                                                        <DatePicker value={date} onChange={setDate} sx={{ width: '100%' }} />
                                                    </Box>
                                                </Stack>

                                                <Box>
                                                    <Label>Bio</Label>
                                                    <Textarea placeholder="Tell us about yourself..." minRows={4} />
                                                </Box>

                                                <Separator />

                                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                    <Box>
                                                        <Label sx={{ mb: 0 }}>Marketing Emails</Label>
                                                        <Typography variant="body2" color="text.secondary">Receive product updates and offers.</Typography>
                                                    </Box>
                                                    <Switch defaultChecked />
                                                </Stack>

                                                <Box>
                                                    <Label>Volume Level</Label>
                                                    <Slider defaultValue={50} max={100} step={10} marks />
                                                </Box>

                                                <Box>
                                                    <Label>Theme Preference</Label>
                                                    <RadioGroup defaultValue="system">
                                                        <Stack spacing={1} sx={{ mt: 1 }}>
                                                            <Stack direction="row" spacing={1} alignItems="center"><Radio value="light" id="r-light" /><Label htmlFor="r-light" sx={{ mb: 0 }}>Light</Label></Stack>
                                                            <Stack direction="row" spacing={1} alignItems="center"><Radio value="dark" id="r-dark" /><Label htmlFor="r-dark" sx={{ mb: 0 }}>Dark</Label></Stack>
                                                            <Stack direction="row" spacing={1} alignItems="center"><Radio value="system" id="r-system" /><Label htmlFor="r-system" sx={{ mb: 0 }}>System</Label></Stack>
                                                        </Stack>
                                                    </RadioGroup>
                                                </Box>

                                                <Box>
                                                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                                        <Checkbox id="terms" sx={{ mt: 0.25 }} />
                                                        <Stack spacing={0}>
                                                            <Label htmlFor="terms" sx={{ mb: 0, cursor: 'pointer' }}>Accept terms and conditions</Label>
                                                            <Typography variant="body2" color="text.secondary">You agree to our Terms of Service.</Typography>
                                                        </Stack>
                                                    </Stack>
                                                </Box>

                                            </Stack>
                                        </CardContent>
                                        <CardFooter sx={{ justifyContent: 'space-between' }}>
                                            <Button variant="outline" onClick={() => setDrawerOpen(true)}>Open Mobile Drawer</Button>
                                            <Button variant="default">Save Settings</Button>
                                        </CardFooter>
                                    </Card>
                                </TabsContent>

                            </Tabs>

                            {/* Skeleton Demo at the bottom */}
                            <Box sx={{ mt: 8 }}>
                                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Loading State Preview</Typography>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                                    <Skeleton variant="circular" width={48} height={48} />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Skeleton variant="text" width={120} height={20} />
                                        <Skeleton variant="text" width={180} height={16} sx={{ mt: 0.5 }} />
                                    </Box>
                                </Stack>
                            </Box>

                        </Box>
                    </ScrollArea>
                </ResizablePanel>

            </ResizablePanelGroup>

            {/* --- OVERLAYS --- */}

            {/* Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogHeader>
                    <DialogTitle onClose={() => setDialogOpen(false)}>Edit Transaction</DialogTitle>
                    <DialogDescription>Modify the details of this invoice.</DialogDescription>
                </DialogHeader>
                <DialogContent>
                    <Stack spacing={3} sx={{ py: 2 }}>
                        <Box><Label>Amount</Label><Input defaultValue="$250.00" /></Box>
                        <Box>
                            <Label>Status</Label>
                            <Select defaultValue="paid">
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                            </Select>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button variant="default" onClick={() => setDialogOpen(false)}>Save</Button>
                </DialogFooter>
            </Dialog>

            {/* Sheet (Right Sidebar Form) */}
            <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} side="right">
                <SheetContent onClose={() => setSheetOpen(false)}>
                    <SheetHeader>
                        <SheetTitle>Create Project</SheetTitle>
                        <SheetDescription>Deploy your new application instantly.</SheetDescription>
                    </SheetHeader>
                    <Separator sx={{ mx: -3, mb: 4, width: 'auto' }} />
                    <Stack spacing={4} sx={{ mb: 4 }}>
                        <Box><Label>Project Name</Label><Input placeholder="my-app" /></Box>
                        <Box>
                            <Label>Framework</Label>
                            <Select defaultValue="nextjs">
                                <SelectLabel>React</SelectLabel>
                                <SelectItem value="nextjs">Next.js</SelectItem>
                                <SelectItem value="remix">Remix</SelectItem>
                                <SelectLabel>Vue</SelectLabel>
                                <SelectItem value="nuxt">Nuxt</SelectItem>
                            </Select>
                        </Box>
                    </Stack>
                    <SheetFooter>
                        <Button variant="default" onClick={() => setSheetOpen(false)}>Deploy</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

            {/* Mobile Drawer (Bottom) */}
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onOpen={() => setDrawerOpen(true)}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Action Required</DrawerTitle>
                        <DrawerDescription>Please confirm your intent to proceed.</DrawerDescription>
                    </DrawerHeader>
                    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="body2" textAlign="center" color="text.secondary">
                            This action cannot be undone. Are you sure you want to permanently delete this file from our servers?
                        </Typography>
                    </Box>
                    <DrawerFooter>
                        <Button variant="destructive" onClick={() => setDrawerOpen(false)}>Confirm Delete</Button>
                        <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </Box>
    );
}