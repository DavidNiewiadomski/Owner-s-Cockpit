
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks, Wallet, ShieldCheck, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export function OwnerQuickActions() {
  return (
    <Card className="bg-black border-gray-800 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Owner Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" asChild className="h-auto flex-col py-4 border-cyan-500 bg-gradient-to-b from-black to-cyan-950/30 hover:bg-cyan-900/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300">
            <Link to="/action-items">
              <ListChecks className="h-6 w-6 mb-2 text-cyan-300" />
              <span className="text-sm font-medium text-white">Action Items</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto flex-col py-4 border-blue-500 bg-gradient-to-b from-black to-blue-950/30 hover:bg-blue-900/20 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300">
            <Link to="/budget-financials">
              <Wallet className="h-6 w-6 mb-2 text-blue-300" />
              <span className="text-sm font-medium text-white">Budget & Finances</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto flex-col py-4 border-green-500 bg-gradient-to-b from-black to-green-950/30 hover:bg-green-900/20 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300">
            <Link to="/safety-sustainability">
              <ShieldCheck className="h-6 w-6 mb-2 text-green-300" />
              <span className="text-sm font-medium text-white">Safety Reports</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto flex-col py-4 border-purple-500 bg-gradient-to-b from-black to-purple-950/30 hover:bg-purple-900/20 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300">
            <Link to="/timeline">
              <Calendar className="h-6 w-6 mb-2 text-purple-300" />
              <span className="text-sm font-medium text-white">Timeline</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
