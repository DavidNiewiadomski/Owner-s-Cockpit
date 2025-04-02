
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ListChecks, Wallet, ShieldCheck, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export function OwnerQuickActions() {
  return (
    <Card className="bg-black border-none shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-black px-4 py-3 text-center border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Owner Quick Actions</h2>
        </div>
        <div className="grid grid-cols-4 gap-0 divide-x divide-gray-800">
          <Button variant="ghost" asChild className="rounded-none h-24 bg-black hover:bg-cyan-950/40 flex flex-col items-center justify-center p-4 border-0">
            <Link to="/action-items" className="w-full h-full flex flex-col items-center justify-center gap-2">
              <ListChecks className="h-8 w-8 text-cyan-400" />
              <span className="text-sm font-medium text-white">Action Items</span>
            </Link>
          </Button>
          
          <Button variant="ghost" asChild className="rounded-none h-24 bg-black hover:bg-blue-950/40 flex flex-col items-center justify-center p-4 border-0">
            <Link to="/budget-financials" className="w-full h-full flex flex-col items-center justify-center gap-2">
              <Wallet className="h-8 w-8 text-blue-400" />
              <span className="text-sm font-medium text-white">Budget & Finances</span>
            </Link>
          </Button>
          
          <Button variant="ghost" asChild className="rounded-none h-24 bg-black hover:bg-green-950/40 flex flex-col items-center justify-center p-4 border-0">
            <Link to="/safety-sustainability" className="w-full h-full flex flex-col items-center justify-center gap-2">
              <ShieldCheck className="h-8 w-8 text-green-400" />
              <span className="text-sm font-medium text-white">Safety Reports</span>
            </Link>
          </Button>
          
          <Button variant="ghost" asChild className="rounded-none h-24 bg-black hover:bg-purple-950/40 flex flex-col items-center justify-center p-4 border-0">
            <Link to="/timeline" className="w-full h-full flex flex-col items-center justify-center gap-2">
              <Calendar className="h-8 w-8 text-purple-400" />
              <span className="text-sm font-medium text-white">Timeline</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
