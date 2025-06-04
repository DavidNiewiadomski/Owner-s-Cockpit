
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, DollarSign, Clock, Users, Zap, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const siteComparisonData = [
  { site: 'Site A', cost: 12.5, schedule: 18, accessibility: 85, utilities: 92, incentives: 78 },
  { site: 'Site B', cost: 15.2, schedule: 24, accessibility: 78, utilities: 88, incentives: 65 },
  { site: 'Site C', cost: 10.8, schedule: 20, accessibility: 92, utilities: 85, utilities: 88 }
];

const costBreakdown = [
  { category: 'Land Acquisition', siteA: 4.2, siteB: 5.8, siteC: 3.5 },
  { category: 'Site Preparation', siteA: 2.1, siteB: 3.2, siteC: 2.8 },
  { category: 'Utilities Setup', siteA: 1.8, siteB: 2.1, siteC: 1.6 },
  { category: 'Infrastructure', siteA: 3.2, siteB: 2.8, siteC: 2.1 },
  { category: 'Permits & Fees', siteA: 1.2, siteB: 1.3, siteC: 0.8 }
];

const radarData = [
  { subject: 'Cost Efficiency', A: 85, B: 72, C: 95, fullMark: 100 },
  { subject: 'Timeline', A: 78, B: 65, C: 70, fullMark: 100 },
  { subject: 'Accessibility', A: 85, B: 78, C: 92, fullMark: 100 },
  { subject: 'Utilities', A: 92, B: 88, C: 85, fullMark: 100 },
  { subject: 'Incentives', A: 78, B: 65, C: 88, fullMark: 100 },
  { subject: 'Future Growth', A: 88, B: 75, C: 82, fullMark: 100 }
];

export function SiteComparison() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-cyan-300">Concurrent Site Evaluation</h2>
          <p className="text-gray-400">Cost & Schedule Analysis Against Internal Budget</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-green-600 hover:bg-green-700">
            <MapPin className="h-4 w-4 mr-2" />
            View on Map
          </Button>
          <Button className="bg-cyan-600 hover:bg-cyan-700">
            Export Analysis
          </Button>
        </div>
      </div>

      {/* Site Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Site A', 'Site B', 'Site C'].map((site, index) => {
          const siteData = siteComparisonData[index];
          const isRecommended = index === 2; // Site C is recommended
          
          return (
            <Card key={site} className={`bg-gray-900 border-gray-800 ${isRecommended ? 'ring-2 ring-green-500' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-cyan-300 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    {site}
                  </CardTitle>
                  {isRecommended && (
                    <Badge className="bg-green-600">Recommended</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Total Cost
                    </span>
                    <span className="text-white font-medium">${siteData.cost}M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Timeline
                    </span>
                    <span className="text-white font-medium">{siteData.schedule} months</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Accessibility
                    </span>
                    <span className="text-white font-medium">{siteData.accessibility}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center">
                      <Zap className="h-4 w-4 mr-1" />
                      Utilities Ready
                    </span>
                    <span className="text-white font-medium">{siteData.utilities}%</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Budget Alignment</span>
                    <span className="text-white font-medium">
                      {siteData.cost <= 12 ? 'Under Budget' : 'Over Budget'}
                    </span>
                  </div>
                  <Progress 
                    value={(12 / siteData.cost) * 100} 
                    className="h-2"
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    Budget: $12M | Variance: {siteData.cost > 12 ? '+' : ''}${(siteData.cost - 12).toFixed(1)}M
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Cost Breakdown Chart */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-300">Cost Breakdown Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costBreakdown} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="category" tick={{ fill: '#94a3b8' }} />
                <YAxis tick={{ fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="siteA" name="Site A" fill="#22d3ee" />
                <Bar dataKey="siteB" name="Site B" fill="#f59e0b" />
                <Bar dataKey="siteC" name="Site C" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Radar Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-cyan-300">Multi-Criteria Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis tick={{ fill: '#94a3b8' }} />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: '#94a3b8' }}
                  />
                  <Radar
                    name="Site A"
                    dataKey="A"
                    stroke="#22d3ee"
                    fill="#22d3ee"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Site B"
                    dataKey="B"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Site C"
                    dataKey="C"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-cyan-300">Decision Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { criteria: 'Initial Investment', weight: '25%', siteA: 7, siteB: 6, siteC: 9 },
                { criteria: 'Timeline to Market', weight: '20%', siteA: 8, siteB: 6, siteC: 7 },
                { criteria: 'Operating Costs', weight: '20%', siteA: 8, siteB: 7, siteC: 9 },
                { criteria: 'Growth Potential', weight: '15%', siteA: 9, siteB: 7, siteC: 8 },
                { criteria: 'Risk Factors', weight: '10%', siteA: 7, siteB: 8, siteC: 8 },
                { criteria: 'Regulatory', weight: '10%', siteA: 8, siteB: 7, siteC: 9 }
              ].map((row, index) => (
                <div key={index} className="grid grid-cols-6 gap-4 p-3 bg-gray-800 rounded-lg text-sm">
                  <div className="col-span-2 text-white">{row.criteria}</div>
                  <div className="text-gray-400">{row.weight}</div>
                  <div className="text-center">
                    <Badge className={row.siteA >= 8 ? 'bg-green-600' : row.siteA >= 7 ? 'bg-yellow-600' : 'bg-red-600'}>
                      {row.siteA}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <Badge className={row.siteB >= 8 ? 'bg-green-600' : row.siteB >= 7 ? 'bg-yellow-600' : 'bg-red-600'}>
                      {row.siteB}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <Badge className={row.siteC >= 8 ? 'bg-green-600' : row.siteC >= 7 ? 'bg-yellow-600' : 'bg-red-600'}>
                      {row.siteC}
                    </Badge>
                  </div>
                </div>
              ))}
              
              <div className="grid grid-cols-6 gap-4 p-3 bg-cyan-950/30 rounded-lg font-medium border border-cyan-900/30">
                <div className="col-span-2 text-cyan-300">Weighted Score</div>
                <div className="text-gray-400">Total</div>
                <div className="text-center text-white">7.8</div>
                <div className="text-center text-white">6.7</div>
                <div className="text-center text-green-400 font-bold">8.4</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Risk Assessment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                site: 'Site A', 
                risks: ['Zoning challenges', 'Traffic impact'], 
                mitigation: 'Legal review, traffic study',
                riskLevel: 'Medium'
              },
              { 
                site: 'Site B', 
                risks: ['Environmental concerns', 'Higher costs'], 
                mitigation: 'Environmental assessment, cost optimization',
                riskLevel: 'High'
              },
              { 
                site: 'Site C', 
                risks: ['Utility capacity', 'Schedule pressure'], 
                mitigation: 'Utility upgrade plan, phased approach',
                riskLevel: 'Low'
              }
            ].map((item, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-white font-medium">{item.site}</h4>
                  <Badge className={
                    item.riskLevel === 'Low' ? 'bg-green-600' : 
                    item.riskLevel === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'
                  }>
                    {item.riskLevel} Risk
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-gray-400 text-sm">Key Risks:</div>
                    <ul className="text-white text-sm">
                      {item.risks.map((risk, i) => (
                        <li key={i}>• {risk}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Mitigation:</div>
                    <div className="text-white text-sm">{item.mitigation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
