// // src/app/dashboard/page.tsx
// import { Stack, Box } from '@mui/material';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//     Card,
//     CardHeader,
//     CardTitle,
//     CardDescription,
//     CardContent,
//     CardFooter
// } from '@/components/ui/card';

// export default function DashboardPage() {
//     return (
//         <div>
//         // Centered layout using MUI Box
//             {/* <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 8 }}>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Create project</CardTitle>
//                         <CardDescription>Deploy your new project in one-click.</CardDescription>
//                     </CardHeader>

//                     <CardContent>
//                         <Stack spacing={2}>
//                             <Stack spacing={1}>
//                                 <Box component="label" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
//                                     Name
//                                 </Box>
//                                 <Input placeholder="Name of your project" />
//                             </Stack>
//                             <Stack spacing={1}>
//                                 <Box component="label" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
//                                     Framework
//                                 </Box>
//                                 <Input placeholder="Next.js" />
//                             </Stack>
//                         </Stack>
//                     </CardContent>

//                     <CardFooter sx={{ justifyContent: 'space-between' }}>
//                         <Button variant="outline">Cancel</Button>
//                         <Button variant="default">Deploy</Button>
//                     </CardFooter>
//                 </Card>

//             </Box> */}
//             <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 8 }}>
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Create project</CardTitle>
//                         <CardDescription>Deploy your new project in one-click.</CardDescription>
//                     </CardHeader>

//                     <CardContent>
//                         {/* Main vertical stack for the form fields */}
//                         <Stack spacing={3}>

//                             {/* Field 1: Name */}
//                             {/* We use Box here because the Label has built-in marginBottom, 
//                 so we don't need a Stack to gap them. */}
//                             <Box>
//                                 <Label htmlFor="project-name" required>Project Name</Label>
//                                 <Input id="project-name" placeholder="Name of your project" />
//                             </Box>

//                             {/* Field 2: Framework */}
//                             <Box>
//                                 <Label htmlFor="framework">Framework</Label>
//                                 <Input id="framework" placeholder="Next.js" />
//                             </Box>

//                         </Stack>
//                     </CardContent>

//                     <CardFooter sx={{ justifyContent: 'flex-end', gap: 2 }}>
//                         <Button variant="outline">Cancel</Button>
//                         <Button variant="default">Deploy</Button>
//                     </CardFooter>
//                 </Card>
//             </Box>
//         </div>
//     );
// }

// src/app/dashboard/page.tsx


// 'use client';

// import * as React from 'react';
// import { Stack, Box } from '@mui/material';
// import { Label } from '@/components/ui/label';
// import { Select, SelectItem, SelectLabel } from '@/components/ui/select';

// export default function SettingsForm() {
//     const [timezone, setTimezone] = React.useState('');

//     return (
//         <Box sx={{ maxWidth: 300, mt: 4 }}>
//             <Stack spacing={1}>
//                 <Label htmlFor="timezone-select">Timezone</Label>

//                 <Select
//                     id="timezone-select"
//                     value={timezone}
//                     onChange={(e) => setTimezone(String(e.target.value ?? ''))}
//                 >
//                     {/* By setting value="" and disabled, this acts as our Placeholder */}
//                     <SelectItem value="" disabled>
//                         Select a timezone
//                     </SelectItem>

//                     <SelectLabel sx={{ mt: 2, fontSize: '0.875rem' }}>North America</SelectLabel>
//                     <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
//                     <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>

//                     <SelectLabel sx={{ mt: 2, fontSize: '0.875rem' }}>Europe</SelectLabel>
//                     <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
//                     <SelectItem value="cet">Central European Time (CET)</SelectItem>
//                 </Select>
//             </Stack>
//         </Box>
//     );
// }

// src/app/settings/page.tsx
// 'use client';

// import * as React from 'react';
// import { Stack, Box } from '@mui/material';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Label } from '@/components/ui/label';

// export default function NotificationsForm() {
//     const [checked, setChecked] = React.useState(true);

//     return (
//         <Box sx={{ p: 4 }}>
//             {/* We use Stack direction="row" to align the checkbox and label horizontally */}
//             <Stack direction="row" spacing={1.5} alignItems="flex-start">

//                 {/* The Checkbox */}
//                 <Checkbox
//                     id="terms"
//                     checked={checked}
//                     onChange={(e) => setChecked(e.target.checked)}
//                     // We add a tiny bit of top margin (e.g., mt: 0.25 = 2px) to perfectly 
//                     // center the 16px checkbox with the first line of the label text.
//                     sx={{ mt: 0.25 }}
//                 />

