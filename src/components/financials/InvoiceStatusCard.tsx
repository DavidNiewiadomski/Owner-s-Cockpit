
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProject } from "@/contexts/ProjectContext";

export function InvoiceStatusCard() {
  const { selectedProject } = useProject();
  
  // Invoice data - in a real app, this would come from an API
  const invoiceData = {
    total: 145,
    paid: 98,
    pending: 35,
    overdue: 12,
    paidAmount: 2472500,
    pendingAmount: 925000,
    overdueAmount: 315000
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Invoicing Status</CardTitle>
        <CardDescription>
          Financial transaction tracking for {selectedProject?.title || "All Projects"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Paid Invoices</span>
            <span className="text-sm font-medium">{invoiceData.paid} of {invoiceData.total}</span>
          </div>
          <Progress value={(invoiceData.paid / invoiceData.total) * 100} className="h-2 bg-muted" />
          <div className="text-sm font-medium text-green-500">
            {formatCurrency(invoiceData.paidAmount)}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Pending Invoices</span>
            <span className="text-sm font-medium">{invoiceData.pending} of {invoiceData.total}</span>
          </div>
          <Progress value={(invoiceData.pending / invoiceData.total) * 100} className="h-2 bg-muted" />
          <div className="text-sm font-medium text-amber-500">
            {formatCurrency(invoiceData.pendingAmount)}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Overdue Invoices</span>
            <span className="text-sm font-medium">{invoiceData.overdue} of {invoiceData.total}</span>
          </div>
          <Progress value={(invoiceData.overdue / invoiceData.total) * 100} className="h-2 bg-muted" />
          <div className="text-sm font-medium text-red-500">
            {formatCurrency(invoiceData.overdueAmount)}
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">Next payment due:</span>
            <span>June 30, 2023</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Invoice #INV-2023-0087 for {formatCurrency(76500)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
