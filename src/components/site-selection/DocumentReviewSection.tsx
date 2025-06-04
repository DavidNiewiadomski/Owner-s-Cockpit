
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FileText, Brain, AlertTriangle, CheckCircle, Clock, Upload, Search } from 'lucide-react';

const documentCategories = [
  {
    category: 'Topographic & Zoning',
    documents: [
      { name: 'Site Survey Report', status: 'reviewed', aiInsight: 'Optimal drainage, minimal grading required', confidence: 95 },
      { name: 'Zoning Compliance Letter', status: 'pending', aiInsight: 'Variance needed for height restrictions', confidence: 78 },
      { name: 'Topographic Survey', status: 'reviewed', aiInsight: '2.3% slope ideal for manufacturing', confidence: 92 },
      { name: 'Environmental Assessment', status: 'in-review', aiInsight: 'No contamination detected', confidence: 88 }
    ]
  },
  {
    category: 'Lease Documentation',
    documents: [
      { name: 'Base Lease Agreement', status: 'reviewed', aiInsight: 'Favorable terms vs. market average', confidence: 85 },
      { name: 'Work Letter Template', status: 'reviewed', aiInsight: 'Standard TI allowance sufficient', confidence: 80 },
      { name: 'Operating Expense Details', status: 'pending', aiInsight: 'Higher than comparable properties', confidence: 75 },
      { name: 'Renewal Options', status: 'reviewed', aiInsight: 'Multiple options with favorable rates', confidence: 90 }
    ]
  },
  {
    category: 'Facility Management',
    documents: [
      { name: 'BMS Integration Plan', status: 'reviewed', aiInsight: 'Compatible with existing systems', confidence: 88 },
      { name: 'Maintenance Schedule', status: 'in-review', aiInsight: 'Routine maintenance costs within budget', confidence: 82 },
      { name: 'Utility Infrastructure', status: 'reviewed', aiInsight: 'Adequate capacity for operations', confidence: 94 },
      { name: 'Security Assessment', status: 'pending', aiInsight: 'Additional cameras recommended', confidence: 76 }
    ]
  }
];

const leaseComparison = [
  { property: 'Current Site A', baseRent: 18.50, opEx: 4.25, tiAllowance: 35, renewalOptions: 2 },
  { property: 'Previous Property 1', baseRent: 16.75, opEx: 3.80, tiAllowance: 30, renewalOptions: 1 },
  { property: 'Previous Property 2', baseRent: 19.20, opEx: 4.50, tiAllowance: 40, renewalOptions: 3 },
  { property: 'Market Average', baseRent: 17.85, opEx: 4.10, tiAllowance: 32, renewalOptions: 2 }
];