//                 {/* The Label & Description */}
//                 <Stack spacing={0.5}>
//                     {/* Notice we set marginBottom: 0 on this Label because the Stack handles spacing */}
//                     <Label htmlFor="terms" sx={{ mb: 0, cursor: 'pointer' }}>
//                         Accept terms and conditions
//                     </Label>
//                     <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
//                         You agree to our Terms of Service and Privacy Policy.
//                     </Box>
//                 </Stack>

//             </Stack>
//         </Box>
//     );
// }


// src/app/dashboard/page.tsx

// 'use client';

// import * as React from 'react';
// import { Box, Stack } from '@mui/material';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle
// } from '@/components/ui/dialog';

// export default function EditProfilePage() {
//     const [open, setOpen] = React.useState(false);

//     return (
//         <Box sx={{ p: 4 }}>
//             {/* 1. The Trigger */}
//             <Button variant="outline" onClick={() => setOpen(true)}>
//                 Edit Profile
//             </Button>

//             {/* 2. The Modal */}
//             <Dialog open={open} onClose={() => setOpen(false)}>

//                 <DialogHeader>
//                     <DialogTitle onClose={() => setOpen(false)}>Edit profile</DialogTitle>
//                     <DialogDescription>
//                         Make changes to your profile here. Click save when you're done.
//                     </DialogDescription>
//                 </DialogHeader>

//                 <DialogContent>
//                     <Stack spacing={3} sx={{ py: 2 }}>
//                         <Box>
//                             <Label htmlFor="name">Name</Label>
//                             <Input id="name" defaultValue="Pedro Duarte" />
//                         </Box>
//                         <Box>
//                             <Label htmlFor="username">Username</Label>
//                             <Input id="username" defaultValue="@peduarte" />
//                         </Box>
//                     </Stack>
//                 </DialogContent>

//                 <DialogFooter>
//                     {/* Note: The Footer automatically stacks these buttons vertically on mobile! */}
//                     <Button variant="outline" onClick={() => setOpen(false)}>
//                         Cancel
//                     </Button>
//                     <Button variant="default" onClick={() => setOpen(false)}>
//                         Save changes
//                     </Button>
//                 </DialogFooter>

//             </Dialog>
//         </Box>
//     );
// }


// // src/app/dashboard/page.tsx
// 'use client';

// import * as React from 'react';
// import { Box, Stack, IconButton } from '@mui/material';
// import { Plus, Settings, Trash2 } from 'lucide-react';
// import { Tooltip } from '@/components/ui/tooltip';
// import { Button } from '@/components/ui/button';

// export default function TooltipExample() {
//     return (
//         <Box sx={{ p: 8, display: 'flex', gap: 4, justifyContent: 'center' }}>

//             {/* Example 1: Wrapping a standard Button */}
//             <Tooltip content="Add to library">
//                 <Button variant="outline">
//                     <Plus size={16} className="mr-2" /> Hover me
//                 </Button>
//             </Tooltip>

//             {/* Example 2: Wrapping Icon Buttons (Very Common) */}
//             <Stack direction="row" spacing={2} sx={{ border: '1px solid', borderColor: 'divider', p: 1, borderRadius: 2 }}>

//                 <Tooltip content="Manage settings">
//                     <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
//                         <Settings size={20} />
//                     </IconButton>
//                 </Tooltip>

//                 {/* Example with a different placement and custom variant styling */}
//                 <Tooltip content="Delete project" placement="bottom">
//                     <IconButton sx={{ color: 'error.main', '&:hover': { backgroundColor: '#fee2e2' } }}>
//                         <Trash2 size={20} />
//                     </IconButton>
//                 </Tooltip>

//             </Stack>

//         </Box>
//     );
// }


// // src/app/dashboard/page.tsx
// 'use client';

// import * as React from 'react';
// import { Box, Stack } from '@mui/material';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Separator } from '@/components/ui/separator';
// import {
//     Sheet,
//     SheetContent,
//     SheetHeader,
//     SheetTitle,
//     SheetDescription,
//     SheetFooter
// } from '@/components/ui/sheet';

// export default function SheetExample() {
//     const [open, setOpen] = React.useState(false);

//     return (
//         <Box sx={{ p: 4 }}>

//             {/* 1. The Trigger Button */}
//             <Button variant="outline" onClick={() => setOpen(true)}>
//                 Open Edit Profile
//             </Button>

//             {/* 2. The Sheet Component */}
//             {/* side="right" means it slides in from the right edge of the screen */}
//             <Sheet open={open} onClose={() => setOpen(false)} side="right">

