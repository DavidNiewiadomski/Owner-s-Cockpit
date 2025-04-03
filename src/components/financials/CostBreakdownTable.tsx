
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function CostBreakdownTable() {
  return (
    <Card className="mb-6 bg-black border-cyan-900/30 hover-scale">
      <CardHeader className="bg-black">
        <CardTitle className="text-blue-300">Detailed Cost Breakdown</CardTitle>
        <CardDescription>Itemized costs by category</CardDescription>
      </CardHeader>
      <CardContent className="bg-black">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-cyan-900/30">
                <TableHead className="text-gray-300">Category</TableHead>
                <TableHead className="text-gray-300">Budget</TableHead>
                <TableHead className="text-gray-300">Actual</TableHead>
                <TableHead className="text-gray-300">Variance</TableHead>
                <TableHead className="text-gray-300">Variance %</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b border-cyan-900/30 hover:bg-cyan-900/10 transition-colors">
                <TableCell className="font-medium text-white">Site Work & Foundation</TableCell>
                <TableCell className="text-gray-300">$425,000</TableCell>
                <TableCell className="text-gray-300">$412,750</TableCell>
                <TableCell className="text-emerald-400">$12,250</TableCell>
                <TableCell className="text-emerald-400">2.9%</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/20 text-emerald-400 border border-emerald-700/40">
                    Under Budget
                  </span>
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-cyan-900/30 hover:bg-cyan-900/10 transition-colors">
                <TableCell className="font-medium text-white">Structural Framing</TableCell>
                <TableCell className="text-gray-300">$720,000</TableCell>
                <TableCell className="text-gray-300">$748,800</TableCell>
                <TableCell className="text-rose-400">-$28,800</TableCell>
                <TableCell className="text-rose-400">-4.0%</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-900/20 text-rose-400 border border-rose-700/40">
                    Over Budget
                  </span>
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-cyan-900/30 hover:bg-cyan-900/10 transition-colors">
                <TableCell className="font-medium text-white">Electrical Systems</TableCell>
                <TableCell className="text-gray-300">$345,000</TableCell>
                <TableCell className="text-gray-300">$341,550</TableCell>
                <TableCell className="text-emerald-400">$3,450</TableCell>
                <TableCell className="text-emerald-400">1.0%</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/20 text-emerald-400 border border-emerald-700/40">
                    Under Budget
                  </span>
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-cyan-900/30 hover:bg-cyan-900/10 transition-colors">
                <TableCell className="font-medium text-white">Plumbing & HVAC</TableCell>
                <TableCell className="text-gray-300">$520,000</TableCell>
                <TableCell className="text-gray-300">$546,000</TableCell>
                <TableCell className="text-rose-400">-$26,000</TableCell>
                <TableCell className="text-rose-400">-5.0%</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-900/20 text-rose-400 border border-rose-700/40">
                    Over Budget
                  </span>
                </TableCell>
              </TableRow>
              <TableRow className="border-b border-cyan-900/30 hover:bg-cyan-900/10 transition-colors">
                <TableCell className="font-medium text-white">Interior Finishes</TableCell>
                <TableCell className="text-gray-300">$635,000</TableCell>
                <TableCell className="text-gray-300">$622,300</TableCell>
                <TableCell className="text-emerald-400">$12,700</TableCell>
                <TableCell className="text-emerald-400">2.0%</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/20 text-emerald-400 border border-emerald-700/40">
                    Under Budget
                  </span>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-cyan-900/10 transition-colors">
                <TableCell className="font-medium text-white">Exterior Facades</TableCell>
                <TableCell className="text-gray-300">$390,000</TableCell>
                <TableCell className="text-gray-300">$409,500</TableCell>
                <TableCell className="text-rose-400">-$19,500</TableCell>
                <TableCell className="text-rose-400">-5.0%</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-900/20 text-rose-400 border border-rose-700/40">
                    Over Budget
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="bg-black text-sm text-gray-500 border-t border-cyan-900/30">
        Last updated: June 15, 2023
      </CardFooter>
    </Card>
  );
}
