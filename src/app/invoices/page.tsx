// src/app/invoices/page.tsx
'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
    },
];

export default function InvoiceTable() {

    // A helper function to map status strings to our Badge variants
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Paid':
                return <Badge variant="default">{status}</Badge>;
            case 'Pending':
                return <Badge variant="secondary">{status}</Badge>;
            case 'Unpaid':
                return <Badge variant="destructive">{status}</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead sx={{ width: 100 }}>Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead align="right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell sx={{ fontWeight: 500 }}>{invoice.invoice}</TableCell>

                            {/* Using our new Badge component here! */}
                            <TableCell>{getStatusBadge(invoice.paymentStatus)}</TableCell>

                            <TableCell align="right">{invoice.totalAmount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}