//                 {/* We pass onClose to SheetContent so it renders the 'X' button in the top right */}
//                 <SheetContent onClose={() => setOpen(false)}>

//                     <SheetHeader>
//                         <SheetTitle>Edit profile</SheetTitle>
//                         <SheetDescription>
//                             Make changes to your profile here. Click save when you're done.
//                         </SheetDescription>
//                     </SheetHeader>

//                     <Separator sx={{ mx: -3, mb: 3, width: 'auto' }} /> {/* Full width separator trick */}

//                     {/* Main Form Content */}
//                     <Stack spacing={4} sx={{ mb: 4 }}>
//                         <Box>
//                             <Label htmlFor="name">Name</Label>
//                             <Input id="name" defaultValue="Pedro Duarte" />
//                         </Box>
//                         <Box>
//                             <Label htmlFor="username">Username</Label>
//                             <Input id="username" defaultValue="@peduarte" />
//                         </Box>
//                     </Stack>

//                     {/* Footer naturally pushes to the bottom of the Sheet */}
//                     <SheetFooter>
//                         <Button variant="outline" onClick={() => setOpen(false)}>
//                             Cancel
//                         </Button>
//                         <Button variant="default" onClick={() => setOpen(false)}>
//                             Save changes
//                         </Button>
//                     </SheetFooter>

//                 </SheetContent>
//             </Sheet>
//         </Box>
//     );
// }

// // src/app/dashboard/page.tsx
// 'use client';

// import * as React from 'react';
// import { Box, Stack } from '@mui/material';
// import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
// import { Terminal } from 'lucide-react';
// import DashboardLoading from './loading';

// export default function AlertsExample() {
//     return (
//         <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 8, p: 4 }}>
//             <Stack spacing={4}>

//                 {/* Example 1: Default Alert */}
//                 <Alert>
//                     <AlertTitle>Heads up!</AlertTitle>
//                     <AlertDescription>
//                         You can add components to your app using the cli.
//                     </AlertDescription>
//                 </Alert>

//                 {/* Example 2: Destructive Alert */}
//                 <Alert variant="destructive">
//                     <AlertTitle>Error</AlertTitle>
//                     <AlertDescription>
//                         Your session has expired. Please log in again.
//                     </AlertDescription>
//                 </Alert>

//                 {/* Example 3: Success Alert */}
//                 <Alert variant="success">
//                     <AlertTitle>Payment Successful</AlertTitle>
//                     <AlertDescription>
//                         Your invoice has been paid. A receipt has been sent to your email.
//                     </AlertDescription>
//                 </Alert>

//                 {/* Example 4: Custom Icon */}
//                 <Alert icon={<Terminal size={20} />}>
//                     <AlertTitle>We have a new update!</AlertTitle>
//                     <AlertDescription>
//                         Run <code>npm install latest</code> to get the new features.
//                     </AlertDescription>
//                 </Alert>

//             </Stack>
//             <DashboardLoading />
//         </Box>
//     );
// }

// // src/app/dashboard/page.tsx
// 'use client';

// import * as React from 'react';
// import { Box, Stack, Typography } from '@mui/material';
// import { Progress } from '@/components/ui/progress';
// import { Button } from '@/components/ui/button';

// export default function ProgressExample() {
//     const [progress, setProgress] = React.useState(13);

//     // Simulate progress
//     React.useEffect(() => {
//         const timer = setTimeout(() => setProgress(66), 500);
//         return () => clearTimeout(timer);
//     }, []);

//     return (
//         <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 8, p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
//             <Stack spacing={4}>

//                 {/* Example 1: Determinate Progress (with a value) */}
//                 <Box>
//                     <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
//                         <Typography variant="body2" fontWeight={500}>Uploading files...</Typography>
//                         <Typography variant="body2" color="text.secondary">{progress}%</Typography>
//                     </Stack>
//                     <Progress value={progress} />
//                 </Box>

//                 {/* Example 2: Indeterminate Progress (animated, unknown duration) */}
//                 <Box>
//                     <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
//                         Processing data
//                     </Typography>
//                     <Progress />
//                 </Box>

//                 {/* Example 3: Smaller, custom-colored Progress */}
//                 <Box>
//                     <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
//                         <Typography variant="body2" fontWeight={500}>Storage space</Typography>
//                         <Typography variant="body2" color="text.secondary">80% used</Typography>
//                     </Stack>
//                     <Progress
//                         value={80}
//                         sx={{
//                             height: 6, // Slimmer bar
//                             '& .MuiLinearProgress-bar': { backgroundColor: 'error.main' } // Red bar when nearly full
//                         }}
//                     />
//                 </Box>