export function DocumentReviewSection() {
  const [selectedCategory, setSelectedCategory] = useState('topographic');
  const [aiAnalysisProgress, setAiAnalysisProgress] = useState(73);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reviewed': return 'bg-green-600';
      case 'in-review': return 'bg-blue-600';
      case 'pending': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reviewed': return <CheckCircle className="h-4 w-4" />;
      case 'in-review': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cyan-300">Document Review & AI Analysis</h2>
          <p className="text-gray-400">Intelligent document analysis and insights</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload Documents
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Brain className="h-4 w-4 mr-2" />
            Run AI Analysis
          </Button>
        </div>
      </div>

      {/* AI Analysis Progress */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI Analysis Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Overall Analysis Progress</span>
              <span className="text-white font-medium">{aiAnalysisProgress}%</span>
            </div>
            <Progress value={aiAnalysisProgress} className="h-3" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              {[
                { phase: 'Document Processing', status: 'Complete', progress: 100 },
                { phase: 'Content Extraction', status: 'Complete', progress: 100 },
                { phase: 'Risk Analysis', status: 'In Progress', progress: 85 },
                { phase: 'Recommendations', status: 'Pending', progress: 45 }
              ].map((phase, index) => (
                <div key={index} className="p-3 bg-gray-800 rounded-lg">
                  <div className="text-white font-medium text-sm">{phase.phase}</div>
                  <div className="text-gray-400 text-xs">{phase.status}</div>
                  <Progress value={phase.progress} className="h-1 mt-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="topographic" className="w-full">
        <TabsList className="bg-gray-900 text-gray-400 border border-gray-800">
          <TabsTrigger value="topographic">Topographic & Zoning</TabsTrigger>
          <TabsTrigger value="lease">Lease Analysis</TabsTrigger>
          <TabsTrigger value="facility">Facility Management</TabsTrigger>
          <TabsTrigger value="comparison">Property Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="topographic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-cyan-300">Document Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documentCategories[0].documents.map((doc, index) => (
                    <div key={index} className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(doc.status)}
                          <span className="text-white font-medium">{doc.name}</span>
                        </div>
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                      </div>
                      <div className="text-gray-400 text-sm mb-2">{doc.aiInsight}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs">AI Confidence:</span>
                        <Progress value={doc.confidence} className="h-1 flex-1" />
                        <span className="text-gray-400 text-xs">{doc.confidence}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-cyan-300">AI Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      risk: 'Zoning Variance Required',
                      severity: 'Medium',
                      impact: 'Timeline delay of 2-3 months',
                      mitigation: 'Engage zoning attorney early'
                    },
                    { 
                      risk: 'Soil Conditions',
                      severity: 'Low',
                      impact: 'Minimal foundation adjustments',
                      mitigation: 'Standard geotechnical measures'
                    },
                    { 
                      risk: 'Environmental Compliance',
                      severity: 'Low',
                      impact: 'No significant issues identified',
                      mitigation: 'Continue monitoring protocols'
                    }
                  ].map((risk, index) => (
                    <div key={index} className="p-4 bg-gray-800 rounded-lg border-l-4 border-cyan-600">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-medium">{risk.risk}</h4>
                        <Badge className={
                          risk.severity === 'High' ? 'bg-red-600' : 
                          risk.severity === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                        }>
                          {risk.severity}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-400">Impact: {risk.impact}</div>
                        <div className="text-gray-400">Mitigation: {risk.mitigation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lease" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-cyan-300">Lease Language Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      clause: 'Base Rent Escalation',
                      analysis: 'Annual 3% increase vs. market 2.5%',
                      recommendation: 'Negotiate cap at 2.5% or CPI',
                      priority: 'High'
                    },
                    {
                      clause: 'Operating Expense Pass-through',
                      analysis: 'Standard triple-net structure',
                      recommendation: 'Add expense stop provision',
                      priority: 'Medium'
                    },
                    {
                      clause: 'Early Termination Rights',
                      analysis: 'Limited termination options',
                      recommendation: 'Add performance-based termination clause',
                      priority: 'Medium'
                    },
                    {
                      clause: 'Renewal Options',
                      analysis: 'Favorable 5-year renewal terms',
                      recommendation: 'Accept as proposed',
                      priority: 'Low'
                    }
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-medium">{item.clause}</h4>
                        <Badge className={
                          item.priority === 'High' ? 'bg-red-600' : 
                          item.priority === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                        }>
                          {item.priority}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="text-gray-400">Analysis: {item.analysis}</div>
                        <div className="text-cyan-400">Recommendation: {item.recommendation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-cyan-300">AI Feedback Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-950/30 border border-blue-800/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-300 font-medium">AI Agent Recommendation</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Based on lease analysis, I recommend negotiating 3 key terms before signing. 
                      The rent escalation clause presents the highest financial risk over the lease term.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-white font-medium">Key Action Items:</h4>
                    {[
                      'Request rent escalation cap at market rate',
                      'Add operating expense stop at current level',
                      'Include expansion rights clause',
                      'Negotiate TI allowance increase by 10%'
                    ].map((action, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-800 rounded">
                        <input type="checkbox" className="rounded" />
                        <span className="text-gray-300 text-sm">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="facility" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-cyan-300">Site Painting Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Condition:</span>
                    <Badge className="bg-yellow-600">Fair</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Required Work:</span>
                    <span className="text-white">Exterior refresh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Cost:</span>
                    <span className="text-white">$45,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timeline:</span>
                    <span className="text-white">2 weeks</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-3">
                    AI Insight: Priority areas identified for immediate attention.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-cyan-300">Landscape Modifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current State:</span>
                    <Badge className="bg-green-600">Good</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Modifications:</span>
                    <span className="text-white">Minimal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Cost:</span>
                    <span className="text-white">$15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Maintenance:</span>
                    <span className="text-white">$2,400/year</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-3">
                    AI Insight: Existing landscaping meets requirements with minor updates.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-cyan-300">BMS Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Compatibility:</span>
                    <Badge className="bg-green-600">High</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Integration Cost:</span>
                    <span className="text-white">$25,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timeline:</span>
                    <span className="text-white">3 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Annual Savings:</span>
                    <span className="text-green-400">$12,000</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-3">
                    AI Insight: ROI achieved in 2.1 years through energy savings.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-300">Landlord vs. Tenant Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Landlord Responsibilities</h4>
                  <div className="space-y-2">
                    {[
                      { item: 'Structural maintenance', status: 'Included', cost: 'N/A' },
                      { item: 'Roof and exterior', status: 'Included', cost: 'N/A' },
                      { item: 'Common area utilities', status: 'Included', cost: 'N/A' },
                      { item: 'Parking lot maintenance', status: 'Included', cost: 'N/A' }
                    ].map((req, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-800 rounded">
                        <span className="text-gray-300">{req.item}</span>
                        <Badge className="bg-green-600">{req.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Tenant Responsibilities</h4>
                  <div className="space-y-2">
                    {[
                      { item: 'Interior improvements', status: 'Required', cost: '$150K' },
                      { item: 'HVAC maintenance', status: 'Required', cost: '$8K/year' },
                      { item: 'Interior utilities', status: 'Required', cost: '$15K/year' },
                      { item: 'Interior janitorial', status: 'Required', cost: '$12K/year' }
                    ].map((req, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-800 rounded">
                        <span className="text-gray-300">{req.item}</span>
                        <div className="text-right">
                          <Badge className="bg-blue-600 mb-1">{req.status}</Badge>
                          <div className="text-gray-400 text-xs">{req.cost}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-300">Lease Comparison with Previous Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-gray-400 py-3">Property</th>
                      <th className="text-center text-gray-400 py-3">Base Rent ($/sq ft)</th>
                      <th className="text-center text-gray-400 py-3">OpEx ($/sq ft)</th>
                      <th className="text-center text-gray-400 py-3">TI Allowance ($/sq ft)</th>
                      <th className="text-center text-gray-400 py-3">Renewal Options</th>
                      <th className="text-center text-gray-400 py-3">AI Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaseComparison.map((property, index) => (
                      <tr key={index} className="border-b border-gray-800">
                        <td className="py-3 text-white">{property.property}</td>
                        <td className="py-3 text-center text-white">${property.baseRent}</td>
                        <td className="py-3 text-center text-white">${property.opEx}</td>
                        <td className="py-3 text-center text-white">${property.tiAllowance}</td>
                        <td className="py-3 text-center text-white">{property.renewalOptions}</td>
                        <td className="py-3 text-center">
                          <Badge className={
                            index === 0 ? 'bg-green-600' : 
                            index === 1 ? 'bg-blue-600' : 
                            index === 2 ? 'bg-yellow-600' : 'bg-gray-600'
                          }>
                            {index === 0 ? '92' : index === 1 ? '78' : index === 2 ? '85' : '80'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cyan-300">Previous Project Work Letters Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Lessons Learned</h4>
                  <div className="space-y-3">
                    {[
                      {
                        lesson: 'HVAC Specifications',
                        insight: 'Previous undersized system led to efficiency issues',
                        recommendation: 'Oversized by 15% for current project'
                      },
                      {
                        lesson: 'Electrical Infrastructure',
                        insight: 'Inadequate power distribution caused delays',
                        recommendation: 'Include redundant power feeds'
                      },
                      {
                        lesson: 'Technology Provisions',
                        insight: 'Fiber requirements underestimated',
                        recommendation: 'Plan for 10Gbps backbone minimum'
                      }
                    ].map((item, index) => (
                      <div key={index} className="p-3 bg-gray-800 rounded-lg">
                        <h5 className="text-cyan-300 font-medium text-sm">{item.lesson}</h5>
                        <p className="text-gray-400 text-xs mt-1">{item.insight}</p>
                        <p className="text-green-400 text-xs mt-1">→ {item.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Cost Optimization</h4>
                  <div className="space-y-3">
                    {[
                      { category: 'Avoided Delays', savings: '$125,000', source: 'Better planning' },
                      { category: 'Material Optimization', savings: '$85,000', source: 'Bulk purchasing' },
                      { category: 'Energy Efficiency', savings: '$15,000/year', source: 'Upgraded systems' },
                      { category: 'Technology Integration', savings: '$45,000', source: 'Phased approach' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                        <div>
                          <div className="text-white font-medium text-sm">{item.category}</div>
                          <div className="text-gray-400 text-xs">{item.source}</div>
                        </div>
                        <div className="text-green-400 font-medium">{item.savings}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
