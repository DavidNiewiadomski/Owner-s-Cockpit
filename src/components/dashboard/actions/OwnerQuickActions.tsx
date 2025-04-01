
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks, Wallet, ShieldCheck, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export function OwnerQuickActions() {
  return (
    <Card className="bg-black border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Owner Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" asChild className="h-auto flex-col py-4 border-gray-700 hover:bg-cyan-900/20 hover:border-cyan-800 hover:text-cyan-300">
            <Link to="/action-items">
              <ListChecks className="h-6 w-6 mb-2 text-cyan-400" />
              <span className="text-sm">Action Items</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto flex-col py-4 border-gray-700 hover:bg-blue-900/20 hover:border-blue-800 hover:text-blue-300">
            <Link to="/budget-financials">
              <Wallet className="h-6 w-6 mb-2 text-blue-400" />
              <span className="text-sm">Budget & Finances</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto flex-col py-4 border-gray-700 hover:bg-green-900/20 hover:border-green-800 hover:text-green-300">
            <Link to="/safety-sustainability">
              <ShieldCheck className="h-6 w-6 mb-2 text-green-400" />
              <span className="text-sm">Safety Reports</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto flex-col py-4 border-gray-700 hover:bg-purple-900/20 hover:border-purple-800 hover:text-purple-300">
            <Link to="/timeline">
              <Calendar className="h-6 w-6 mb-2 text-purple-400" />
              <span className="text-sm">Timeline</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