//             </Stack>
//         </Box>
//     );
// }

// 'use client';

// import * as React from 'react';
// import { Box, Stack, Typography } from '@mui/material';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { SlidersHorizontal } from 'lucide-react';

// export default function PopoverExample() {
//     // 1. State to manage the Popover anchor
//     const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

//     // 2. Handlers to open and close
//     const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const open = Boolean(anchorEl);
//     const id = open ? 'simple-popover' : undefined;

//     return (
//         <Box sx={{ p: 8, display: 'flex', justifyContent: 'center' }}>

//             {/* The Trigger Group */}
//             <PopoverTrigger>
//                 <Button
//                     aria-describedby={id}
//                     variant="outline"
//                     onClick={handleClick}
//                 >
//                     <SlidersHorizontal size={16} className="mr-2" />
//                     Dimensions
//                 </Button>
//             </PopoverTrigger>

//             {/* The Popover Content */}
//             <PopoverContent
//                 id={id}
//                 open={open}
//                 anchorEl={anchorEl}
//                 onClose={handleClose}
//                 align="start" // Aligns the left edge of the popover with the left edge of the button
//             >
//                 <Stack spacing={4}>
//                     <Box>
//                         <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
//                             Dimensions
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Set the dimensions for the layer.
//                         </Typography>
//                     </Box>

//                     <Stack spacing={2}>
//                         {/* Row 1 */}
//                         <Stack direction="row" alignItems="center" spacing={2}>
//                             <Label htmlFor="width" sx={{ width: 60, mb: 0 }}>Width</Label>
//                             <Input id="width" defaultValue="100%" sx={{ height: 32 }} />
//                         </Stack>

//                         {/* Row 2 */}
//                         <Stack direction="row" alignItems="center" spacing={2}>
//                             <Label htmlFor="max-width" sx={{ width: 60, mb: 0 }}>Max. W</Label>
//                             <Input id="max-width" defaultValue="300px" sx={{ height: 32 }} />
//                         </Stack>

//                         {/* Row 3 */}
//                         <Stack direction="row" alignItems="center" spacing={2}>
//                             <Label htmlFor="height" sx={{ width: 60, mb: 0 }}>Height</Label>
//                             <Input id="height" defaultValue="25px" sx={{ height: 32 }} />
//                         </Stack>

//                     </Stack>
//                 </Stack>
//             </PopoverContent>

//         </Box>
//     );
// }

// // src/app/dashboard/page.tsx
// 'use client';

// import * as React from 'react';
// import { Box } from '@mui/material';
// import { Button } from '@/components/ui/button';
// import {
//     Cloud,
//     CreditCard,
//     Github,
//     Keyboard,
//     LifeBuoy,
//     LogOut,
//     Mail,
//     MessageSquare,
//     Plus,
//     PlusCircle,
//     Settings,
//     User,
//     UserPlus,
//     Users
// } from 'lucide-react';
// import {
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuShortcut,
//     DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// export default function DropdownMenuExample() {
//     const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

//     const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const open = Boolean(anchorEl);

//     return (
//         <Box sx={{ p: 8, display: 'flex', justifyContent: 'center' }}>

//             <DropdownMenuTrigger>
//                 <Button variant="outline" onClick={handleClick}>
//                     Open Menu

//                 </Button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent
//                 open={open}
//                 anchorEl={anchorEl}
//                 onClose={handleClose}
//                 align="start" // Align the dropdown with the left edge of the button
//             >
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />

//                 <DropdownMenuItem onClick={handleClose}>
//                     <User size={16} />
//                     <span>Profile</span>
//                     <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
//                 </DropdownMenuItem>

//                 <DropdownMenuItem onClick={handleClose}>
//                     <CreditCard size={16} />
//                     <span>Billing</span>
//                     <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
//                 </DropdownMenuItem>

//                 <DropdownMenuItem onClick={handleClose}>
//                     <Settings size={16} />
//                     <span>Settings</span>
//                     <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
//                 </DropdownMenuItem>

//                 <DropdownMenuItem onClick={handleClose}>
//                     <Keyboard size={16} />
//                     <span>Keyboard shortcuts</span>
//                     <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
//                 </DropdownMenuItem>

//                 <DropdownMenuSeparator />

//                 <DropdownMenuItem onClick={handleClose}>
//                     <Users size={16} />
//                     <span>Team</span>
//                 </DropdownMenuItem>

