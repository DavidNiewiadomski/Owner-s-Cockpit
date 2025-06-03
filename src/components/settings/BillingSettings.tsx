
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

export function BillingSettings() {
  const { toast } = useToast();
  const [billingInfo, setBillingInfo] = useLocalStorage('billingInfo', {
    plan: 'Enterprise Plan',
    status: 'Active',
    nextBilling: 'May 15, 2024',
    paymentMethod: '•••• •••• •••• 4242',
    expiryDate: '12/24'
  });

  const [billingHistory] = useLocalStorage('billingHistory', [
    { date: 'April 15, 2024', description: 'Enterprise Plan - Monthly', amount: '$199.00' },
    { date: 'March 15, 2024', description: 'Enterprise Plan - Monthly', amount: '$199.00' },
    { date: 'February 15, 2024', description: 'Enterprise Plan - Monthly', amount: '$199.00' }
  ]);

  const handlePaymentMethodChange = () => {
    toast({
      title: "Payment Method",
      description: "Payment method update functionality would be implemented here.",
    });
  };

  const handleDownloadInvoice = (date: string) => {
    toast({
      title: "Download Invoice",
      description: `Downloading invoice for ${date}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing and Subscription</CardTitle>
        <CardDescription>
          Manage your billing information and subscription plan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border p-4 bg-muted/50">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{billingInfo.plan}</h3>
              <p className="text-sm text-muted-foreground">Unlimited projects, advanced analytics</p>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              {billingInfo.status}
            </Badge>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Next billing date</span>
            <span>{billingInfo.nextBilling}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Payment Method</h3>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-md bg-background flex items-center justify-center border">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="font-medium">{billingInfo.paymentMethod}</p>
                <p className="text-sm text-muted-foreground">Expires {billingInfo.expiryDate}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handlePaymentMethodChange}>
              Change
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Billing History</h3>
          <div className="border rounded-lg divide-y">
            {billingHistory.map((invoice, index) => (
              <div key={index} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{invoice.date}</p>
                  <p className="text-sm text-muted-foreground">{invoice.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{invoice.amount}</p>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs"
                    onClick={() => handleDownloadInvoice(invoice.date)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
