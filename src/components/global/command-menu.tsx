// src/components/global/command-menu.tsx
'use client';

import * as React from 'react';
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User
} from 'lucide-react';

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@/components/ui/command';

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);

    // The global keyboard listener
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            // Listen for Cmd+K (Mac) or Ctrl+K (Windows)
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <>
            <p className="text-sm text-muted-foreground mb-4">
                Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </p>

            <CommandDialog open={open} onClose={() => setOpen(false)}>
                <CommandInput placeholder="Type a command or search..." />

                <CommandList>

                    {/* Automatically shows if no items match the search query */}
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup heading="Suggestions">
                        <CommandItem onSelect={() => { console.log('Calendar'); setOpen(false); }}>
                            <Calendar />
                            <span>Calendar</span>
                        </CommandItem>
                        <CommandItem onSelect={() => { console.log('Search Emoji'); setOpen(false); }}>
                            <Smile />
                            <span>Search Emoji</span>
                        </CommandItem>
                        <CommandItem onSelect={() => { console.log('Calculator'); setOpen(false); }}>
                            <Calculator />
                            <span>Calculator</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Settings">
                        <CommandItem onSelect={() => { console.log('Profile'); setOpen(false); }}>
                            <User />
                            <span>Profile</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => { console.log('Billing'); setOpen(false); }}>
                            <CreditCard />
                            <span>Billing</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem onSelect={() => { console.log('Settings'); setOpen(false); }}>
                            <Settings />
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>

                </CommandList>
            </CommandDialog>
        </>
    );
}