//                 <DropdownMenuItem onClick={handleClose}>
//                     <Plus size={16} />
//                     <span>New Team</span>
//                     <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
//                 </DropdownMenuItem>

//                 <DropdownMenuSeparator />

//                 <DropdownMenuItem onClick={handleClose}>
//                     <Github size={16} />
//                     <span>GitHub</span>
//                 </DropdownMenuItem>

//                 <DropdownMenuItem onClick={handleClose}>
//                     <LifeBuoy size={16} />
//                     <span>Support</span>
//                 </DropdownMenuItem>

//                 <DropdownMenuItem disabled onClick={handleClose}>
//                     <Cloud size={16} />
//                     <span>API (Disabled)</span>
//                 </DropdownMenuItem>

//                 <DropdownMenuSeparator />

//                 <DropdownMenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
//                     <LogOut size={16} />
//                     <span>Log out</span>
//                     <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//                 </DropdownMenuItem>

//             </DropdownMenuContent>

//         </Box>
//     );
// }

// // src/app/dashboard/page.tsx
// 'use client';

// import * as React from 'react';
// import { Box, Stack, Typography } from '@mui/material';
// import { CalendarDays } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import {
//     HoverCard,
//     HoverCardContent,
//     HoverCardTrigger,
// } from '@/components/ui/hover-card';

// export default function HoverCardExample() {
//     return (
//         <Box sx={{ p: 8, display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'flex-start' }}>

//             <HoverCard openDelay={200} closeDelay={150}>

//                 {/* The Element the User Hovers Over */}
//                 <HoverCardTrigger asChild>
//                     <Button variant="ghost" sx={{ p: 0, height: 'auto', minHeight: 'auto' }}>
//                         @nextjs
//                     </Button>
//                 </HoverCardTrigger>

//                 {/* The Card that Appears */}
//                 <HoverCardContent align="start">
//                     <Stack direction="row" spacing={3} alignItems="flex-start">

//                         <Avatar src="https://github.com/vercel.png" alt="@nextjs">
//                             <AvatarFallback>VC</AvatarFallback>
//                         </Avatar>

//                         <Stack spacing={1} sx={{ flex: 1 }}>
//                             <Box>
//                                 <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1 }}>
//                                     @nextjs
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary" sx={{ pt: 0.5 }}>
//                                     The React Framework – created and maintained by @vercel.
//                                 </Typography>
//                             </Box>

//                             <Stack direction="row" alignItems="center" spacing={1} sx={{ pt: 1, color: 'text.secondary' }}>
//                                 <CalendarDays size={14} />
//                                 <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
//                                     Joined December 2021
//                                 </Typography>
//                             </Stack>
//                         </Stack>

//                     </Stack>
//                 </HoverCardContent>

//             </HoverCard>

//         </Box>
//     );
// }


// src/app/dashboard/page.tsx
'use client';

import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function ScrollAreaExample() {
    return (
        <Box sx={{ p: 8, display: 'flex', gap: 8, justifyContent: 'center' }}>

            {/* Example 1: Vertical ScrollArea */}
            <Box sx={{ width: 200 }}>
                <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
                    Tags
                </Typography>

                {/* We constrain the height of the ScrollArea to force overflow */}
                <ScrollArea
                    sx={{
                        height: 288, // h-72
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        p: 2
                    }}
                >
                    <Stack spacing={2}>
                        {tags.map((tag) => (
                            <React.Fragment key={tag}>
                                <Box sx={{ fontSize: '0.875rem' }}>{tag}</Box>
                                <Separator />
                            </React.Fragment>
                        ))}
                    </Stack>
                    {/* Optional: Include for strict API matching if developers expect it */}
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
            </Box>

            {/* Example 2: Horizontal ScrollArea */}
            <Box sx={{ width: 400 }}>
                <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
                    Artworks
                </Typography>

                {/* We use whitespace: nowrap on the inner container and overflowX auto on the wrapper */}
                <ScrollArea
                    orientation="horizontal"
                    sx={{
                        width: '100%',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        p: 2
                    }}
                >
                    <Stack direction="row" spacing={2} sx={{ width: 'max-content' }}>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <Box
                                key={i}
                                sx={{
                                    width: 150,
                                    height: 200,
                                    backgroundColor: 'action.hover',
                                    borderRadius: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'text.secondary'
                                }}
                            >
                                Artwork {i + 1}
                            </Box>
                        ))}
                    </Stack>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </Box>

        </Box>
    );
}